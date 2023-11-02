import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseUrl } from "src/app/config/urls.config";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class HostService {
  api = BaseUrl.baseApiUrl;
  adminApi = BaseUrl.baseAdminUrl;


  constructor(private http: HttpClient) {
    console.log(environment.baseUrl);
  }

  getHostListData(data: any) {
    return this.http.post(this.adminApi + "getUserList", data);
  }

  getSpotList(data: any) {
    return this.http.post(this.adminApi + "getSpotList", data);
  }

  getUserDetail(id: any) {
    return this.http.get(this.adminApi + "getUserDetail" + "/" + id);
  }

  getSpotDetail(id: any) {
    return this.http.get(this.adminApi + "getSpotDetail" + "/" + id);
  }

  updateUser(data: any) {
    return this.http.patch(this.adminApi + "updateUser", data);
  }

  deleteUser(id: any) {
    return this.http.delete(this.adminApi + "deleteUser" + "/" + id);
  }

  getUserStatus(data: any) {
    return this.http.patch(this.adminApi + "updateUserStatus", data);
  }

  updateSpot(data: any) {
    return this.http.patch(this.adminApi + "updateSpot", data);
  }

  deleteSpot(id: any) {
    return this.http.delete(this.adminApi + "deleteSpot" + "/" + id);
  }

  getSpotStatus(data: any) {
    return this.http.patch(this.adminApi + "updateSpotStatus", data);
  }

  getDashboardList() {
    return this.http.get(this.adminApi + "getDashboard");
  }

  getVehicleList() {
    return this.http.post(this.api + "getVehicleTypeList", null);
  }

  getVehicleSize() {
    return this.http.post(this.api + "getSizeList", null);
  }

  getChangePassword(data: any) {
    return this.http.post(this.api + "changePassword", data);
  }

  getUpdateProfile(data: any) {
    return this.http.post(this.api + "updateProfile", data);
  }
  getPageList() {
    return this.http.get(this.adminApi + "getPages");
  }

  addNewPage(data: any) {
    return this.http.post(this.adminApi + "addPage", data);
  }

  getPageDetail(id: any) {
    return this.http.get(this.adminApi + "getPageDetail" + "/" + id);
  }

  updatePage(data: any){
    return this.http.patch(this.adminApi+"updatePage", data); 
  }
}
