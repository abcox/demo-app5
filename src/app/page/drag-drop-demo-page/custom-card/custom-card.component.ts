import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BehaviorSubject, combineLatest, map } from 'rxjs';

export interface CustomCardModel {
  movie: string;
  orientation: 'horizontal' | 'vertical';
}

@Component({
  selector: 'app-custom-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custom-card.component.html',
  styleUrl: './custom-card.component.scss',
})
export class CustomCardComponent {
  @Input() set model(value: CustomCardModel | undefined) {
    this.model$$.next(value);
  }
  model$$ = new BehaviorSubject<CustomCardModel | undefined>(undefined);
  vm$ = combineLatest([this.model$$]).pipe(map(([model]) => model));
}
