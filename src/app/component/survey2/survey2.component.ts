import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-survey2',
  standalone: true,
  imports: [MatCardModule, MatTabsModule],
  templateUrl: './survey2.component.html',
  styleUrl: './survey2.component.scss',
})
export class Survey2Component {}
