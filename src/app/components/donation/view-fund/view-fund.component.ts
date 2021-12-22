import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { fundService } from 'src/app/services/app/fund.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import * as dayjs from 'dayjs';

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
      this.router.navigate(['view-fund']):
      this.router.navigate(['login']);
  }

}
