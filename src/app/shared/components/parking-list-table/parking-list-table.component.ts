import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-parking-list-table",
  templateUrl: "./parking-list-table.component.html",
  styleUrls: ["./parking-list-table.component.scss"],
})
export class ParkingListTableComponent implements OnInit {
  @Input() title: any;
  @Input() colDetails: any;
  @Input() hostList: any;
  @Output() showHostDetails = new EventEmitter<any>();

  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log(this.title);
  }

  hostDetails(data: any, index: any) {
    let listDetails = {
      listData: data,
      listIndex: index
    }
    this.showHostDetails.emit(listDetails);
  }
}

