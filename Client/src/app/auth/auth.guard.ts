import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from "../service/auth.service";

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }
  canActivate(): any {
    if (!this.authService.isAuthenticated()) {
      this.router.navigateByUrl("/chat-login")
    } else {
      return this.authService.isAuthenticated()
    }
  }
}
