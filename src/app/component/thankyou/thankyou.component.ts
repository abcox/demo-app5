import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-thankyou',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule],
  templateUrl: './thankyou.component.html',
  styleUrl: './thankyou.component.scss',
})
export class ThankyouComponent {
  @Input() message? = 'Thank you for your time!';
}
