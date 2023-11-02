import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/core/services/auth.service";
import { NotificationService } from "src/app/core/services/notification.service";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"],
})
export class SigninComponent implements OnInit {
  loginForm!: FormGroup;
  getUserName: any;
  getUserPassword: any;
  errorMsg: String = "";
  loader: boolean = false;
  show: boolean = true;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private notifyService: NotificationService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(4)]],
    });
  }

  onSubmit() {
     if (this.loginForm.valid) {
    this.loader = true;
    let email = this.loginForm.value.email;
    let password = this.loginForm.value.password;

    let loginData = {
      email: email,
      password: password,
      device_token: "token",
      latitude: 0.0,
      longitude: 0.0,
      role: 'admin'
    };

    this.authService.login(loginData).subscribe(
      (res: any) => {
        console.log(res);
        if (res.status) {
          localStorage.setItem("status", res.status);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("name", res.data.name);
          localStorage.setItem("email", res.data.email);
          this.router.navigateByUrl('dashboard');
          this.notifyService.showSuccess("Login successfull", "Success");
          this.loader = false;
        }
        else {
          debugger
          if (res.err[0].message) {
            this.notifyService.showError(res.err[0].message, "Error");
          } else {
            this.notifyService.showError(res.err, "Error");
          }
          this.loader = false;
        }
      },
      (err) => {
        this.notifyService.showError("unknown error", "Error");
        this.loader = false;
      }
    );
   }else{
    this.loginForm.markAllAsTouched();
   }
  }

  password() {
    this.show = !this.show
  }
}
