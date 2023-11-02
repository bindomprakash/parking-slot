import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/core/services/auth.service";
import { NotificationService } from "src/app/core/services/notification.service";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.scss"],
})
export class ForgotPasswordComponent implements OnInit {
  forgetFormEmail!: FormGroup;
  loader: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private notifyService: NotificationService) { }

  ngOnInit(): void {
    this.createFormForEmail();
  }

  createFormForEmail() {
    this.forgetFormEmail = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      role:["admin"]
    });
  }

  submitForEmail() {
    this.loader = true;
    if (this.forgetFormEmail.valid) {
      this.authService.sendForgotPasswordEmail(this.forgetFormEmail.value).subscribe((res: any) => {
        if (res.status){
          this.notifyService.showSuccess("Email send successfully", "Success");
          this.loader = false;
        }
        else {
          this.notifyService.showError(res.message, "Error");
          console.log(res.err[0].message);
          this.loader = false;
        }
      },
        (err) => {
          this.notifyService.showError("Unknown error", "Error");
          this.loader = false;
        }
      )
    }
  }
}
