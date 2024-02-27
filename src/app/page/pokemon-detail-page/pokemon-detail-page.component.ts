import { Component, OnInit, inject, input } from '@angular/core';
import { PokemonServiceService } from '../../service/pokemon/pokemon-service.service';
import { Observable } from 'rxjs';
import { DisplayPokemon } from '../../service/pokemon/pokemon.interface';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pokemon-detail-page',
  standalone: true,
  imports: [CommonModule, MatButtonModule, RouterModule],
  templateUrl: './pokemon-detail-page.component.html',
  styleUrl: './pokemon-detail-page.component.scss',
})
export class PokemonDetailPageComponent implements OnInit {
  dataService = inject(PokemonServiceService);
  id = input.required<number>();
  selected$!: Observable<DisplayPokemon>;
  constructor() {}
  ngOnInit() {
    this.selected$ = this.dataService.get(this.id());
  }
}
