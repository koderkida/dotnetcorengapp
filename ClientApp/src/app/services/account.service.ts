
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { KKCommon } from '../utilities/kkcommon';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private baseUrlLogin = '/api/account/login';
  private baseUrlRegister = '/api/account/register';

  private loginStatus = new BehaviorSubject<boolean>(this.checkLoginStatus());
  private UserName = new BehaviorSubject<string>(localStorage.getItem('username'));
  private UserRole = new BehaviorSubject<string>(localStorage.getItem('userRole'));

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string) {
    return this.http.post<any>(KKCommon.API_LOGIN, { username, password }).pipe(
      map(result => {
        if (result && result.token) {
          this.loginStatus.next(true);
          localStorage.setItem('loginStatus', '1');
          localStorage.setItem('jwt', result.token);
          localStorage.setItem('username', result.username);
          localStorage.setItem('expiration', result.expiration);
          localStorage.setItem('userRole', result.userRole);
          this.UserName.next(localStorage.getItem('username'));
          this.UserRole.next(localStorage.getItem('userRole'));
        }
        return result;
      })
    );
  }

  logout() {
    this.loginStatus.next(false);
    localStorage.removeItem('jwt');
    localStorage.removeItem('userRole');
    localStorage.removeItem('username');
    localStorage.removeItem('expiration');
    localStorage.setItem('loginStatus', '0');
    this.router.navigate(['/login']);
    console.log('Logged Out Successfully');
  }

  checkLoginStatus(): boolean {
    const loginCookie = localStorage.getItem('loginStatus');
    if (loginCookie === '1') {
      return true;
    }
    return false;
  }

  register(username: string, password: string, email: string) {
    return this.http.post<any>(KKCommon.API_REGISTER, { username, password, email }).pipe(map(result => {
      return result;
    }, error => {
      return error;
    }));
  }
  get isLoggesIn() {
    return this.loginStatus.asObservable();
  }

  get currentUserName() {
    return this.UserName.asObservable();
  }

  get currentUserRole() {
    return this.UserRole.asObservable();
  }
}
