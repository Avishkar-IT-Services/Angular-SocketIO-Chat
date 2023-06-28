import { Component } from '@angular/core';
import { NavigateService } from "../service/navigate.service";
import { HttpService } from "../service/http.service";
import { MessageService } from 'primeng/api';
import { LoginError } from '../interface/app-interface';

@Component({
  selector: 'app-chat-login',
  templateUrl: './chat-login.component.html',
  styleUrls: ['./chat-login.component.scss'],
  providers: [MessageService]
})

export class ChatLoginComponent {
  constructor(private navigate: NavigateService, private http: HttpService, private messageService: MessageService) { }
  email: string = "";
  password: string = "";
  loginErr: LoginError = {
    isEmail: false,
    isPass: false
  }

  navigateSignup() {
    this.navigate.navigatePage("/chat-signup")
  }

  loginUser() {
    let user = { email: this.email, password: this.password };
    if (!user.email) {
      this.loginErr.isEmail = true
      this.loginErr.isPass = false
    }
    else if (!user.password) {
      this.loginErr.isPass = true
      this.loginErr.isEmail = false
    } else {
      this.http.loginUserAccount(user).subscribe((data) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Successfully logined' });
        localStorage.setItem("userInfo", JSON.stringify(data.user));
        localStorage.setItem("userToken", JSON.stringify(data.token));
        if (localStorage.hasOwnProperty('userToken')) this.navigate.navigatePage("/chat-dashboard")
      }, (err) => {
        if (err?.error) {
          if (err?.error?.message) {
            this.messageService.add({ severity: 'error', summary: 'Failed', detail: err?.error?.message });
          } else {
            this.messageService.add({ severity: 'error', summary: 'Failed', detail: err?.error?.errors[0]?.msg });
          }
        }
      })
    }
  }
}
