import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { RegisterRequest } from '../models/register-request.models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  model:RegisterRequest
  constructor(private authService:AuthService,
    private router:Router){
    this.model = {
      email:'',
      password:'',
      password1:''
    }
  }
  onFormSubmit():void{
    if(this.model.password === this.model.password1){
      this.authService.register(this.model).subscribe({
        next: (res) =>{
          this.router.navigateByUrl('/login')
        },
        error: (err) =>{
          Swal.fire(  
            'Error!',  
            'Something Went Wrong. Please retry.',  
            'error'  
          ) 
        }
      })
    }else{
      alert("password doesnot match")
    }
}
}
