import { Injectable, inject, effect } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SessionWarningComponent } from '../../component/shared/session-warning/session-warning.component';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class InactivityService {
  private authService = inject(AuthService);
  private inactivityTimeout: any;
  private warningTimeout: any;
  private readonly minBufferDuration = 10 * 1000; // Ensure at least 10 seconds between warning & logout
  private isTracking = false;
  private isDialogOpen = false;

  private readonly config = {
    inactivityDuration: 2 * 60 * 1000, // 2 minutes
    warningDuration: 1 * 60 * 1000, // 1 minute before logout
  };

  constructor(
    private router: Router,
    private dialog: MatDialog
  ) {
    console.log(`InactivityService ctor`);

    this.validateConfig();

    effect(() => {
      if (this.authService.isAuthenticated()) {
        console.log(
          '[InactivityService] User authenticated, starting tracking.'
        );
        this.startTracking();
      } else {
        console.log('[InactivityService] User logged out, stopping tracking.');
        this.stopTracking();
      }
    });
  }

  private validateConfig(): void {
    if (this.config.warningDuration >= this.config.inactivityDuration) {
      console.warn(
        `[InactivityService] Invalid configuration: warningDuration (${this.config.warningDuration}ms) should be less than inactivityDuration (${this.config.inactivityDuration}ms).`
      );

      // Adjust warningDuration dynamically to prevent a race condition
      this.config.warningDuration = Math.max(
        this.config.inactivityDuration - this.minBufferDuration,
        this.minBufferDuration
      );

      console.warn(
        `[InactivityService] Adjusted warningDuration to ${this.config.warningDuration}ms to prevent conflicts.`
      );
    }
  }

  private startTracking(): void {
    if (this.isTracking) return;
    this.isTracking = true;

    const activityEvents = [
      'mousemove',
      'keypress',
      'click',
      'scroll',
      'touchstart',
    ];
    activityEvents.forEach(event =>
      window.addEventListener(event, this.resetTimer.bind(this), true)
    );

    this.startInactivityTimer();
  }

  private stopTracking(): void {
    if (!this.isTracking) return;
    this.isTracking = false;
    this.clearTimers();

    const activityEvents = [
      'mousemove',
      'keypress',
      'click',
      'scroll',
      'touchstart',
    ];
    activityEvents.forEach(event =>
      window.removeEventListener(event, this.resetTimer.bind(this), true)
    );

    if (this.isDialogOpen) {
      this.dialog.closeAll();
      this.isDialogOpen = false;
    }
  }

  private resetTimer(): void {
    this.startInactivityTimer();
  }

  private startInactivityTimer(): void {
    this.clearTimers();
    this.warningTimeout = setTimeout(
      () => this.showWarningModal(),
      this.config.inactivityDuration - this.config.warningDuration
    );
    this.inactivityTimeout = setTimeout(
      () => this.handleInactivity(),
      this.config.inactivityDuration
    );
  }

  private clearTimers(): void {
    clearTimeout(this.inactivityTimeout);
    clearTimeout(this.warningTimeout);
  }

  private handleInactivity(): void {
    this.authService.logout();
  }

  private showWarningModal(): void {
    if (this.isDialogOpen) {
      console.log('[InactivityService] Warning dialog already open, skipping.');
      return;
    }

    console.log('[InactivityService] Showing warning dialog.');
    this.isDialogOpen = true;

    const dialogRef = this.dialog.open(SessionWarningComponent, {
      width: '400px',
      data: 60,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.isDialogOpen = false;
      if (result === true) {
        this.startInactivityTimer();
      } else {
        this.handleInactivity();
      }
    });
  }
}
