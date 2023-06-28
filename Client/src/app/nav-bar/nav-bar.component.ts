import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { NavigateService } from '../service/navigate.service';
@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html'
})
export class NavBarComponent implements OnInit {
  constructor(private navigate: NavigateService) { }
  items!: MenuItem[];

  handleUserProfile(url: Event) {
    switch ((url.target as HTMLInputElement).innerText) {
      case "Profile":
        this.navigate.navigatePage("/chat-profile")
        break
      case "Home":
        this.navigate.navigatePage("/chat-dashboard")
        break
    }
  }
  ngOnInit() {
    this.items = [
      {
        label: 'Chat',
      }
    ];
  }

}

