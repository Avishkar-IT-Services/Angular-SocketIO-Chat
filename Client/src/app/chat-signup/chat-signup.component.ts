import { Component } from '@angular/core';
import { HttpService } from "../service/http.service";
import { NavigateService } from "../service/navigate.service";
import { MessageService } from 'primeng/api';
import { SignupError } from '../interface/app-interface';

@Component({
  selector: 'app-chat-signup',
  templateUrl: './chat-signup.component.html',
  styleUrls: ['./chat-signup.component.scss'],
  providers: [MessageService]
})

export class ChatSignupComponent {
  constructor(private http: HttpService, private navigate: NavigateService, private messageService: MessageService) { };
  name: string = "";
  email: string = "";
  password: string = "";
  otp: string = "";
  otpError: boolean = false;
  signupErr: SignupError = {
    isName: false,
    isEmail: false,
    isPass: false
  };
  isOtp: boolean = false;
  createAcoount() {
    let user = { name: this.name, email: this.email, password: this.password };
    if (!user.name) {
      this.signupErr.isName = true
      this.signupErr.isEmail = false
      this.signupErr.isPass = false
    }
    else if (!user.email) {
      this.signupErr.isEmail = true
      this.signupErr.isName = false
      this.signupErr.isPass = false
    }
    else if (!user.password) {
      this.signupErr.isPass = true
      this.signupErr.isName = false
      this.signupErr.isEmail = false
    }
    else {
      this.signupErr.isName = false
      this.signupErr.isEmail = false
      this.signupErr.isPass = false
      this.http.createUserAccount(user).subscribe((data) => {
        this.isOtp = true
        localStorage.setItem("userInfo", JSON.stringify(data.user));
        localStorage.setItem("userToken", JSON.stringify(data.token));
        this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Please verify account' });
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

  handleOtp() {
    if (this.otp.length > 4) {
      this.messageService.add({ severity: 'error', summary: 'Failed', detail: "Otp should be 4 character" });
    } else {
      let userInfo = {
        email: this.email,
        otp: +this.otp
      }
      this.http.verifyAccount(userInfo).subscribe((res) => {
        if (res?.verifyUser) {
          this.isOtp = false
          if (localStorage.hasOwnProperty('userToken')) this.navigate.navigatePage("/chat-dashboard")
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Account has been successfully created' });
        } else {
          this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'OTP is incorrect' });
        }
      }, (err) => {
        this.messageService.add({ severity: 'error', summary: 'Failed', detail: err?.error?.errors[0]?.msg });
      })
    }
  }
}
