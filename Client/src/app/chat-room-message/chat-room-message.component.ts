import { Component, Input } from '@angular/core';
import { RoomChat } from '../interface/app-interface';
@Component({
  selector: 'app-chat-room-message',
  templateUrl: './chat-room-message.component.html',
  styleUrls: ['./chat-room-message.component.scss']
})
export class ChatRoomMessageComponent {
  @Input() roomMessage: RoomChat[] = []
}
