import { Injectable, inject } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class NetworkInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(() => console.log('NetworkInterceptor request', req)),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 0) {
          // Network error or API unreachable
          console.error('API or network is unreachable:', error.message);
        } else {
          // Handle other types of errors
          console.error(`HTTP Error: ${error.status} ${error.statusText}`);
        }
        return throwError(() => error);
      })
    );
  }
}
