import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { BehaviorSubject, combineLatest, map, of } from 'rxjs';

export interface FileListModel {
  files: FileListItemModel[];
}
export interface FileListItemModel {
  name: string;
  resource: string;
  selected: boolean;
}

@Component({
  selector: 'app-file-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatListModule,
    FormsModule,
    RouterModule,
  ],
  templateUrl: './file-list.component.html',
  styleUrl: './file-list.component.scss',
})
export class FileListComponent {
  @Input() set files(files: FileListItemModel[]) {
    this.files$$.next(files);
    this._selected = files.filter(x => x.selected === true);
    this.selected.emit(this._selected);
  }
  @Output() selected: EventEmitter<FileListItemModel[]> = new EventEmitter();
  files$$ = new BehaviorSubject<FileListItemModel[]>([]);
  vm$ = combineLatest([this.files$$]).pipe(
    map(([files]) => ({ items: files }))
  );
  _selected = [] as FileListItemModel[];
  select(item: FileListItemModel) {
    const index = this._selected.findIndex(x => x.name === item.name);
    console.log(`select index: ${index}`);
    if (index > -1) {
      this._selected.splice(index, 1);
    } else {
      this._selected.push(item);
    }
    this.selected.emit(this._selected);
  }
}
