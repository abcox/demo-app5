import { Component, inject } from '@angular/core';
import { PokemonServiceService } from '../../service/pokemon/pokemon-service.service';
import { CommonModule } from '@angular/common';
import { Observable, debounce, interval, map, of } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-pokemon-page',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './pokemon-page.component.html',
  styleUrl: './pokemon-page.component.scss',
})
export class PokemonPageComponent {
  router = inject(Router);
  dataService = inject(PokemonServiceService);
  pagedResponse$ = this.dataService.getPage({ limit: 10, offset: 0 });
  list$ = this.pagedResponse$?.pipe(map(p => p.results));
  paging$: Observable<IPaginator> = of({
    size: 10,
    index: 0,
    length$: this.pagedResponse$.pipe(map(p => p.count)),
    options: [5, 10, 25, 100],
  });
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
  pageChange = (event: any) => {
    this.pagedResponse$ = this.dataService.getPage({
      limit: event.pageSize,
      offset: event.pageIndex * event.pageSize,
    });
    this.list$ = this.pagedResponse$?.pipe(map(p => p.results));
  };
}

interface IPaginator {
  size: number;
  index: number;
  length$: Observable<number>;
  options: number[];
}
