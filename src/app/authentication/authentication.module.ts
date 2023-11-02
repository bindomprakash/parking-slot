import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CoolSocialLoginButtonsModule } from '@angular-cool/social-login-buttons';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { SigninComponent } from './components/signin/signin.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
 import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from '../shared/shared.module';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    SigninComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CoolSocialLoginButtonsModule,
    AuthenticationRoutingModule,
    HttpClientModule,
    SharedModule,
    ToastrModule.forRoot()
  ],
  providers:[]
})
export class AuthenticationModule { 
  constructor(){
    console.log("auth module loading");
  }
}
