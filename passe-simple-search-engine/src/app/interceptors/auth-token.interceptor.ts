import { inject } from '@angular/core';
import { HttpRequest, HttpEvent, HttpHandlerFn } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

export function AuthTokenInterceptor(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const authService = inject(AuthService);

  if (authService.isLoggedIn()) {
    const authRequest = request.clone({
      // disabled due to JSON server not allowing CORS requests with Authorization header
      // workaround : https://json-server.dev/json-server-cors/
      setHeaders: {
        Authorization: 'Bearer ' + authService.getCurrentUserToken(),
      },
    });

    return next(authRequest);
  }

  return next(request);
}
