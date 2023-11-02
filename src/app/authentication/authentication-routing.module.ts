import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SigninComponent } from "./components/signin/signin.component";
import { ForgotPasswordComponent } from "./components/forgot-password/forgot-password.component";
import { ResetPasswordComponent } from "./components/reset-password/reset-password.component";
import { RedirectionGuard } from "../core/guards/redirection/redirection.guard";
import { AuthGuard } from "../core/guards/auth/auth.guard";

const routes: Routes = [
  { path: '', redirectTo: "login", pathMatch: "full" },
  { path: "login", component: SigninComponent, canActivate:[RedirectionGuard] },
  { path: "forgot-password", component: ForgotPasswordComponent, canActivate:[RedirectionGuard] },
  { path: "reset-password/:token",  component: ResetPasswordComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule { }
