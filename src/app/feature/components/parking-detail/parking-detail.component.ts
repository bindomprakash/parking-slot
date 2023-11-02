import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BaseUrl } from 'src/app/config/urls.config';
import { HostService } from 'src/app/core/services/host.service';

@Component({
  selector: 'app-parking-detail',
  templateUrl: './parking-detail.component.html',
  styleUrls: ['./parking-detail.component.scss']
})
export class ParkingDetailComponent implements OnInit {

  spotTitle = "Spot Detail";
  imageUrl = BaseUrl.imageUrl;
  getSelectedSpotList: any = {};

  searchInput = { title: '', location: '' };
  page = 1;
  orderHeader: String = '';
  isDesOrder: boolean = true;
  spotListForm!: FormGroup;
  parkingListData: any;
  getDate: any;
  loader: boolean = false;
  userInfo: any;
  id: any;
  startDate: any;
  endDate: any;
  parkingListDatas: any
  vihicleImg: any
  vehicle_type: any;

  constructor(private hostService: HostService, private fb: FormBuilder, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getSpotList();
    this.getVihicleType();
    console.log("hi");
  }

  getSpotList() {
    this.loader = true;
    this.activeRoute.paramMap.subscribe((param) => {
      this.id = param.get("id");
    })
    this.hostService.getSpotDetail(this.id).subscribe((res: any) => {
      this.parkingListData = res
      this.parkingListDatas = res.data
      this.vihicleImg = this.imageUrl + this.parkingListDatas.vehicle_icon;
      console.log("vihicle icon::", this.parkingListDatas.vehicle_icon);
      this.startDate = new Date(this.parkingListDatas.start_date_time).toLocaleString();
      this.endDate = new Date(this.parkingListDatas.end_date_time).toLocaleString();

      this.loader = false;
    });
  }

 
  getVihicleType(){
    // let token = localStorage.getItem("token")
    this.hostService. getVehicleList().subscribe((res)=>{
      console.log(res);
      this.vehicle_type = res;
      console.log("Vihicle type >>",this.vehicle_type);
    }) 
  }

}
