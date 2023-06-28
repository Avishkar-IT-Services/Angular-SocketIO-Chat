import { Injectable } from '@angular/core';
import { io } from "socket.io-client";
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.dev';
import { RoomChat } from '../interface/app-interface';


interface roomMessage {
  user: string,
  message: string
}

interface UserTyping {
  isTyping: boolean,
  userName: string
}

@Injectable({
  providedIn: 'root'
})

export class MessagesService {
  public message$: BehaviorSubject<any> = new BehaviorSubject('');
  public userTyping$: BehaviorSubject<any> = new BehaviorSubject('');
  public userStopTyping$: BehaviorSubject<any> = new BehaviorSubject('');
  public newUserJoin$: BehaviorSubject<any> = new BehaviorSubject('');
  public uploadUserImage$: BehaviorSubject<any> = new BehaviorSubject('');
  private socket: any = null

  setUpSocketConnection() {
    this.socket = io(environment.baseUrl, {
      auth: {
        token: localStorage.getItem("userToken")
      }
    })
  }

  disconnect() {
    if (this.socket) {
      this.socket.on("disconnect")
    }
  }

  uploadImages(room: string, imageUrl: string) {
    if (this.socket) {
      this.socket.emit("upload-image", room, imageUrl)
    }
  }

  userTyping(room: string) {
    if (this.socket) {
      this.socket.emit("user-typing", room)
    }
  }

  stopTyping(room: string) {
    if (this.socket) {
      this.socket.emit('user-stop', room);
    }
  }

  joinRoom(room: string, userName: string) {
    if (this.socket) {
      this.socket.emit("join-room", { room, userName })
    }
  }

  newUserJoined() {
    this.socket.on("newUserJoined", (user:any) => {
      this.newUserJoin$.next(user)
    })
    return this.newUserJoin$.asObservable();
  }

  sendRoomMessage(data: roomMessage) {
    this.socket.emit("roomMessage", data)
  }

  sendMessage(room: string, message: RoomChat) {
    if (this.socket) {
      this.socket.emit("send-message", room, message)
    }
  }

  getMessage() {
    this.socket.on('get-message', (message: RoomChat) => {
      this.message$.next(message)
    })
    return this.message$.asObservable()
  }

  getTypingMessage() {
    this.socket.on('user-start-typing', (message: UserTyping) => {
      this.userTyping$.next(message)
    })
    return this.userTyping$.asObservable()
  }

  getStopTyping() {
    this.socket.on('user-stop-typing', (message: any) => {
      this.userStopTyping$.next(message)
    })
    return this.userStopTyping$.asObservable()
  }

  getUploadImage() {
    this.socket.on('upload-room-image', (image: string) => {
      this.uploadUserImage$.next(image)
    })
    return this.uploadUserImage$.asObservable()
  }
}
