import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  access_token: string | null;

  constructor(private localStorageService: LocalStorageService) {
    this.access_token = this.localStorageService.get('access_token');
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.access_token = this.localStorageService.get('access_token');
    if (this.access_token) {
      // Verificar si la solicitud contiene datos de FormData
      if (req.body instanceof FormData) {
        // Si es FormData, establecer el encabezado 'Authorization'
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${this.access_token}`,
          },
        });
      } else {
        // Si no es FormData, establecer el encabezado 'application/json'
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${this.access_token}`,
            'Content-Type': 'application/json; charset=utf-8',
            Accept: 'application/json',
          },
        });
      }
    }

    return next.handle(req);
  }
}
