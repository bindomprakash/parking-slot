import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseUrl } from "src/app/config/urls.config";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  api = BaseUrl.baseApiUrl;
  constructor(private http: HttpClient) {
    console.log(environment.baseUrl);
  }

  login(data: any) {
    return this.http.post(this.api + "login", data);
  }

  resetPassword(password: any) {
    return this.http.post(this.api + "resetPassword", password);
  }

  sendForgotPasswordEmail(email: any) {
    return this.http.post(this.api + "forgotPassword", email);
  }
}
