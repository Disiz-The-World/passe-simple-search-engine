import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { UserModel } from '../models/user.model';
import { BaladeModel } from '../models/balade.model';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  balades = '/balades';
  users = '/users';

  constructor(private http: HttpClient) {}

  public async getBalades(filters: { [key: string]: any }) {
    let url =
      environment.apiUrl +
      this.balades +
      (Object.keys(filters).length === 0 ? '' : '?');

    url += Object.entries(filters)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');

    return await firstValueFrom(this.http.get<BaladeModel[]>(url));
  }

  public updateBalade(baladeId: number, data: { [key: string]: any }) {
    const url = environment.apiUrl + '/balades/' + baladeId;

    this.http.put(url, data).subscribe((response) => {
      return response;
    });

    return true;
  }

  public async getUsers(filters: {}) {
    let url =
      environment.apiUrl +
      this.users +
      (Object.keys(filters).length === 0 ? '' : '?');

    url += Object.keys(filters)
      .map((filter: string, index: number) => {
        return `${index}=${filter}`;
      })
      .join('&');

    return await firstValueFrom(this.http.get<UserModel[]>(url));
  }
}
