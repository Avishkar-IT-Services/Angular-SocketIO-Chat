import { Component } from '@angular/core';
@Component({
  selector: 'app-chat-loading',
  templateUrl: './chat-loading.component.html',
  styleUrls: ['./chat-loading.component.scss']
})
export class ChatLoadingComponent {
  constructor() { }
  versions = [{
    width: '100px',
    height: '30px',
    color: '#541554'
  }
  ]
}
