import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subscription,
  lastValueFrom,
  of,
} from 'rxjs';
import { catchError, delay, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

// REF: https://stackblitz.com/edit/angular-virtual-scroll-server

type DataCBType<T> = (pageIndex: number, pageSize: number) => Observable<T[]>;

export class PaginatedDataSourceModel<T = any> extends DataSource<T> {
  private readonly pageSize: number;
  private readonly dataCB: DataCBType<T>;
  private readonly dataStream: BehaviorSubject<T[]>;
  private readonly cachedData: Array<T>;
  private readonly fetchedPages = new Set<number>();
  private subscription = new Subscription();
  private readonly snackbar: MatSnackBar | undefined;

  constructor(options: {
    dataCB: DataCBType<T>;
    total: number;
    pageSize?: number;
    snackbar?: MatSnackBar;
  }) {
    super();
    let { dataCB, total, pageSize, snackbar } = options;
    this.cachedData = Array.from({ length: total });
    this.dataStream = new BehaviorSubject(this.cachedData);
    this.dataCB = dataCB;
    this.pageSize = pageSize ?? 100;
    this.snackbar = snackbar;
  }

  connect(collectionViewer: CollectionViewer): Observable<T[]> {
    this.subscription.add(
      collectionViewer.viewChange.subscribe(range => {
        const startPage = this.getPageForIndex(range.start);
        const endPage = this.getPageForIndex(range.end - 1);
        for (let i = startPage; i <= endPage; i++) {
          this.fetchPage(i);
        }
      })
    );
    return this.dataStream;
  }

  disconnect(): void {
    this.subscription.unsubscribe();
  }

  private fetchPage(page: number) {
    if (this.fetchedPages.has(page)) {
      console.log('early ret');
      return;
    }
    console.log();
    this.fetchedPages.add(page);

    // via promise
    /* lastValueFrom(this.dataCB(page, this.pageSize))
      .then(arr => {
        this.cachedData.splice(page * this.pageSize, this.pageSize, ...arr);
        this.dataStream.next(this.cachedData);
      })
      .catch(() =>
        this.snackbar.open('Something went wrong loading data', 'Okay', {
          duration: 5000,
        })
      ); */

    // via observable
    this.dataCB(page, this.pageSize)
      .pipe(
        tap(arr => {
          console.log('arr', arr);
          this.cachedData.splice(page * this.pageSize, this.pageSize, ...arr);
          this.dataStream.next(this.cachedData);
        }),
        catchError(() => {
          this.snackbar?.open('Something went wrong loading data', 'Okay', {
            duration: 5000,
          });
          return of([]);
        })
      )
      .subscribe();
  }

  private getPageForIndex(index: number): number {
    return Math.floor(index / this.pageSize);
  }
}
