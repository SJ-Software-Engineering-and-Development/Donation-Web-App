import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { fundService } from 'src/app/services/app/fund.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormBuilder, Validators } from '@angular/forms';
import * as dayjs from 'dayjs';
import Swal from 'sweetalert2'; 

/* Payhere */
import {Payhere,Customer, CurrencyType, PayhereCheckout, CheckoutParams, AccountCategory} from 'payhere-js-sdk';
import { CheckoutParamsType } from 'payhere-js-sdk/lib/interfaces';
import { donationService } from 'src/app/services/app/donation.service';

//SandBox
Payhere.init("1219440",AccountCategory.SANDBOX);
// Live
//Payhere.init("12xxxxx",AccountCategory.LIVE)

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
    private fb:FormBuilder,
    private fundService: fundService,
    private donService:donationService,
    private router:Router,
    private authService: AuthenticationService,
    private actRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.actRoute.params.subscribe(
      data =>{
        this.getFundById(data['id']);
      }
    )  
  }

  frmDonate = this.fb.group({
    amount:['', [Validators.required, Validators.minLength(2)]],
    details: [''],
    image: [null],
    isPublic: [false]//Validators.requiredTrue
  });

  selectedFile: File | null = null;

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
  }

  donateNow():void{
    this.authService.isUserLoggedIn()?
      this.checkout():
      this.router.navigate(['login']);
  }
 
  onPayhereCheckoutError(errorMsg:any) {
    alert(errorMsg);
  }
  
  submitDonate():void{
    let user =  JSON.parse(sessionStorage.getItem('auth-user') || '{}');
    var formData: any = new FormData();

    formData.append("amount", this.frmDonate.value.amount);
    formData.append("details", this.frmDonate.value.details);
    formData.append("type", "money");
    formData.append("isPublic", this.frmDonate.value.isPublic);
    formData.append("donatorId", user.id);
    formData.append("fundId", this.fund.id);
    formData.append("image", this.selectedFile);

    this.donService.doante(formData).subscribe(
      {
          next: (data:any) => {
            console.log(data);
          },  
          error: (err:any) => {
            Swal.fire({  
              icon: 'error',  
              title: 'Oops...',  
              text: "Something went wrong!",  
              footer: '<a href>Why do I have this issue?</a>'  
            }) 
            console.log(err);
          },
  
          complete: () => {
        console.info('complete');
        this.frmDonate.reset();
        this.selectedFile = null;
        //Open Payhere
        this.checkout();
       /*
        Note : In production mode this is not the currect order.
        First need to proceed payhere process and
        there after API endpoint provided as notify_url will call by payhere host
        and then using that endpoint we can store the Donation details in the databse
       */            
      } 
      }
      );
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

  upload(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  get f() { return this.frmDonate.controls; }

}
