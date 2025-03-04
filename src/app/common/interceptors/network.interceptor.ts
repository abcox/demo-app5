import { Injectable, inject } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
  HttpClient,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class NetworkInterceptor implements HttpInterceptor {
  readonly headerDict = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let headers = new HttpHeaders(this.headerDict);
    let options: { headers?: HttpHeaders; params?: HttpParams } = {};
    let reqOut = req.clone({
      /* setHeaders: {
        mode: 'no-cors',
      }, */
    });
    /* if (reqOut.method = "POST") {
      reqOut = this.http.post
    } */
    return next.handle(reqOut).pipe(
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
  constructor(private http: HttpClient) {}
}
