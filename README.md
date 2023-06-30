 # Angular-SocketIO-Chat 🚀
![image](https://github.com/Avishkar-IT-Services/Angular-SocketIO-Chat/assets/137886016/e92dfe98-5bd0-48f3-beb6-3cfdc0850dd1)

Angular chat app by using MEAN and socket.io.

it's simple to use our chat app but before showing you how to use it,  I would like to tell you how socket works, socket enables bi-directional communication, bi-directional means 2-way communication  <br> 

In simple words, If I say Hii to you, you will say hello to me similarly, you can think of the socket bi-directional communication <br> 

If a client sends a message to the server and the server quickly sends a message back to the client in a few seconds.

Let's directly jump and see how messages quickly send to the server and client. 

You don't need to do much work to make this project run instead you just need to do some basic things,  dont worry, follow the step one by one.

## Step 1 - Clone the project 
``` Open the visual studio code, type git clone https://github.com/Avishkar-IT-Services/Angular-SocketIO-Chat.git ```

After hitting enter, now you can see 2 folders <br>
1. Client <br>
2. Server <br>

### Configure server 
Open  the `.env` file and change the database url as per your database config, mostly base url is same but the database name is different

![image](https://github.com/Avishkar-IT-Services/Angular-SocketIO-Chat/assets/137886016/a3193daa-6250-42eb-9583-79d927c28b10)

If you want to run the server in a different port, then you can change the port in the `server.js` file  and also you need to change url in client also

## Run the project 

### Server <br>
Open the client side terminal and type ``` npm run start ```, in order to start the server

![image](https://github.com/Avishkar-IT-Services/Angular-SocketIO-Chat/assets/137886016/f36fb214-7cf9-4693-b5fd-db6a06941fa4)

### MongoDB <br>
Open the MonogoDB compass and click on connect button

![image](https://github.com/Avishkar-IT-Services/Angular-SocketIO-Chat/assets/137886016/530fb662-3416-406f-8353-a149482126d2)

### Client <br>
Open the client side terminal and type ``` ng serve -o```, it will automatically open the app in the browser.

![image](https://github.com/Avishkar-IT-Services/Angular-SocketIO-Chat/assets/137886016/405b03d8-1c32-4cd5-9b52-8ad1d7fffa86)

Now you can see the login page initially, click on the `create a new account`

![image](https://github.com/Avishkar-IT-Services/Angular-SocketIO-Chat/assets/137886016/0c8262f9-c040-4334-b4f9-baefce8e7e39)

## Create an account
### Step 1
Let's fill out some basic stuff and click on the signup button

![image](https://github.com/Avishkar-IT-Services/Angular-SocketIO-Chat/assets/137886016/739d4275-fc9a-40d8-a57e-3a3584362932)

### Step 2
Open your email account, by now you must receive a `4 digits OTP`, after giving OTP then click on verify your account 

![image](https://github.com/Avishkar-IT-Services/Angular-SocketIO-Chat/assets/137886016/d7dd7586-9bdd-4893-97c9-682b8bee58af)

Note - if you want to logout then click on profile, there you can see the logout button 
once you log out, now you can see the login page by using `email and password` you can log in.

![image](https://github.com/Avishkar-IT-Services/Angular-SocketIO-Chat/assets/137886016/422675cd-faad-4c60-bc10-206aeb5b186f)

### Step 3 
Once the verification is done, you can see our awesome Chat Homepage

![image](https://github.com/Avishkar-IT-Services/Angular-SocketIO-Chat/assets/137886016/345e1eb9-3d4c-41f4-95fa-8192ba087c82)


## Let's start the conversation

You can see, I have opened 2 accounts  with 2 different browser 

![image](https://github.com/Avishkar-IT-Services/Angular-SocketIO-Chat/assets/137886016/1387dd72-40ec-4e76-8b80-f3971cdab83e)

In the left sidebar, we have all the rooms (similarily WhatsApp group), if you click on any particular room, you can join the room and start a conversation with other users.

![image](https://github.com/Avishkar-IT-Services/Angular-SocketIO-Chat/assets/137886016/ea4a552e-d946-4835-a32b-1b56e029d738)

while sending a message, you can see on the right window, some user is typing - awesome 

![image](https://github.com/Avishkar-IT-Services/Angular-SocketIO-Chat/assets/137886016/6a4df290-f2af-41d5-bba8-302737863aa1)

similarly, you can send videos and images and also before sending you can preview those

![image](https://github.com/Avishkar-IT-Services/Angular-SocketIO-Chat/assets/137886016/d35667b9-cfeb-4d25-a7c2-d4b1aea63e1d)
<br>
![image](https://github.com/Avishkar-IT-Services/Angular-SocketIO-Chat/assets/137886016/fb6cd4e0-e29b-4421-8ed5-da008f76b412)
<br>
![image](https://github.com/Avishkar-IT-Services/Angular-SocketIO-Chat/assets/137886016/d076506c-21a7-4810-975b-9d8d8dce5541)
<br>
![image](https://github.com/Avishkar-IT-Services/Angular-SocketIO-Chat/assets/137886016/356b6304-15c7-4300-a179-c8e97ff68c5c)


Thanks,<br>
Avishkar IT Service












