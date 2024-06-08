import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthDTO } from '../Models/auth.dto';
import { SharedService } from './shared.service';
import { environment } from 'src/environments/environment';

export interface AuthToken {
  user_id: number;
  access_token: string;
  rol: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private urlQrScanApi: string;

  constructor(private http: HttpClient, private sharedService: SharedService) {
    this.urlQrScanApi = environment.apiUrl;
  }

  login(auth: AuthDTO): Observable<AuthToken> {
    return this.http
      .post<AuthToken>(this.urlQrScanApi + 'login', auth)
      .pipe(catchError(this.sharedService.handleError));
  }

  logout(): Observable<any> {
    return this.http
      .get<any>(this.urlQrScanApi + 'logout')
      .pipe(catchError(this.sharedService.handleError));
  }

  isAuthenticated(): boolean {
    const token = this.getTokenFromLocalStorage();
    return !!token;
  }

  private getTokenFromLocalStorage(): string | null {
    return localStorage.getItem('access_token');
  }
}
