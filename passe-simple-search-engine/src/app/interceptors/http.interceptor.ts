import {
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export function HttpErrorInterceptor(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const router = inject(Router);

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 0 || error.status === 500) {
        // For some reason if the backend doesn't run it'll throw a 0 error, which makes no sense but whatever
        console.error('The backend is down. Please run the backend server.');
        router.navigate(['/500']);
      } else if (error.status === 418) {
        router.navigate(['/418']);
      }

      return throwError(() => error);
    })
  );
}
