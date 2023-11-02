import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HostService } from 'src/app/core/services/host.service';

@Component({
  selector: 'app-page-detail',
  templateUrl: './page-detail.component.html',
  styleUrls: ['./page-detail.component.scss']
})
export class PageDetailComponent implements OnInit {
  
  id: any;
  loader: boolean = false;
  pageDetail: any;

  constructor(private hostService: HostService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loader = true;
    this.activatedRoute.paramMap.subscribe((res: any)=>{
      this.id = res.get('id');
      console.log(this.id);
    })
    this.getPageDetail(this.id);
  }

  getPageDetail(id: any){
    this.loader = true;
    this.hostService.getPageDetail(id).subscribe((res: any)=>{
      console.log(res);
      this.pageDetail = res.data;
      console.log(">>>",this.pageDetail);
      this.loader = false;
    })
  }

}
