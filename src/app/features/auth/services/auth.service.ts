import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/login-request.models';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginResponse } from '../models/login-response.models';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { User } from '../models/user.model';
import { CookieService } from 'ngx-cookie-service';
import { RegisterRequest } from '../models/register-request.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService { 

  constructor(private http:HttpClient,
    private cookieServices:CookieService) { }
  $user = new BehaviorSubject<User | undefined>(undefined); 
  login(request:LoginRequest): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${environment.apiBaseUrl}/api/auth/login`, {
      email:request.email,
      password:request.password
    });
  }

  register(request:RegisterRequest){
    return this.http.post<RegisterRequest>(`${environment.apiBaseUrl}/api/auth/register`, {
      email:request.email,
      password:request.password
    });
  }

  setUser(user: User):void{
      this.$user.next(user);
      localStorage.setItem('user-email', user.email);
      localStorage.setItem('user-roles', user.roles.join(','));
  }

  user(): Observable<User | undefined>{
    return this.$user.asObservable();
  }

  getUser(): User |undefined {
    const email = localStorage.getItem('user-email')
    const roles = localStorage.getItem('user-roles')

    if (email && roles){
      const user:User = {
        email:email,
        roles:roles.split(',')
      }
      return user
    }
    return undefined
  }

  logout():void{
    localStorage.clear();
    this.cookieServices.delete('Authorization', '/')
    this.$user.next(undefined);
  }
}
