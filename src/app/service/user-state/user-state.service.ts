import { Injectable, signal } from '@angular/core';
import { StoreService } from '../store/store.service';

@Injectable({
  providedIn: 'root',
})
export class UserStateService extends StoreService<UserState> {
  token: string | undefined;
  roles = signal<string[]>([]);
  profile = signal<ProfileModel | undefined>(undefined);
  constructor() {
    super();
    this.init();
  }
  init() {
    //this.roles.set(['admin', 'user']);
    this.profile.set({
      email: '',
      name: '',
      roles: ['admin', 'user'], // todo: populate with call to get user profile when isAuthenticated
    });
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
  registerDate?: string;
  roles: string[];
}
