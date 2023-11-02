import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseUrl } from 'src/app/config/urls.config';
import { HostService } from 'src/app/core/services/host.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-parking-management',
  templateUrl: './parking-management.component.html',
  styleUrls: ['./parking-management.component.scss']
})
export class ParkingManagementComponent implements OnInit {
  imageUrl = BaseUrl.imageUrl;
  spotListData: any;
  parkingDetailForm!: FormGroup;
  page: number = 1;
  orderHeader: String = '';
  isDesOrder: boolean = true;
  searchInput = { title: '' };
  loader: boolean = false;
  title: any;
  location: any;
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
  getDate: any;
  id: any;
  vehicleList : any;


  constructor(
    private hostService: HostService,
    private notifyService: NotificationService,
    private router: Router,
    private fb: FormBuilder,
    private nitifyService: NotificationService
  ) { }

  ngOnInit(): void {
    this.getSpotList();
    this.createHostDetailForm();
    this.getVicleTypeList();
    this.getVicleSizes();
  }

  createHostDetailForm() {
    this.parkingDetailForm = this.fb.group({
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
    this.hostService.getSpotList(null).subscribe((res) => {
      this.spotListDetail = res;
      this.spotListData = this.spotListDetail.data;
      this.loader = false;
    },
      (err) => {
        console.log(err);
        this.notifyService.showError("Unknown Error", "Error");
        this.loader = false;
      }
    )
  }

  oldVehicle:any;
  sizes: any;
  editListDetail(data: any, index: any) {
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
    this.images = this.imageUrl+data.images[0];    
    this.router.navigate(['/parking-management'], { queryParams: { id: index } });
    console.log("near_by_location", this.near_by_location );  
    
  }

  deleteList(index: any) {
    if (confirm("Are you sure, you want to delete")) {
      this.hostService.deleteSpot(index).subscribe((res) => {
        this.getSpotList();
        debugger
        this.notifyService.showSuccess("Spot deleted successfully","Success");
      },
        (err) => {
          console.log(err);
          this.notifyService.showSuccess(err,"Success");
        }
      )
    }
  }

  onSubmit() {
    this.loader = true;
    let updateSpot = {
      spot_id: this.id,
      title: this.parkingDetailForm.value.title,
      location: this.parkingDetailForm.value.location,
      country_code: this.parkingDetailForm.value.country_code.toString(),
      phone_no: this.parkingDetailForm.value.phone_no,
      address: this.parkingDetailForm.value.address,
      description: this.parkingDetailForm.value.description,
      availability: this.parkingDetailForm.value.availability,
      start_date_time: Date.parse(new Date(this.parkingDetailForm.value.start_date_time).toLocaleString()),
      end_date_time:  Date.parse(new Date(this.parkingDetailForm.value.end_date_time).toLocaleString()),
      near_by_location: this.parkingDetailForm.value.near_by_location,
      transportation: this.parkingDetailForm.value.transportation,
      price: this.parkingDetailForm.value.price,
      vehicle_type: !this.parkingDetailForm.value.vehicle_type?this.oldVehicle:this.parkingDetailForm.value.vehicle_type,
      size:!this.parkingDetailForm.value.size? this.sizes:this.parkingDetailForm.value.size,
      images: this.parkingDetailForm.value.images
    }
    console.log(updateSpot['vehicle_type'],updateSpot['size']);
    
    this.hostService.updateSpot(updateSpot).subscribe(
      (res: any) => {
        console.log(res);
        this.getSpotList(); 
        if(res.message) this.nitifyService.showSuccess(res.message,"Success");
        else this.nitifyService.showError(res.err[0].message,"Error");
        this.router.navigateByUrl('parking-management');
        this.loader = false;
      },
      (err: any) => {
        console.log(">>>>",err);
        this.loader = false;
      }
    );

  }

  onCancel() {
    this.router.navigate(['/parking-management']);
  }
  
  sort(data: any) {
    this.isDesOrder = !this.isDesOrder;
    this.orderHeader = data;
  }


  userStatus(id: any, isActive: any) {
    this.loader = true;
    let status = {
      spot_id: id,
      status: isActive
    }
    this.hostService.getSpotStatus(status).subscribe((res) => {
      console.log(res);
      this.getSpotList();
    },
      (err) => {
        console.log(err);
      }
    )
  }

  getVicleTypeList(){
    this.hostService.getVehicleList().subscribe((res: any)=>{
      this.vehicleList = res.data;
    })
  }

  vehicleSize: any;
  getVicleSizes(){
    this.hostService.getVehicleSize().subscribe((res: any)=>{
      this.vehicleSize = res.data;
    });
  }
  
}
