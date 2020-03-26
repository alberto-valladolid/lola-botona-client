import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from 'src/app/_services/token-storage.service';


@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {


  isLoggedIn: boolean; 
  private roles: string[];

  constructor(private tokenStorageService: TokenStorageService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.isLoggedIn = !!this.tokenStorageService.getToken();

  
      if (this.isLoggedIn) {
        const user = this.tokenStorageService.getUser();
        this.roles = user.roles;      
        if(this.roles.includes('ROLE_ADMIN')){          
          return true;
        }
        this.router.navigate([`404-pagina-no-encontrada`]);
        return false;    
      }

      
  }
  
}
