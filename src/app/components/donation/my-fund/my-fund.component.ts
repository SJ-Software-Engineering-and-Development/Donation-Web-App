import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/services/app/auth/authentication.service';
import { fundService } from 'src/app/services/app/fund.service';
import Swal from 'sweetalert2';

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
  myActiveFundCount: any;
  pendingCount = 0;
  cancleCount = 0;
  //Pagination
  page = 1;
  count = 0;
  tableSize = 5;

  create_donationForm:FormGroup
  fund = {
    title:'',
    description : '',
    targetAmount : '',
    targetDate : '',
    userProfileId:'',
    categoryId:''
  }

  constructor(
    private fb:FormBuilder,
    private fundService: fundService,
    private router:Router,
    private authService: AuthenticationService,
    private actRoute: ActivatedRoute,
  ) { }

  createForm() {
    this.create_donationForm = this.fb.group({
      title: [''],
      description: ['', Validators.required],
      targetAmout: [''],
      targetDate: [''],
      category:['']
    });
  }

  ngOnInit(): void {
    this.userDetails();
    this.getMyFunds();
    this.createForm();
  }

  getMyFunds():void{
    this.fundService.getMyfunds(this.user.id).subscribe({
      next:(data:any) =>{
        this.funds = data.data;
        this.activeFunds = this.funds.filter((fund:any) => fund.status =='active');
        this.funds.filter((fund:any) => fund.status =='pending'? this.pendingCount++:"");
        this.funds.filter((fund:any) => fund.status =='cancle'? this.cancleCount++:"");
        this.myActiveFundCount = this.activeFunds.length;
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
    console.log(this.user.avatar);
    if(this.user.avatar != "")
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

  submit():void{
    this.fund.title = this.create_donationForm.value.title;
    this.fund.description = this.create_donationForm.value.description;
    this.fund.targetAmount = this.create_donationForm.value.targetAmout;
    this.fund.targetDate = this.create_donationForm.value.targetDate;
    this.fund.userProfileId = this.user.id;
    this.fund.categoryId = this.create_donationForm.value.category;
    console.log(this.fund);
    this.fundService.create(this.fund).subscribe(
      {
        next: (data) => {
          console.log(data);
          this.getMyFunds();
        },

        error: (err) => {
          Swal.fire({  
            icon: 'error',  
            title: 'Oops...',  
            text: "All fields are required !",  
            footer: '<a href>Why do I have this issue?</a>'  
          }) 
          console.log(err);
          
        },

        complete: () => {
          console.info('complete');
          this.create_donationForm.reset();
          Swal.fire('Thank you...', 'You submitted succesfully!', 'success');

        } 
      }
    );
    
  }
  
}

export interface Ifund{
  title:string,
  targetAmount:string,
  totalDonationAmount:string,
  totalDonations:string
}
