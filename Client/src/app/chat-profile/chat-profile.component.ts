import { Component, OnInit } from '@angular/core';
import { NavigateService } from '../service/navigate.service';
import { UserInfo } from '../interface/app-interface';
@Component({
  selector: 'app-chat-profile',
  templateUrl: './chat-profile.component.html',
  styleUrls: ['./chat-profile.component.scss']
})
export class ChatProfileComponent implements OnInit {
  constructor(private navigate: NavigateService) { }
  userInfo: UserInfo = {
    name: '',
    email: ''
  }
  handleLogout() {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("userToken");
    this.navigate.navigatePage("/chat-login")
  }
  ngOnInit(): void {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo") || '{}')
  }

}
