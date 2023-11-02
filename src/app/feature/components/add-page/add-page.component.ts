import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HostService } from 'src/app/core/services/host.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.scss']
})
export class AddPageComponent implements OnInit {

  form!: FormGroup;
  loader: boolean = false;
  constructor(private fb: FormBuilder, private hostService: HostService, private notifyService: NotificationService) { }

  ngOnInit(): void {
    this.createPageForm();
  }

  createPageForm() {
    this.form = this.fb.group({
      title: ["", [Validators.required]],
      slug: ["", [Validators.required]],
      description: ["", [Validators.required]],
    });
  }

  onSubmit(){
    // this.loader = true;
    this.form.markAllAsTouched();
    if (this.form.valid) {
      let addedPage = {
        title: this.form.value.title,
        slug: this.form.value.slug,
        description: this.form.value.description,
      };
      this.hostService.addNewPage(addedPage).subscribe(
        (res: any) => {
          if (res.status)
            this.notifyService.showSuccess(res.message, "Success");
          else this.notifyService.showError(res.message, "Error");
          // this.loader = false;
        },
        (err) => {
          console.log(err);
          this.loader = false;
        }
      );
    }
  }
}
