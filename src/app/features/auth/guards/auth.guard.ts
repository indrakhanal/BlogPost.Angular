import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';
import { jwtDecode } from 'jwt-decode';

export const authGuard: CanActivateFn = (route, state) => {
  // check for jwt token
  const cookieService = inject(CookieService)
  const authService = inject(AuthService)
  const router = inject(Router)
  const user = authService.getUser()
  let token = cookieService.get('Authorization')
  if(token){
    token.replace('Bearer', '')
    const decodedToken:any = jwtDecode(token)

    const expirationDate = decodedToken.exp * 1000
    const currentTime = new Date().getTime();
    if(expirationDate<currentTime){
      //Logout
      authService.logout()
      return router.createUrlTree(['login'], {queryParams:{returnUrl:state.url}})
    }else{
      if(user?.roles.includes('Writer')){
        return true
      }else{
        alert('Access Denied')
        return router.navigateByUrl('/')
      }
    }
  }else{
      authService.logout()
      return router.createUrlTree(['login'], {queryParams:{returnUrl:state.url}})
  }
};
