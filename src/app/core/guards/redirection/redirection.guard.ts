import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class RedirectionGuard implements CanActivate {
  constructor(private _router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    const status = localStorage.getItem("status");
    console.log(status)
    if (status == null) {
      return true;
    } else {
      this._router.navigateByUrl("/dashboard");
      return false;
    }
  }
}
