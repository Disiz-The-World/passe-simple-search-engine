import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../models/user.model';
import { environment } from '../../environments/environment';
import { routes } from '../routes/app.routes';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly SESSION_TOKEN_KEY = 'userAuthenticationToken';

  private currentUser?: UserModel;

  constructor(
    private httpService: HttpClient,
    private router: Router
  ) {}

  public getCurrentUser(): UserModel | undefined {
    return this.currentUser;
  }

  public getCurrentUserToken(): string | null {
    return typeof sessionStorage !== 'undefined'
      ? sessionStorage.getItem(this.SESSION_TOKEN_KEY)
      : null;
  }

  public isLoggedIn(): boolean {
    return this.getCurrentUserToken() != null;
  }

  public login(username: string, password: string): boolean {
    const user = this.httpService.get<UserModel[]>(
      `${environment.apiUrl}/users?username=${username}&password=${password}`
    );

    user.subscribe((data) => {
      if (data.length > 0) {
        this.currentUser = data[0];
        sessionStorage.setItem(
          this.SESSION_TOKEN_KEY,
          this.currentUser.id.toString()
        );
      }
    });

    if (this.isLoggedIn()) {
      this.router.navigate(['/']);
      return true;
    }

    return false;
  }

  public logout(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (typeof sessionStorage !== 'undefined')
        sessionStorage.removeItem(this.SESSION_TOKEN_KEY);
      this.currentUser = undefined;
      resolve();
    });
  }
}
