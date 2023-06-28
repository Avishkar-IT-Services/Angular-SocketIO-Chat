import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserSignupInfo, UserLoginInfo, ChannelMessage } from "../interface/app-interface";
import { environment } from 'src/environments/environment.dev';
interface UserInfo {
    email: string,
    otp: number
}

@Injectable({
    providedIn: 'root'
})

export class HttpService {
    constructor(private http: HttpClient) { }
    createUserAccount(userInfo: UserSignupInfo): Observable<any> {
        return this.http.post<UserSignupInfo>(`${environment.baseUrl}/create-account`, userInfo);
    }
    loginUserAccount(info: UserLoginInfo): Observable<any> {
        return this.http.post<UserLoginInfo>(`${environment.baseUrl}/login-account`, info)
    }
    getChannelMessage(channelName: string): Observable<any> {
        return this.http.get<ChannelMessage>(`${environment.baseUrl}/channel-message/${channelName}`)
    }
    verifyAccount(userInfo: UserInfo): Observable<any> {
        return this.http.post<UserInfo>(`${environment.baseUrl}/verify-email`, userInfo)
    }
}