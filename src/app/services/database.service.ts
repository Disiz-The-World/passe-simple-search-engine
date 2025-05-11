import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  balades = '/balades';
  users = '/users';

  constructor(private http: HttpClient) {}

  public getBalades(filters: {}): Observable<any> {
    let url =
      environment.apiUrl +
      this.balades +
      (Object.keys(filters).length === 0 ? '' : '?');

    url += Object.keys(filters)
      .map((filter: string, index: number) => {
        return `${index}=${filter}`;
      })
      .join('&');

    return this.http.get(url);
  }

  public findBaladeById(id: number): Observable<any> {
    return this.http.get(`${this.balades}?id=${id}`);
  }

  public getUsers(filters: {}): Observable<any> {
    let url =
      environment.apiUrl +
      this.users +
      (Object.keys(filters).length === 0 ? '' : '?');

    url += Object.keys(filters)
      .map((filter: string, index: number) => {
        return `${index}=${filter}`;
      })
      .join('&');

    return this.http.get(url);
  }
}
