import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  avatar:string='';

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
        console.log(data);
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

}
