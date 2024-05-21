import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { createAsyncState } from 'ngx-lift';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  usersState$ = this.http.get<User[]>(`http://jsonplaceholder.typicode.com/users`).pipe(createAsyncState());
  usersState = toSignal(this.usersState$, { requireSync: true });

  getUser = (id: number) => this.http.get<User[]>(`http://jsonplaceholder.typicode.com/users/${id}`);

  getTodosState = (userId: number) =>
    this.http.get<Todo[]>(`http://jsonplaceholder.typicode.com/todos`, { params: { userId } }).pipe(createAsyncState());
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  };
}

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
