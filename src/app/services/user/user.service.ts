import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url: string = 'users';
  constructor(public api: ApiService) {}

  load(): Observable<User[]> {
    return this.api
      .get(this.url)
      .pipe(map(users => users.map(user => new User(user))));
  }

  post(data: User): Observable<any> {
    return this.api.post(this.url, data);
  }

  update(data: User): Observable<any> {
    const id = typeof data === 'number' ? data : data.id;
    const url = `${this.url}/${id}`;
    return this.api.patch(url, data);
  }

  delete(data: User | number): Observable<any> {
    const id = typeof data === 'number' ? data : data.id;
    const url = `${this.url}/${id}`;
    return this.api.delete(url);
  }
}
