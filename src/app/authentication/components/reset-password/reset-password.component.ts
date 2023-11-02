import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm!: FormGroup;
  token: any;
  loader: boolean = false;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private notifyService: NotificationService
  ) { }

  ngOnInit(): void {
    this.createFrom();
  }

  createFrom() {
    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required]],
      cpassword: ['', [Validators.required]],
    })
  }


  onSubmit() {
    this.loader =  true;
    debugger
    this.loader = true;
    if (this.resetPasswordForm.valid) {
      const password = this.resetPasswordForm.value.password;
      const cpassword = this.resetPasswordForm.value.cpassword;

      this.activatedRoute.paramMap.subscribe((res) => {
        this.token = res.get('token');
        this.loader = false;
      });

      if (password == cpassword) {
        this.loader = true;
        let updateData = {
          token: this.token,
          password: password
        }

        this.authService.resetPassword(updateData).subscribe((res: any) => {
          this.loader = false;
          this.resetPasswordForm.reset();
          if(res.status){
            this.notifyService.showSuccess(res.message, "Success");
          }else{
            this.notifyService.showError(res.message, "Error");
          }
        },
          (error) => {
            this.notifyService.showError(error.err, "Error");
          }
        )
      }else{
        this.notifyService.showError("Password and confirm password must be same", "Error");
         this.loader = false;
      }
    }
  }

}
