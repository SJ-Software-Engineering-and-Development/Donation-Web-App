import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopnavbarComponent } from './components/user-common/topnavbar/topnavbar.component';
import { FooterComponent } from './components/user-common/footer/footer.component';
import { LoginComponent } from './components/user-common/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './services/app/auth/token-interceptor.service';
import { SlidebarComponent } from './components/user-common/slidebar/slidebar.component';
import { RegistrationComponent } from './components/user-common/registration/registration.component';
import { DonationDashboardComponent } from './components/donation/donation-dashboard/donation-dashboard.component';
import { AddDonationComponent } from './components/donation/add-donation/add-donation.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { ReviewCatelogComponent } from './components/donation/donation-dashboard/review-catelog/review-catelog.component';
import { RouterModule } from '@angular/router';
import { SwiperModule } from "swiper/angular";
import { ViewFundComponent } from './components/donation/view-fund/view-fund.component';
import { ThankPageComponent } from './components/donation/thank-page/thank-page.component';
import { MyFundComponent } from './components/donation/my-fund/my-fund.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdminDashboardComponent } from './components/Admin/admin-dashboard/admin-dashboard.component';
import { FundCategariesComponent } from './components/Admin/fund-categaries/fund-categaries.component';
import { FundsComponent } from './components/Admin/funds/funds.component';
import { FundDetailsComponent } from './components/Admin/fund-details/fund-details.component';
import { FundCatelogComponent } from './components/donation/donation-dashboard/fund-catelog/fund-catelog.component';

@NgModule({
  declarations: [
    AppComponent,
    TopnavbarComponent,
    FooterComponent,
    LoginComponent,
    SlidebarComponent,
    RegistrationComponent,
    DonationDashboardComponent,
    AddDonationComponent,
    ReviewCatelogComponent,
    ViewFundComponent,
    ThankPageComponent,
    MyFundComponent,
    AdminDashboardComponent,
    FundCategariesComponent,
    FundsComponent,
    FundDetailsComponent,
    FundCatelogComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatFormFieldModule,
    SwiperModule, 
    NgxPaginationModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
    },],
  bootstrap: [AppComponent]
})
export class AppModule { }
