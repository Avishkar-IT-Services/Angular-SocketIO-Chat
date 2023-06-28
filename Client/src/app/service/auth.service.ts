import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated() {
    return localStorage.getItem("userToken") ? true : false
  }
}
