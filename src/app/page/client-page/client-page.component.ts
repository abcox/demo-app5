import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { interval } from 'rxjs/internal/observable/interval';
import { debounce, filter, map, switchMap, tap } from 'rxjs/operators';
import {
  CdkVirtualScrollViewport,
  ScrollDispatcher,
  ScrollingModule,
} from '@angular/cdk/scrolling';
import { of } from 'rxjs/internal/observable/of';
import {
  Client,
  ClientServiceService,
  PagedListRequest,
} from '../../service/client-service.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-client-page',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule,
    ScrollingModule,
  ],
  templateUrl: './client-page.component.html',
  styleUrl: './client-page.component.scss',
})
export class ClientPageComponent implements AfterViewInit {
  clientService = inject(ClientServiceService);
  //clients = toSignal(this.clientService.clients);
  @ViewChild(CdkVirtualScrollViewport) virtualScroll!: CdkVirtualScrollViewport;
  form = new FormGroup({
    search: new FormControl(''),
  });
  search = toSignal<string>(
    this.form.controls.search.valueChanges.pipe(
      debounce(() => interval(1000)),
      map(value => value ?? '')
    )
    //{ initialValue: '' }
  );
  constructor(
    private scrollDispatcher: ScrollDispatcher,
    private cd: ChangeDetectorRef
  ) {
    effect(() => console.log(`search`, this.search()));
  }
  request = computed(() => {
    return {
      limit: 10,
      offset: 0,
      filter: { name: this.search() ?? '' } as unknown as Client,
    } as PagedListRequest<Client>;
  });
  clientListResponse = toSignal(
    toObservable(this.request).pipe(
      tap(request => console.log(`request`, request)),
      switchMap(request => this.clientService.get(request))
    )
  );
  filteredClientList = computed(() => {
    return this.clientListResponse()?.list;
  });
  resetSearch() {
    this.form.controls.search.setValue('');
  }

  // https://stackblitz.com/edit/angular-virtual-scroll-server?file=app%2Fcdk-virtual-scroll-data-source-example.ts

  // https://stackoverflow.com/questions/54770671/angular-virtual-scroll-append-new-items-when-reaching-the-end-of-scroll
  // https://stackblitz.com/edit/template-angular7-material-primeng-ckxgzs?file=src%2Fapp%2Fapp.component.ts
  searchPageNumber = 0;
  ngAfterViewInit(): void {
    this.scrollDispatcher
      .scrolled()
      .pipe(
        filter(event => this.virtualScroll?.measureScrollOffset('bottom') === 0)
      )
      .subscribe(event => {
        this.searchPageNumber++;
        this.nextSearchPage(this.searchPageNumber);
        this.cd.detectChanges();
      });
    //this.scrollDispatcher.register(this.scrollable);
    //this.scrollDispatcher.scrolled(1000)
    //    .subscribe((viewport: CdkVirtualScrollViewport) => {
    //        console.log('scroll triggered', viewport);
    //    });

    // this.virtualScroll.renderedRangeStream.subscribe(range => {
    //  console.log('range', range);
    //   console.log('range2', this.virtualScroll.getRenderedRange());
    //   if (this.virtualScroll.getRenderedRange().end % 10 === 0) {
    //     this.nextSearchPage(++this.searchPageNumber);
    //   }
    // });
  }
  getResults(pageNumber: number) {
    let pagesize = 5;
    let result = [];
    for (let i = 0; i < 5; i++) result.push(pageNumber * 5 + i);
    return of(result);
  }
  searchResults!: Array<any>;
  nextSearchPage(pageNumber: number): void {
    this.getResults(pageNumber).subscribe((pagedResults: any) => {
      this.searchResults = this.searchResults?.concat(pagedResults);
      console.log(this.searchResults);
    });
  }
}
