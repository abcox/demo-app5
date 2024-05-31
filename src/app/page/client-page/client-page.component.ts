import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
  WritableSignal,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import {
  takeUntilDestroyed,
  toObservable,
  toSignal,
} from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { interval } from 'rxjs/internal/observable/interval';
import { debounce, filter, map, switchMap, tap } from 'rxjs/operators';
import {
  CdkVirtualScrollViewport,
  ScrollDispatcher,
  ScrollingModule,
} from '@angular/cdk/scrolling';
import { of } from 'rxjs/internal/observable/of';
import {
  ClientService,
  PagedListRequest,
} from '../../service/client/client.service';
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BehaviorSubject, EMPTY } from 'rxjs';
import { Client } from '../../../backend-api/v1';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { exportClientListToExcel } from '../../common/helper/excel-helper';

interface ActionViewModel {
  action: (item: any) => void;
  disabled: boolean;
  icon: string;
  id: number;
  label: string;
  tooltip: string;
}

interface ClientViewModel extends Client {
  selected: boolean;
}

@Component({
  selector: 'app-client-page',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatTooltipModule,
    ReactiveFormsModule,
    RouterModule,
    ScrollingModule,
  ],
  templateUrl: './client-page.component.html',
  styleUrl: './client-page.component.scss',
})
export class ClientPageComponent implements AfterViewInit {
  clientService = inject(ClientService);
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
  clientList: WritableSignal<ClientViewModel[]> = signal([]);

  constructor(
    private scrollDispatcher: ScrollDispatcher,
    private cd: ChangeDetectorRef
  ) {
    effect(() => console.log(`search`, this.search()));
    toObservable(this.request)
      .pipe(
        tap(request => console.log(`request`, request)),
        tap(() => this.loading.set(true)),
        switchMap(request =>
          this.clientService.get(request).pipe(
            tap(() => this.loading.set(false)),
            map(response =>
              response?.map(i => ({ ...i, selected: false }) as ClientViewModel)
            )
          )
        ),
        tap(response => {
          this.clientList.set(response);
        }),
        takeUntilDestroyed()
      )
      .subscribe();
  }
  request = computed(() => {
    return {
      limit: 10,
      offset: 0,
      filter: { name: this.search() ?? '' } as unknown as Client,
    } as PagedListRequest<Client>;
  });

  // REF: https://dev.to/railsstudent/how-to-convert-http-response-from-observable-to-angular-signal-with-tosignal-1n2m

  loading = signal(false);
  //clientList = computed(() => {
  //  /* toSignal(of([])); */
  //  return this.clientListResponse();
  //});
  resetSearch() {
    this.form.controls.search.setValue('');
    this.clearSelection();
  }

  actions = [
    {
      action: (item: any) => {
        console.log('export', item);
      },
      disabled: false,
      icon: 'export',
      id: 1,
      label: 'Export',
      tooltip: 'Export selected items',
    },
    {
      action: (item: any) => {
        this.deleteItem(item);
      },
      disabled: false,
      icon: 'delete',
      id: 2,
      label: 'Delete',
      tooltip: 'Delete selected items',
    },
  ];

  action(item: ActionViewModel) {
    console.log('action (item)', item);
    switch (item.id) {
      case 1:
        console.log('export');
        break;
      case 2:
        console.log('delete');
        break;
    }
  }

  allSelected = signal(false);
  anySelected = signal(false);

  /* allSelected = computed(() =>
    this.clientList()?.every(i => i.selected === true)
  );
  anySelected = computed(() =>
    this.clientList()?.some(i => i.selected === true)
  ); */

  toggleSelection($event: any, item: ClientViewModel) {
    console.log('toggleSelection', $event, item);
    item.selected = $event.checked;
    const list = this.clientList();
    const itemIndex = list.findIndex(i => i.id === item.id);
    const updatedItems = [
      ...list.slice(0, itemIndex), // Copies elements from start to the index
      item, // Inserts the new item at the index
      ...list.slice(itemIndex + 1), // Copies elements after the index
    ];
    this.clientList.update(() => updatedItems);
    this.updateAggregateToggle();
  }
  updateAggregateToggle() {
    const allSelected = this.clientList()?.every(i => i.selected === true);
    this.allSelected.update(() => allSelected);
    if (allSelected) return;
    const anySelected = this.clientList()?.some(i => i.selected === true);
    this.anySelected.update(() => anySelected);
  }
  toggleSelectionAll($event: any) {
    console.log('toggleSelectionAll', $event);
    if ($event.checked && !$event.indeterminate) {
      this.selectAll();
    } else {
      this.clearSelection();
    }
  }
  clearSelection() {
    console.log('clearSelection');
    const list = this.clientList();
    list.forEach(item => (item.selected = false));
    this.clientList.update(() => list);
    this.allSelected.update(() => false);
    this.anySelected.update(() => false);
  }
  selectAll() {
    console.log('selectAll');
    const list = this.clientList();
    list.forEach(item => (item.selected = true));
    this.clientList.update(() => list);
    this.allSelected.update(() => true);
    this.anySelected.update(() => false);
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
  deleteItem(item: any) {
    console.log('delete', item);
    this.loading.set(true); // todo: move this to an global state ?
    this.clientService
      .delete(item.id)
      .pipe(
        tap(response =>
          console.log(`deleteItem clientService.delete response`, response)
        ),
        /* tap(
          response =>
            (this.searchResults = this.searchResults.filter(i => i !== item))
        ), */
        tap(() => this.resetSearch())
      )
      .subscribe();
  }
  deleteSelected() {
    console.log('delete selected');
    var list = this.clientList()?.filter((x: ClientViewModel) => x.selected);
    if (list?.length === 0) return;
    const idList = list.map(y => y.id?.toString() ?? '').filter(z => z !== '');
    console.log('delete list', list);
    this.loading.set(true); // todo: move this to an global state ?
    this.clientService
      .deleteBatch(idList)
      .pipe(
        tap(response =>
          console.log(`deleteItem clientService.delete response`, response)
        ),
        tap(() => this.clearSelection()),
        tap(() => this.resetSearch())
      )
      .subscribe();
  }

  exportSelected() {
    console.log('export selected');
    var list = this.clientList()?.filter(x => x.selected) ?? [];
    if (list?.length === 0) return;
    console.log('export list', list);
    //list?.forEach(item => {
    //  item.selected = false;
    //  console.log('export item', item);
    //  //this.deleteItem(item); // todo: implement deleteItem
    //});
    exportClientListToExcel(list, 'clients');
    this.clearSelection();
  }
}
