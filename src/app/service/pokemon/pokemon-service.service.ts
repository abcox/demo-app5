import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import {
  DisplayPokemon,
  Pokemon,
  PokemonResource,
  PagedListRequest,
} from './pokemon.interface';
import { HttpClient } from '@angular/common/http';

/* This is a demo service via https://pokeapi.co/
 */

@Injectable({
  providedIn: 'root',
})
export class PokemonServiceService {
  get = getPokemonFn();
  getPage = getPokemonPageFn();
  constructor() {}
}

export const getPokemonPageFn = (): ((options: {
  limit: number;
  offset: number;
}) => Observable<PagedListRequest<PokemonResource>>) => {
  const httpClient = inject(HttpClient);
  return options => {
    const { limit, offset } = options;
    return httpClient
      .get<
        PagedListRequest<PokemonResource>
      >(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
      .pipe(
        map((resp, i) => ({
          ...resp,
          results: resp.results.map((p, i) => ({
            id: offset + i + 1,
            name: p.name,
            url: p.url,
          })),
        }))
      );
  };
};

export const getPokemonFn = (): ((
  id: number
) => Observable<DisplayPokemon>) => {
  const httpClient = inject(HttpClient);

  return (id: number) => {
    return httpClient
      .get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .pipe(
        map(p => ({
          id: p.id,
          name: p.name,
          img: p.sprites.front_shiny,
        }))
      );
  };
};
