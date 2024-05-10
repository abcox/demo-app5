import { Component } from '@angular/core';
import { PaginatedDataSourceModel } from '../../common/model/paginated-datasource-model';
import { delay, of } from 'rxjs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-demo-page',
  standalone: true,
  imports: [MatSnackBarModule, ScrollingModule],
  templateUrl: './demo-page.component.html',
  styleUrl: './demo-page.component.scss',
})
export class DemoPageComponent {
  constructor(private snackbar: MatSnackBar) {}
  options = {
    dataCB: (page: number, pageSize: number) =>
      of(
        Array.from({ length: pageSize }).map(
          (_, i) => `Item #${page * pageSize + i}`
        )
      ).pipe(delay(500)),
    total: 10000,
    pageSize: 100,
    snackbar: this.snackbar,
  };
  ds = new PaginatedDataSourceModel<string>(this.options);
}
