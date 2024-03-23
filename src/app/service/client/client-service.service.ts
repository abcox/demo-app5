import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, filter, map, of, tap } from 'rxjs';
import {
  BaseResponse,
  Client,
  Address,
  ClientPagedResponse,
  ClientService,
} from '../../../backend-api/v1';

// todo: move to environment & test building prod vs. local dev mode
// todo: also, refactor to use the backend-api/v1 module
const host = `http://localhost:5071`; // 'http://localhost:5071/api/'; // 'https://demo-app5-api.azurewebsites.net/api/';
const baseUrl = `${host}/api/`; // 'http://localhost:5071/api/'; // 'https://demo-app5-api.azurewebsites.net/api/';

@Injectable({
  providedIn: 'root',
})
export class ClientServiceService {
  clients = of<Client[]>(data);
  //fetch = (request: PagedListRequest<Client>) => {
  //  return this.clients.pipe(
  //    map(clients =>
  //      clients.filter(client => client.name.includes(request.filter.name))
  //    )
  //  );
  //};
  get = getClientPageFn();
  getById = (id: string) => {
    return this.clientService
      .apiClientIdGet(id)
      .pipe(map(response => response.data as Client));
  };
  update = (id: string, client: Client) => {
    return this.clientService.apiClientIdPut(id, client);
  };
  create = (client: Client) => {
    return this.clientService.apiClientPost(client);
  };
  delete = (id: string) => {
    return this.clientService.apiClientIdDelete(id);
  };
  clientService = inject(ClientService);
  constructor() {}
}

export const getClientPageFn = (): ((
  request: PagedListRequest<Client>
) => Observable<BaseResponse>) => {
  const httpClient = inject(HttpClient);
  return request => {
    const { limit, offset, filter } = request;
    let url = `${baseUrl}client?limit=${limit}&offset=${offset}`;
    if (filter?.name) {
      url += `&filter.name=${filter.name}`;
    }
    return httpClient.get<ClientPagedResponse>(url).pipe(
      tap(resp => console.log(`resp`, resp)),
      map((resp, i) => ({
        ...resp,
        results: resp.list?.map((p, i) => ({
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

//export interface Client {
//  id: number;
//  name: string;
//  address: string;
//  city: string;
//  state: string;
//  zip: string;
//  phone: string;
//  email: string;
//}

export const guid = () => crypto.randomUUID() as unknown as string;

const data: Client[] = [
  {
    id: guid(),
    name: 'Client 1',
    address: {
      street: '1234 Main St',
      city: 'Springfield',
      //state: 'IL',
      postalCode: '62701',
    },
    //phone: '555-555-5555',
    //email: 'client1@gmail.com',
  },
];
