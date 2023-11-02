import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { LoaderComponent } from './components/loader/loader.component';
import { ParkingListTableComponent } from './components/parking-list-table/parking-list-table.component';

const apis =[
  LoaderComponent,
  ParkingListTableComponent,
]

@NgModule({
  declarations: [
    apis
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports:[
    apis
  ]
})
export class SharedModule { }
