import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { RandomChannel, UserInfo, RoomChat, UserTyping } from '../interface/app-interface';
import { MessagesService } from '../service/chat.service';
import { HttpService } from '../service/http.service';
import { UploadService } from '../service/upload.service';
@Component({
  selector: 'app-chat-parent',
  templateUrl: './chat-dashboard.component.html',
  styleUrls: ['./chat-dashboard.component.scss']
})
export class ChatDashboardComponent implements OnInit {
  @ViewChild('videoChat', { static: false })
  videoEle!: ElementRef;
  constructor(private chatService: MessagesService, private http: HttpService, private upload: UploadService, private changeDetectorRef: ChangeDetectorRef) { }
  channelName: string = ""
  channelList: RandomChannel[] = [
    {
      id: 1,
      name: "Random",
    },
    {
      id: 2,
      name: "Science",
    },

    {
      id: 3,
      name: "Technology",
    },

    {
      id: 4,
      name: "Politics",
    },

    {
      id: 5,
      name: "Education",
    },

    {
      id: 6,
      name: "Meme",
    },
  ]
  joinedUser: string = ""
  channelResult: string[] = [];
  inputValue: string = "";
  roomValue: string = "";
  randomList: RoomChat[] = [];
  scienceList: RoomChat[] = [];
  technologyList: RoomChat[] = [];
  politicsList: RoomChat[] = [];
  educationList: RoomChat[] = [];
  memeList: RoomChat[] = [];
  userInfo: UserInfo = {
    name: '',
    email: ''
  }
  url: any = "";
  format: string = "";
  uploadFileShortName: string = "";
  uploadFileFullName: string = "";
  isCancelUpload: boolean = false;
  isUserType: boolean = false;
  userTyperName: string = "";
  userImageUpload: string = "";
  isLoading: boolean = false;
  isSendBtn: boolean = true;

  handleChatDisplay(channel: RandomChannel) {
    this.channelName = channel.name;
    this.isLoading = true
    this.http.getChannelMessage(channel.name).subscribe((data) => {
      switch (channel.name) {
        case "Random":
          this.chatService.joinRoom(channel.name, this.userInfo.name);
          this.randomList = data.channel
          this.isLoading = false
          break;
        case "Science":
          this.chatService.joinRoom(channel.name, this.userInfo.name);
          this.scienceList = data.channel
          this.isLoading = false
          break;
        case "Technology":
          this.chatService.joinRoom(channel.name, this.userInfo.name);
          this.technologyList = data.channel
          this.isLoading = false
          break;
        case "Politics":
          this.chatService.joinRoom(channel.name, this.userInfo.name);
          this.politicsList = data.channel
          this.isLoading = false
          break;
        case "Education":
          this.chatService.joinRoom(channel.name, this.userInfo.name);
          this.educationList = data.channel
          this.isLoading = false
          break;
        case "Meme":
          this.chatService.joinRoom(channel.name, this.userInfo.name);
          this.memeList = data.channel
          this.isLoading = false
          break;
        default:
          break;
      }
    })
  }

  getShortFileName(str: string) {
    return str.slice(0, 30)
  }

  async onSelectFile(event: Event) {
    let file = (event.target as HTMLInputElement).files && (event.target as HTMLInputElement).files![0];
    if (file) {
      let reader = new FileReader();
      reader.readAsDataURL(file)
      if (file.type.indexOf('image') > -1) {
        this.format = 'image';
        this.uploadFileShortName = this.getShortFileName(file?.name);
        this.uploadFileFullName = file?.name;
      } else if (file.type.indexOf('video') > -1) {
        this.format = 'video';
        this.uploadFileShortName = this.getShortFileName(file?.name);
        this.uploadFileFullName = file?.name;
      }

      const data = new Promise((resolve, reject) => {
        reader.onload = () => resolve(reader.result);
        reader.onerror = (err) => reject(err)
      })

      this.url = await data;
    }
  }

  handleCancelUpload() {
    this.url = ""
    this.format = ""
    this.uploadFileShortName = ""
    this.uploadFileFullName = ""
  }

  HandleReset(event: Event) {
    (event.target as HTMLInputElement).value = ""
  }

  getTodayDate() {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  sendUploadMessage(room: string) {
    if (this.url) {
      const messageObj = {
        name: this.userInfo.name,
        messageText: this.inputValue,
        channelName: this.channelName,
        upload: {
          url: this.url,
          type: this.format,
          name: this.uploadFileFullName
        },
        sentDate: this.getTodayDate()
      }
      this.chatService.sendMessage(room, messageObj);
      this.handleCancelUpload()
    } else {
      const messageObj = {
        name: this.userInfo.name,
        messageText: this.inputValue,
        channelName: this.channelName,
        sentDate: this.getTodayDate()
      }
      this.chatService.sendMessage(room, messageObj)
    }
    this.inputValue = "";
  }

  sendMessage() {
    this.changeDetectorRef.detectChanges()
    this.chatService.stopTyping(this.channelName);
    switch (this.channelName) {
      case "Random":
        this.sendUploadMessage(this.channelName)
        break;
      case "Science":
        this.sendUploadMessage(this.channelName)
        break;
      case "Technology":
        this.sendUploadMessage(this.channelName)
        break;
      case "Politics":
        this.sendUploadMessage(this.channelName)
        break;
      case "Education":
        this.sendUploadMessage(this.channelName)
        break;
      case "Meme":
        this.sendUploadMessage(this.channelName)
        break;
      default:
        break;
    }

  }

  userTyping(e: Event) {
    this.isSendBtn = false
    this.chatService.userTyping(this.channelName)
    if ((e.target as HTMLInputElement).value === '') {
      this.isSendBtn = true
      this.chatService.stopTyping(this.channelName);
    }
  }

  ngOnInit(): void {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo") || '{}');
    this.chatService.newUserJoined().subscribe((data: any) => {
      this.joinedUser = data.message
    })
    this.chatService.getMessage().subscribe((message: RoomChat) => {
      switch (this.channelName) {
        case "Random":
          this.randomList.push(message)
          break;
        case "Science":
          this.scienceList.push(message)
          break;
        case "Technology":
          this.technologyList.push(message)
          break;
        case "Politics":
          this.politicsList.push(message)
          break;
        case "Education":
          this.educationList.push(message)
          break;
        case "Meme":
          this.memeList.push(message)
          break;
        default:
          break;
      }
    })

    this.chatService.getTypingMessage().subscribe((message: UserTyping) => {
      this.isUserType = message.isTyping;
      this.userTyperName = message.userName
    })
    this.chatService.getStopTyping().subscribe((val: boolean) => {
      this.isUserType = val
    })
    this.chatService.getUploadImage().subscribe((img: string) => {
      this.userImageUpload = img
    })
  }

}
