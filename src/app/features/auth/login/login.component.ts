import { Component } from '@angular/core';
import { LoginRequest } from '../models/login-request.models';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  model: LoginRequest

  constructor(private authService:AuthService,
    private cookieService: CookieService,
    private router:Router){
    this.model = {
      email:'',
      password:''
    }

  }
  onFormSubmit(){
    this.authService.login(this.model)
    .subscribe({
      next : (res) =>{
        // set auth cookie
        this.cookieService.set('Authorization', `Bearer ${res.token}`,
        undefined, '/', undefined, true, 'Strict');
        
        // Save user information in browser localStorage

        this.authService.setUser({
          email:res.email,
          roles:res.roles
        });

        // redirect to the homepage
        this.router.navigateByUrl('/')
      },
      error: (err) =>{
        const errorMessage = err.error?.errors?.message?.[0] || 'Unknown error occurred';
        Swal.fire(  
          'Error!',  
          `${errorMessage}`,  
          'error'  
        ) 
      }
    });
  }
}
