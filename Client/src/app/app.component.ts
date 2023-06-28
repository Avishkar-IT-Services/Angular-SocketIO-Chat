import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessagesService } from './service/chat.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(private chatService: MessagesService) { }

  ngOnInit() {
    // Get token from the localstorage
    // console.log("works on when components rendering to the dom")
    this.chatService.setUpSocketConnection()
  }

  ngOnDestroy(): void {
    this.chatService.disconnect()
  }

}




