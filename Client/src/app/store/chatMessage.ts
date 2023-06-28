import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

interface userMessage {
    name: string,
    message: string
}


@Injectable({
    providedIn: 'root'
})


export class ChatMessage {

    constructor() { }

    public chatMessageList$: BehaviorSubject<any> = new BehaviorSubject('');


    saveUserMessage(msg: userMessage) {
        this.chatMessageList$.next(msg)
    }

    getUserMessage() {
        return this.chatMessageList$.asObservable()
    }

}