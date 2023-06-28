import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "./auth/auth.guard";
import { ChatLoginComponent } from "./chat-login/chat-login.component";
import { ChatDashboardComponent } from './chat-dashboard/chat-dashboard.component';
import { ChatSignupComponent } from "./chat-signup/chat-signup.component";
import { ChatProfileComponent } from './chat-profile/chat-profile.component';



// TODO : check how the private routes work in angular
// canActivate: [AuthGuard]
const routes: Routes = [
  // { path: "", redirectTo: "/chat-login", pathMatch: "full" },
  { path: "chat-login", component: ChatLoginComponent },
  { path: "", component: ChatDashboardComponent, canActivate: [AuthGuard]  },
  { path: "chat-dashboard", component: ChatDashboardComponent, canActivate: [AuthGuard] },
  { path: "chat-signup", component: ChatSignupComponent },
  { path: "chat-profile", component: ChatProfileComponent, canActivate: [AuthGuard] },
  // { path: "", component: ChatParentComponent }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
