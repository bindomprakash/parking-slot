import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { HostManagementComponent } from "./components/host-management/host-management.component";
import { RenterManagementComponent } from "./components/renter-management/renter-management.component";
import { ParkingManagementComponent } from "./components/parking-management/parking-management.component";
import { PaymentManagementComponent } from "./components/payment-management/payment-management.component";
import { PageManagementComponent } from "./components/page-management/page-management.component";
import { AdminProfileComponent } from "./components/admin/admin-profile/admin-profile.component";
import { AuthGuard } from "../core/guards/auth/auth.guard";
import { SpotListComponent } from "./components/spot-list/spot-list.component";
import { RenterDetailComponent } from "./components/renter-detail/renter-detail.component";
import { ParkingDetailComponent } from "./components/parking-detail/parking-detail.component";
import { AddPageComponent } from "./components/add-page/add-page.component";
import { EditPageComponent } from "./components/edit-page/edit-page.component";
import { PageDetailComponent } from "./components/page-detail/page-detail.component";


const routes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent, canActivate: [AuthGuard],
  },
  {
    path: "host-management", canActivate: [AuthGuard],
    children: [
      { path: '', component: HostManagementComponent },
      { path: 'host-detail/:id', component: SpotListComponent }
    ]
  },
  {
    path: "renter-management", canActivate: [AuthGuard],
    children: [
      { path: "", component: RenterManagementComponent },
      { path: "renter-detail/:id", component: RenterDetailComponent }
    ]
  },
  {
    path: "parking-management", canActivate: [AuthGuard],
    children: [
      { path: "", component: ParkingManagementComponent },
      { path: "parking-detail/:id", component: ParkingDetailComponent }
    ]
  },
  {
    path: "payment-management", component: PaymentManagementComponent, canActivate: [AuthGuard]
  },
  {
    path: "page-management", canActivate: [AuthGuard],
    children: [
      { path: "", component: PageManagementComponent },
      { path: "addpage", component: AddPageComponent },
      { path: "editpage/:id", component: EditPageComponent },
      { path: "pagedetail/:id", component: PageDetailComponent }
    ]
  },
  {
    path: "admin-profile", component: AdminProfileComponent, canActivate: [AuthGuard]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeatureRoutingModule { }
