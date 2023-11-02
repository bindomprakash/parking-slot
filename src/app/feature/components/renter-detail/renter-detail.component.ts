import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseUrl } from "src/app/config/urls.config";
import { HostService } from "src/app/core/services/host.service";
import { NotificationService } from "src/app/core/services/notification.service";
declare var $: any;

@Component({
  selector: 'app-renter-detail',
  templateUrl: './renter-detail.component.html',
  styleUrls: ['./renter-detail.component.scss']
})
export class RenterDetailComponent implements OnInit {
  spotTitle = "Spot Detail";
  getSelectedSpotList: any = {};
  imageUrl = BaseUrl.imageUrl;
  renterDetailForm!: FormGroup;

  searchInput = { title: "", location: "" };
  page = 1;
  orderHeader: String = "";
  isDesOrder: boolean = true;
  spotListForm!: FormGroup;
  spotListData: any;
  getDate: any;
  loader: boolean = false;
  title: any;
  location: any;
  sdate: any;
  edate: any;
  userInfo: any;
  id: any;

  titles: any;
  locations: any;
  country_code: any;
  phone_no: any;
  address: any
  description: any
  availability: any
  start_date_time: any;
  end_date_time: any;
  near_by_location: any
  transportation: any
  price: any;
  vehicle_type: any;
  size: any;
  images: any;
  spotListDetail: any;
  getDates: any;
  ids: any;
  vehicleList: any;
  old_vehicle: any;
  old_size: any;

  constructor(
    private hostService: HostService,
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private notifyService: NotificationService
  ) { }

  selectVehicle: any;
  selectSize: any;
  ngOnInit(): void {
    this.selectVehicle = "Select Vehicle Type";
    this.selectSize = "Select Vehicle Type";
    this.createSpotListForm();
    this.getSpotList();
    this.createHostDetailForm();
    this.getVicleTypeList();
    this.getVicleSizes();
  }

  createSpotListForm() {
    this.spotListForm = this.fb.group({
      title: ["", [Validators.required]],
      location: ["", [Validators.required]],
      sdate: ["", [Validators.required]],
      edate: ["", [Validators.required]],
    });
  }

  createHostDetailForm() {
    this.renterDetailForm = this.fb.group({
      title: ['', [Validators.required]],
      location: ['', Validators.required],
      country_code: ['', Validators.required],
      phone_no: ['', Validators.required],
      address: ['', Validators.required],
      description: ['', Validators.required],
      availability: ['', Validators.required],
      start_date_time: ['', Validators.required],
      end_date_time: ['', Validators.required],
      near_by_location: ['', Validators.required],
      transportation: ['', Validators.required],
      price: ['', Validators.required],
      vehicle_type: ['', Validators.required],
      size: ['', Validators.required],
      images: ['', Validators.required]
    })
  }

  getSpotList() {
    this.loader = true;
    this.activeRoute.paramMap.subscribe((res) => {
      this.id = res.get("id");
    });

    this.hostService.getUserDetail(this.id).subscribe((res: any) => {
      console.log("user info:", res.data.user_info);
      this.userInfo = res.data.user_info;
      this.spotListData = res.data.spot_details;
      const result = this.spotListData.map((data: any) => {
        return [
          new Date(data.end_date_time).toLocaleString(),
          new Date(data.start_date_time).toLocaleString(),
        ];
      });
      result.map((data: any) => {
        this.getDate = data;
      });
      this.loader = false;
    });
  }

  sort(data: any) {
    this.isDesOrder = !this.isDesOrder;
    this.orderHeader = data;
  }

  updateSpotDetail(index: any) {
    this.router.navigateByUrl('parking-management/parking-detail/' + index);
  }

  oldVehicle: any;
  sizes: any;
  editListDetail(data: any) {
    console.log(data);
    this.oldVehicle = data.vehicle_type;
    this.sizes = data.size;
    this.id = data._id;
    this.title = data.title;
    this.location = data.location;
    this.country_code = data.country_code;
    this.phone_no = data.phone_no;
    this.address = data.address;
    this.description = data.description;
    this.availability = data.availability;
    this.start_date_time = new Date(data.start_date_time).toLocaleString();
    this.end_date_time = new Date(data.end_date_time).toLocaleString()
    this.near_by_location = data.near_by_location;
    this.transportation = data.transportation;
    this.price = data.price;
    this.vehicle_type = data.vehicle_type;
    this.size = data.size;
    this.images = this.imageUrl + data.images[0];
    // this.router.navigate(['/parking-management'], { queryParams: { id: index } });
    console.log("near_by_location", this.near_by_location);
  }

  deleteList(index: any) {
    if (confirm("Are you sure, you want to delete")) {
      this.loader = true;
      this.hostService.deleteSpot(index).subscribe((res: any) => {
        this.getSpotList();
        if(res.status) this.notifyService.showSuccess(res.message, "Success");
        else this.notifyService.showError(res.message, "Error");
        this.loader = false;
      },
        (err) => {
          console.log(err);
          this.notifyService.showSuccess("Unkown error", "Error");
          this.loader = false;
        }
      )
    }
  }

  getVicleTypeList() {
    this.hostService.getVehicleList().subscribe((res: any) => {
      this.vehicleList = res.data;
    })
  }

  vehicleSize: any;
  getVicleSizes() {
    this.hostService.getVehicleSize().subscribe((res: any) => {
      this.vehicleSize = res.data;
      this.old_vehicle = res.data.vehicle_type
      this.old_size = res.data.size
    });
  }

  selectedVehicle: any;
  onSubmit() {
    this.loader = true;
    debugger
    // console.log("????", this.renterDetailForm.value.vehicle_type, this.renterDetailForm.value.size);

    let updateSpot = {
      spot_id: this.id,
      title: this.renterDetailForm.value.title,
      location: this.renterDetailForm.value.location,
      country_code: this.renterDetailForm.value.country_code.toString(),
      phone_no: this.renterDetailForm.value.phone_no,
      address: this.renterDetailForm.value.address,
      description: this.renterDetailForm.value.description,
      availability: this.renterDetailForm.value.availability,
      start_date_time: Date.parse(new Date(this.renterDetailForm.value.start_date_time).toLocaleString()),
      end_date_time: Date.parse(new Date(this.renterDetailForm.value.end_date_time).toLocaleString()),
      near_by_location: this.renterDetailForm.value.near_by_location,
      transportation: this.renterDetailForm.value.transportation,
      price: this.renterDetailForm.value.price,
      vehicle_type: !this.renterDetailForm.value.vehicle_type ? this.oldVehicle : this.renterDetailForm.value.vehicle_type,
      size: !this.renterDetailForm.value.size ? this.sizes : this.renterDetailForm.value.size,
      images: this.renterDetailForm.value.images
    }
    // if(this.renterDetailForm.value.status == true){
      this.hostService.updateSpot(updateSpot).subscribe(
        (res: any) => {
          // $('#exampleModal').modal('hide');
          this.getSpotList();
          if (res.message) this.notifyService.showSuccess(res.message, "Success");
          else this.notifyService.showError(res.err[0].message, "Error");
          this.loader = false;
        },
        (err: any) => {
          console.log(err);
          this.loader = false;
        }
      );
    // }
  }
}
