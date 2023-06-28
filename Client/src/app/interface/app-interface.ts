export interface UserSignupInfo {
    name: string,
    email: string,
    password: string
}

export interface UserLoginInfo {
    email: string,
    password: string
}

export interface RandomChannel {
    id: number,
    name: string
}

export interface ChannelMessage {
    id: string,
    message: string,
    channel: string,
    createdAt: string
}

// chat dashboard
export interface room {
    id: number;
    name: string;
}

export interface RoomChat {
    name: string,
    messageText: string,
    channelName: string,
    upload?: {
        url: string,
        type: string,
        name: string
    },
    sentDate?: string
}

export interface UserInfo {
    name: string,
    email: string
}

export interface UserTyping {
    isTyping: boolean,
    userName: string
}

// chat-login component
export interface LoginError {
    isEmail: boolean,
    isPass: boolean
}

// chat-profile
export interface UserInfo {
    name: string,
    email: string
}

//chat-signup
export interface SignupError {
    isName: boolean,
    isEmail: boolean,
    isPass: boolean
}