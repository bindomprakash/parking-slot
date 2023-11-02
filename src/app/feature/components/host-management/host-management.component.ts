import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { HostService } from "src/app/core/services/host.service";
import { NotificationService } from "src/app/core/services/notification.service";
declare var $: any; 
@Component({
  selector: "app-host-management",
  templateUrl: "./host-management.component.html",
  styleUrls: ["./host-management.component.scss"],
})
export class HostManagementComponent implements OnInit {
  hostListData: any[] = [];
  title = "Host List";
  page: number = 1;
  orderHeader: String = "";
  isDesOrder: boolean = true;
  searchInput = { name: "" };
  hostDetailForm!: FormGroup;
  name: any;
  email: any;
  phone_no: any;
  updateListData!: any;
  loader: boolean = false;
  id: any;
  isActive: any;

  constructor(
    private hostService: HostService,
    private fb: FormBuilder,
    private notifyService: NotificationService,
    private router: Router,
    private activeService: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getHostList();
    this.createHostDetailForm();
  }

  createHostDetailForm() {
    this.hostDetailForm = this.fb.group({
      name: ["", [Validators.required]],
      email: ["", Validators.required],
      phone_no: ["", Validators.required],
    });
  }

  getHostList() {
    this.loader = true;
    let hostType = {
      type: "host",
    };
    this.hostService.getHostListData(hostType).subscribe(
      (res: any) => {
        this.hostListData = res.data;
        this.loader = false;
      },
      (err) => {
        console.log(err);
        this.loader = false;
      }
    );
  }

  editListDetail(data: any, index: any) {
    console.log(data);
    this.id = data._id;
    this.name = data.name;
    this.email = data.email;
    this.phone_no = data.phone_no !== undefined ? data.phone_no : "";
    this.router.navigate(["/host-management"], { queryParams: { id: index } });
  }

  deleteList(index: any) {
    if (confirm("Are you sure, you want to delete")) {
      this.hostService.deleteUser(index).subscribe((res) => {
        console.log(res);
        this.getHostList();
        if (res) this.notifyService.showSuccess("User deleted successfully.", "Success");
        this.notifyService
      },
        (err) => {
          console.log(err);
        }
      )
    }
  }

  sort(data: any) {
    this.isDesOrder = !this.isDesOrder;
    this.orderHeader = data;
  }

  onCancel() {
    this.router.navigate(["/host-management"]);
  }
  onSubmit() {
    // this.loader = true
    this.hostDetailForm.markAllAsTouched();
    let name = this.hostDetailForm.value.name;
    let phoneNo = this.hostDetailForm.value.phone_no;
    let updateUser = {
      user_id: this.id,
      name: this.hostDetailForm.value.name,
      phone_no: this.phone_no,
    };

    if (name && phoneNo) {
      this.hostService.updateUser(updateUser).subscribe(
        (res: any) => {
          $('#exampleModal').modal('hide');
          this.getHostList();
          if (res.message){
             this.notifyService.showSuccess(res.message, "Success");
             this.loader = false;
            }
          else {
            this.notifyService.showError(res.err[0].message, "Error");
            this.loader = false;
          }
          this.router.navigate(["/host-management"]);
          this.loader = false;
        },
        (err: any) => {
          console.log(err);
          this.notifyService.showError("Not Updated", "Error");
          this.loader = false;
        }
      );
    }

  }

  userStatus(id: any, isActive: any) {
    this.loader = true;
    let status = {
      user_id: id,
      status: isActive
    }


    this.hostService.getUserStatus(status).subscribe((res) => {
      console.log(res);
      this.getHostList();
    },
      (err) => {
        console.log(err);
      }
    )
  }
}
