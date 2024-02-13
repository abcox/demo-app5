import { Injectable } from '@angular/core';
import { StoreService } from '../store/store.service';

export interface UserState {
  email: string;
  name: string;
  token: string | undefined;
}

@Injectable({
  providedIn: 'root',
})
export class UserStateService extends StoreService<UserState> {
  token: string | undefined;
  constructor() {
    super();
  }
}
