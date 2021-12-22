import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { fundService } from 'src/app/services/app/fund.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import * as dayjs from 'dayjs';

import {Payhere,Customer, CurrencyType, PayhereCheckout, CheckoutParams, AccountCategory} from 'payhere-js-sdk';
import { CheckoutParamsType } from 'payhere-js-sdk/lib/interfaces';

Payhere.init("1219440",AccountCategory.SANDBOX);

@Component({
  selector: 'app-view-fund',
  templateUrl: './view-fund.component.html',
  styleUrls: ['./view-fund.component.scss']
})
export class ViewFundComponent implements OnInit {
  
  fund:any ={};
  daysLeft:any='';
  totalDonations=0;
  donationsSum=0;
  donatePresentage ='';
 
  checkoutParams :CheckoutParamsType={
    amount: 2000,
    returnUrl: 'http://localhost:4200/donation-success',
    cancelUrl: 'http://localhost:4200',
    notifyUrl: 'http://localhost:4200', //Hosted post endpoint Required!
    order_id: 'OR3434',
    itemTitle: 'Apple',
    currency: CurrencyType.LKR,
    platform: '',
    custom1: '',
    custom2: ''
  };
 // checkoutData  = 

  constructor(
    private fundService: fundService,
    private router:Router,
    private authService: AuthenticationService,
    private actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.actRoute.params.subscribe(
      data =>{
        this.getFundById(data['id']);
      }
    )  
  }

  getFundById(id:string):void{
    this.fundService.getById(id).subscribe({
      next:(data:any) =>{
       this.fund = data.data.fund;
       this.totalDonations = data.data.totalDonations;
       this.donationsSum = data.data.totalDonationsAmount;
       this.calPersentageOfDonate();
      },
      error:(err:any) =>{
        console.log(err);
      },
      complete :()=>{
        var start = dayjs(this.fund.createdDate);
        var end = dayjs();
        var diff = (end.diff(start, "days"));
        diff < 0 ?
          this.daysLeft = diff + ' days overlpped':
          this.daysLeft = diff + ' days left';
      }
    })
  }

  calPersentageOfDonate(){
     let p = (100 * this.donationsSum) / this.fund.targetAmount;
     this.donatePresentage=  p>100? '100%' : p+'%';
     console.log("dddd  "+this.donatePresentage)
  }

  donateNow():void{
    this.authService.isUserLoggedIn()?
      this.checkout():
      this.router.navigate(['login']);
  }
  
   
  onPayhereCheckoutError(errorMsg:any) {
    alert(errorMsg);
  }
  
  checkout() {
    const customer = new Customer({
      first_name: "Pavindu",
      last_name: "Lakshan",
      phone: "+94771234567",
      email: "plumberhl@gmail.com",
      address: "No. 50, Highlevel Road",
      city: "Panadura",
      country: "Sri Lanka",
    });

    const checkout = new PayhereCheckout(customer,new CheckoutParams(this.checkoutParams), this.onPayhereCheckoutError)
    checkout.start()
  }
 

}
