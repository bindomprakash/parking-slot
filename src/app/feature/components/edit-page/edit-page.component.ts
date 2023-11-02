import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { HostService } from "src/app/core/services/host.service";
import { NotificationService } from "src/app/core/services/notification.service";

@Component({
  selector: "app-edit-page",
  templateUrl: "./edit-page.component.html",
  styleUrls: ["./edit-page.component.scss"],
})
export class EditPageComponent implements OnInit {
  form!: FormGroup;
  id: any;
  loader: boolean = false;
  index: any;
  pageDetail: any;
  pageSlug: any;
  pageDescription: any;

  constructor(
    private fb: FormBuilder,
    private hostService: HostService,
    private notifyService: NotificationService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loader = true;
    this.createPageForm();
    this.activatedRoute.paramMap.subscribe((res: any) => {
      this.index = res.get("id");
    });

    this.hostService.getPageDetail(this.index).subscribe((res: any) => {
      debugger;
      this.pageDetail = res.data.title;
      this.pageSlug = res.data.slug;
      this.pageDescription = res.data.description;
      console.log(this.pageDetail);
      this.loader = false;
    });
  }

  createPageForm() {
    this.form = this.fb.group({
      title: ["", [Validators.required]],
      slug: ["", [Validators.required]],
      description: ["", [Validators.required]],
    });
  }

  onSubmit() {
    this.form.markAllAsTouched();
    console.log(this.form.value);

    if (this.form.valid) {
      let updatePage = {
        title: this.form.value.title,
        page_id: this.index,
        description: this.form.value.description,
      };

      this.hostService.updatePage(updatePage).subscribe(
        (res: any) => {
          console.log(res);

          if (res.status)
            this.notifyService.showSuccess(res.message, "Success");
          else this.notifyService.showError(res.message, "Error");
          this.loader = false;
        },
        (err) => {
          this.notifyService.showError("Unknown error", "Error");
          this.loader = false;
        }
      );
    }
  }
}
