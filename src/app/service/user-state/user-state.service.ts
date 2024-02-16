import { Injectable } from '@angular/core';
import { StoreService } from '../store/store.service';

@Injectable({
  providedIn: 'root',
})
export class UserStateService extends StoreService<UserState> {
  token: string | undefined;
  constructor() {
    super();
  }
}

export interface UserState {
  email: string;
  name: string;
  token: string | undefined;
}

export interface ProfileModel {
  name: string;
  email: string;
  photoUrl?: string;
  registerDate: string;
}
