import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PageNotFoundComponent } from "./feature/components/page-not-found/page-not-found.component";
import { MainLayoutComponent } from "./main-layout/main-layout.component";
import { RedirectionGuard } from "./core/guards/redirection/redirection.guard";
import { AuthGuard } from "./core/guards/auth/auth.guard";

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./authentication/authentication.module").then(
        (m) => m.AuthenticationModule
      ),
  },

  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./feature/feature.module").then((m) => m.FeatureModule),
        canActivate: [AuthGuard]
      },
    ]
  },


  {
    path: "**", component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
