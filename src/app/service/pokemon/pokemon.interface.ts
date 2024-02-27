export interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_shiny: string;
  };
}

export interface DisplayPokemon {
  id: number;
  name: string;
  img: string;
}

export interface PokemonResource {
  id: number;
  name: string;
  url: string;
}

export interface PagedListRequest<T> {
  count: number;
  next: string;
  previous: string;
  results: T[];
}
