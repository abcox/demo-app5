import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-session-warning',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  template: `
    <div class="p-5">
      <h2 mat-dialog-title>
        {{ sessionExpired ? 'Session Expired' : 'Session Timeout' }}
      </h2>
      <mat-dialog-content>
        <p *ngIf="!sessionExpired; else sessionExpiredContentTemplate">
          You will be signed out in <strong>{{ countdown }}</strong> seconds due
          to inactivity.
        </p>
        <ng-template #sessionExpiredContentTemplate>
          <p>You have been signed out due to inactivity.</p>
        </ng-template>
      </mat-dialog-content>
      <mat-dialog-actions
        class="center"
        *ngIf="!sessionExpired; else sessionExpiredButtonTemplate">
        <button mat-button color="primary" (click)="cancel()">
          Stay Signed In
        </button>
        <button mat-button (click)="logout()">Sign Out</button>
      </mat-dialog-actions>
      <ng-template #sessionExpiredButtonTemplate>
        <button mat-button (click)="dialogRef.close()">Ok</button>
      </ng-template>
    </div>
    <style>
      .mat-dialog-actions.center {
        justify-content: center !important;
        gap: 1rem; /* Add space between buttons */
      }
    </style>
  `,
  //templateUrl: './session-warning.component.html',
  //styleUrl: './session-warning.component.scss'
})
export class SessionWarningComponent implements OnInit {
  countdown = 60;
  sessionExpired = false;
  private intervalId: any;
  private timeoutId: any;

  constructor(
    public dialogRef: MatDialogRef<SessionWarningComponent>,
    @Inject(MAT_DIALOG_DATA)
    public timeoutDuration: number // Pass timeout in seconds
  ) {
    this.countdown = timeoutDuration;
  }

  ngOnInit(): void {
    this.startCountdown();
  }

  private startCountdown(): void {
    this.intervalId = setInterval(() => {
      if (this.countdown > 0) {
        this.countdown--;
      } else {
        clearInterval(this.intervalId);
      }
    }, 1000);

    this.timeoutId = setTimeout(() => {
      this.sessionExpired = true; // Update context to session expired
      clearInterval(this.intervalId); // Stop countdown
    }, this.timeoutDuration * 1000);
  }

  cancel(): void {
    this.closeTimers();
    this.dialogRef.close(true); // Signal to stay logged in
  }

  logout(): void {
    this.closeTimers();
    this.dialogRef.close(false); // Signal to logout
  }

  closeDialog(): void {
    this.closeTimers();
    this.dialogRef.close(); // Close dialog without further actions
  }

  private closeTimers(): void {
    clearInterval(this.intervalId);
    clearTimeout(this.timeoutId);
  }

  ngOnDestroy(): void {
    this.closeTimers();
  }
}
