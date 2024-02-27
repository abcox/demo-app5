import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, filter, map, of, tap } from 'rxjs';

// todo: move to environment & test building prod vs. local dev mode
// todo: also, refactor to use the backend-api/v1 module
const baseUrl = 'https://demo-app5-api.azurewebsites.net/api/'; // 'http://localhost:5071/api/'; // 'https://demo-app5-api.azurewebsites.net/api/';

@Injectable({
  providedIn: 'root',
})
export class ClientServiceService {
  clients = of<Client[]>(data);
  fetch = (request: PagedListRequest<Client>) => {
    return this.clients.pipe(
      map(clients =>
        clients.filter(client => client.name.includes(request.filter.name))
      )
    );
  };
  get = getClientPageFn();
  constructor() {}
}

export const getClientPageFn = (): ((
  request: PagedListRequest<Client>
) => Observable<PagedListResponse<Client>>) => {
  const httpClient = inject(HttpClient);
  return request => {
    const { limit, offset, filter } = request;
    let url = `${baseUrl}client?limit=${limit}&offset=${offset}`;
    if (filter?.name) {
      url += `&filter.name=${filter.name}`;
    }
    return httpClient.get<PagedListResponse<Client>>(url).pipe(
      tap(resp => console.log(`resp`, resp)),
      map((resp, i) => ({
        ...resp,
        results: resp.list.map((p, i) => ({
          id: offset + i + 1,
          name: p.name,
        })),
      }))
    );
  };
};

export interface PagedListResponse<T> {
  count: number;
  list: T[];
}

export interface PagedListRequest<T> {
  offset: number;
  limit: number;
  filter: T;
}

export interface Client {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
}

const data: Client[] = [
  {
    id: 1,
    name: 'Client 1',
    address: '1234 Main St',
    city: 'Springfield',
    state: 'IL',
    zip: '62701',
    phone: '555-555-5555',
    email: 'client1@gmail.com',
  },
  {
    id: 2,
    name: 'Client 2',
    address: '1234 Main St',
    city: 'Springfield',
    state: 'IL',
    zip: '62701',
    phone: '555-555-5555',
    email: 'client2@gmail.com',
  },
  {
    id: 3,
    name: 'Client 3',
    address: '1234 Main St',
    city: 'Springfield',
    state: 'IL',
    zip: '62701',
    phone: '555-555-5555',
    email: 'client3@gmail.com',
  },
  {
    id: 4,
    name: 'Client 4',
    address: '1234 Main St',
    city: 'Springfield',
    state: 'IL',
    zip: '62701',
    phone: '555-555-5555',
    email: 'client4@gmail.com',
  },
];
