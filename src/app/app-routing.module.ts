import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDonationComponent } from './components/donation/add-donation/add-donation.component';
import { DonationDashboardComponent } from './components/donation/donation-dashboard/donation-dashboard.component';
import { MyFundComponent } from './components/donation/my-fund/my-fund.component';
import { ThankPageComponent } from './components/donation/thank-page/thank-page.component';
import { ViewFundComponent } from './components/donation/view-fund/view-fund.component';
import { LoginComponent } from './components/user-common/login/login.component';
import { RegistrationComponent } from './components/user-common/registration/registration.component';
import { AuthGuardService } from './services/app/auth/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component:LoginComponent},
  { path: 'registration', component:RegistrationComponent},
  { path: 'donation-dashboard', component:DonationDashboardComponent},
  { path: 'add-donation', component:AddDonationComponent},
  { path: 'view-fund/:id', component:ViewFundComponent},
  { path: 'donation-success', component:ThankPageComponent},
  { path: 'my-fund', component:MyFundComponent}
//   {
//     path: 'donation',
//     canActivate:[AuthGuardService],
//     loadChildren: ()=> import('./components/donation/donation-dashboard').then(m=>m.ManagerModule),
//  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
