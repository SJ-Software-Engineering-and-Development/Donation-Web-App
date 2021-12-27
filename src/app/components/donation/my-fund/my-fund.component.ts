import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/services/app/auth/authentication.service';
import { fundService } from 'src/app/services/app/fund.service';

@Component({
  selector: 'app-my-fund',
  templateUrl: './my-fund.component.html',
  styleUrls: ['./my-fund.component.scss']
})
export class MyFundComponent implements OnInit {

  user: any ={};
  funds:any =[];
  activeFunds :Ifund[]; // : Observable<any>;
  avatar:string='';

  //Pagination
  page = 1;
  count = 0;
  tableSize = 5;

  constructor(
    private fb:FormBuilder,
    private fundService: fundService,
    private router:Router,
    private authService: AuthenticationService,
    private actRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.userDetails();
    this.getMyFunds();
  }

  getMyFunds():void{
    this.fundService.getMyfunds(this.user.id).subscribe({
      next:(data:any) =>{
        this.funds = data.data;
        this.activeFunds = this.funds.filter((fund:any) => fund.status =='active');
      },
      error:(err:any) =>{
        console.log(err);
      },
      complete :()=>{
       
      }
    })
  }

  userDetails():void{
    this.user = JSON.parse(sessionStorage.getItem('auth-user') || '{}');
    
    if(this.authService.isUserLoggedIn())
    {
      this.avatar= `http://localhost:8081/${this.user.avatar}`;
    }else{
      this.avatar="../../../../assets/images/avatar/userempty.png";
    }
  }

  onTableDataChange(event:any){
    this.page = event;
    this.getMyFunds();
  } 

  getTarget(sum:any, targetAmount:any):string{
    let p = (100 * sum) / targetAmount;
    return  p>100? '100%' : p+'%';
  }
  
}

export interface Ifund{
  title:string,
  targetAmount:string,
  totalDonationAmount:string,
  totalDonations:string
}
