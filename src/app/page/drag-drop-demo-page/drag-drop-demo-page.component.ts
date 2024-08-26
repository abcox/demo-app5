import { Component, OnInit } from '@angular/core';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDragPlaceholder,
  CdkDropList,
  DropListOrientation,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { MatCommonModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CustomCardComponent } from './custom-card/custom-card.component';

/**
 * @title Drag&Drop custom placeholder
 */
@Component({
  selector: 'app-drag-drop-demo-page',
  standalone: true,
  imports: [
    CdkDropList,
    CdkDrag,
    CdkDragPlaceholder,
    CommonModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSlideToggleModule,
    CustomCardComponent,
  ],
  templateUrl: './drag-drop-demo-page.component.html',
  styleUrl: './drag-drop-demo-page.component.scss',
})
export class DragDropDemoPageComponent implements OnInit {
  movies$$ = new BehaviorSubject<string[]>([]);
  orientation$$ = new BehaviorSubject<DropListOrientation>('horizontal');
  vm$ = combineLatest([this.movies$$, this.orientation$$]).pipe(
    map(([movies, orientation]) => ({
      movies,
      orientation,
    }))
  );

  ngOnInit(): void {
    this.movies$$.next(this.getInitMovieList());
  }

  drop(event: any) {
    // CdkDragDrop<string[]>
    const arr = this.movies$$.getValue();
    moveItemInArray(arr, event.previousIndex, event.currentIndex);
    this.movies$$.next(arr);
  }

  orientationChange() {
    this.orientation$$.next(
      this.orientation$$.getValue() === 'horizontal' ? 'vertical' : 'horizontal'
    );
  }

  private getInitMovieList = () => [
    'Episode I - The Phantom Menace',
    'Episode II - Attack of the Clones',
    'Episode III - Revenge of the Sith',
    'Episode IV - A New Hope',
    'Episode V - The Empire Strikes Back',
    'Episode VI - Return of the Jedi',
    'Episode VII - The Force Awakens',
    'Episode VIII - The Last Jedi',
    'Episode IX - The Rise of Skywalker',
  ];
}

/**  Copyright 2024 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://angular.io/license */
