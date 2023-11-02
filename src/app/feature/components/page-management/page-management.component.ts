import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { HostService } from "src/app/core/services/host.service";
import { NotificationService } from "src/app/core/services/notification.service";

declare var $: any;
@Component({
  selector: "app-page-management",
  templateUrl: "./page-management.component.html",
  styleUrls: ["./page-management.component.scss"],
})
export class PageManagementComponent implements OnInit {
  // form!: FormGroup;
  title = "Page List";
  pageList: any;
  loader: boolean = false;
  editPageMode: boolean = false;
  pageTitle: any;
  slug: any;
  description: any;
  page: number = 1;

  constructor(
    private hostService: HostService,
    private notifyService: NotificationService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
     this.getPageListDetail();
    // this.createPageForm();
  }

  // createPageForm() {
  //   this.form = this.fb.group({
  //     title: ["", [Validators.required]],
  //     slug: ["", [Validators.required]],
  //     description: ["", [Validators.required]],
  //   });
  // }

  getPageListDetail() {
    this.loader = true;
    this.hostService.getPageList().subscribe(
      (res: any) => {
        console.log("??????",res);
        
        this.pageList = res.data;
        this.loader = false;
      },
      (err) => {
        this.notifyService.showError("Unknown error", "Error");
      }
    );
  }

  // id: any;
  // editPageDetail(data: any, index: any) {
  //   this.editPageMode = true;
  //   this.id = index;
  //   $("#exampleModals").modal("show");
  //   this.pageTitle = data.title;
  //   this.slug = data.slug;
  //   this.description = data.description;
  //   this.router.navigate(["/page-management"], { queryParams: { id: index } });
  // }

  // onSubmit() {
  //   this.loader = true;
  //   this.form.markAllAsTouched();
  //   if (this.form.valid) {
  //     let addedPage = {
  //       title: this.form.value.title,
  //       slug: this.form.value.slug,
  //       description: this.form.value.description,
  //     };
  //     this.hostService.addNewPage(addedPage).subscribe(
  //       (res: any) => {
  //         $("#exampleModal").modal("hide");
  //         this.getPageListDetail();
  //         if (res.status)
  //           this.notifyService.showSuccess(res.message, "Success");
  //         else this.notifyService.showError(res.message, "Error");
  //         // this.loader = false;
  //       },
  //       (err) => {
  //         console.log(err);
  //         this.loader = false;
  //       }
  //     );
  //   }
  // }

  // updatePage() {
  //   let updatePage = {
  //     title: this.form.value.title,
  //     page_id: this.id,
  //     description: this.form.value.description,
  //   };
  //   if(this.form.valid){
  //     this.hostService.updatePage(updatePage).subscribe(
  //       (res: any) => {
  //         this.getPageListDetail();
  //         $("#exampleModals").modal("hide");
  //         if (res.status) this.notifyService.showSuccess(res.message, "Success");
  //         else this.notifyService.showError(res.message, "Error");
  //       },
  //       (err) => {
  //         this.notifyService.showError("Unknown error", "Error");
  //       }
  //     );
  //   }
    
  // }

  // addPage() {}
  // onCancel() {
  //   this.loader = false;
  //   this.form.reset();
  //   this.router.navigate(["/page-management"]);
  // }
}
