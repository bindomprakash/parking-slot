import { Component, OnInit } from '@angular/core';
import { HostService } from 'src/app/core/services/host.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  hosts: any;
  renters: any;
  spots: any;
  bokking: any;
  loader: boolean = false;

  constructor(private hostService: HostService) { }

  ngOnInit(): void {
    this.dashboardList();
  }

  list: any;
  dashboardList() {
    this.loader = true;
    this.hostService.getDashboardList().subscribe((res) => {
      this.list = res;
      this.hosts = this.list.data.hosts;
      this.renters = this.list.data.renters;
      this.spots = this.list.data.spots;
      this.bokking = this.list.data.bokking;
      this.loader = false;
    },
      (err) => {
        console.log(err);
        this.loader = false;
      }
    )
  }

}
