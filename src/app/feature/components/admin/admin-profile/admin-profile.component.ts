import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HostService } from 'src/app/core/services/host.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss']
})
export class AdminProfileComponent implements OnInit {

  passwordForm!: FormGroup;
  profileForm!: FormGroup;
  name: any;
  email: any;

  constructor(private hostService: HostService, private fb: FormBuilder, private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.name = localStorage.getItem("name");
    this.email = localStorage.getItem("email");
    this.createChangePasswordForm();
    this.createUpdateProfileForm();
  }

  createChangePasswordForm() {
    this.passwordForm = this.fb.group({
      old_password: ['', [Validators.required]],
      new_password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]]
    });
  }

  createUpdateProfileForm() {
    this.profileForm = this.fb.group({
      name: [this.name || '', [Validators.required]],
      email: [this.email || '', [Validators.required]],
    });
  }
  onSubmit() {
  }

  uploadProfilePhoto() { }

  updateProfile() {
    if(this.profileForm.valid){
    this.profileForm.markAllAsTouched();
    let updatedData = { name: this.profileForm.value.name }
    this.hostService.getUpdateProfile(updatedData).subscribe((res: any)=>{
      if(res.status) this.notificationService.showSuccess(res.message,"Success");
      else this.notificationService.showError(res.message,"Error");
    },
    (err)=>{
      console.log("Error ",err);
    }
    )
  }
  }

  changePassword() {
    this.passwordForm.markAllAsTouched();
    if (this.passwordForm.valid) {
      let newPassword = this.passwordForm.value.new_password;
      let confirmPassword = this.passwordForm.value.confirm_password;
      if (newPassword == confirmPassword) {
        let updatePassword = {
          old_password: this.passwordForm.value.old_password,
          password: this.passwordForm.value.confirm_password
        }
        this.hostService.getChangePassword(updatePassword).subscribe((res: any) => {
          console.log(res);
          if (res.status) this.notificationService.showSuccess(res.message, "Success");
          else this.notificationService.showError(res.message, "Error");
        },
          (err) => {
            console.log(err);
            this.notificationService.showError("unknown error", "Error");
          }
        )
       } 
       else {
        this.notificationService.showError("New password and confirm password shuold be same", "Error");
      }
    }
  }

  onSave() { }
}
