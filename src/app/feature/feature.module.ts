import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatureRoutingModule } from './feature-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { MainLayoutModule } from '../main-layout/main-layout.module';
import { AdminProfileComponent } from './components/admin/admin-profile/admin-profile.component';
import { SharedModule } from '../shared/shared.module';
import { HostManagementComponent } from './components/host-management/host-management.component';
import { RenterManagementComponent } from './components/renter-management/renter-management.component';
import { ParkingManagementComponent } from './components/parking-management/parking-management.component';
import { PaymentManagementComponent } from './components/payment-management/payment-management.component';
import { PageManagementComponent } from './components/page-management/page-management.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderModule } from 'ngx-order-pipe';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpotListComponent } from './components/spot-list/spot-list.component';
import { RenterDetailComponent } from './components/renter-detail/renter-detail.component';
import { ParkingDetailComponent } from './components/parking-detail/parking-detail.component';
import { TagInputModule } from 'ngx-chips';
import { AddPageComponent } from './components/add-page/add-page.component';
import { EditPageComponent } from './components/edit-page/edit-page.component';
import { PageDetailComponent } from './components/page-detail/page-detail.component';
import { CKEditorModule } from 'ckeditor4-angular';

@NgModule({
  declarations: [
    DashboardComponent,
    PageNotFoundComponent,
    AdminProfileComponent,
    HostManagementComponent,
    RenterManagementComponent,
    ParkingManagementComponent,
    PaymentManagementComponent,
    PageManagementComponent,
    SpotListComponent,
    RenterDetailComponent,
    ParkingDetailComponent,
    AddPageComponent,
    EditPageComponent,
    PageDetailComponent,
  ],
  imports: [
    CommonModule,
    FeatureRoutingModule,
    FormsModule,
    MainLayoutModule,
    SharedModule,
    NgxPaginationModule,
    OrderModule,
    FilterPipeModule,
    ReactiveFormsModule,
    TagInputModule,
    CKEditorModule
  ],
})
export class FeatureModule {
  constructor(){
    console.log("feature module is loading"); 
  }
 }
