import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/app/auth/authentication.service';
import { donationService } from 'src/app/services/app/donation.service';
import { reviewService } from 'src/app/services/app/review.service';
import { fundService } from 'src/app/services/app/fund.service';
import * as dayjs from 'dayjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fund-details',
  templateUrl: './fund-details.component.html',
  styleUrls: ['./fund-details.component.scss']
})
export class FundDetailsComponent implements OnInit {

  fund:any ={};
  daysLeft:any='';
  totalDonations=0;
  donationsSum=0;
  donatePresentage ='';

  selectedFile: File | null = null;
  reviewForm:FormGroup;
  user: any ={};
 // checkoutData  = 

  constructor(
    private fb:FormBuilder,
    private fundService: fundService,
    private reviewService: reviewService,
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
    this.createForm();
    this.user = JSON.parse(sessionStorage.getItem('auth-user') || '{}');
  }

  createForm(){
    this.reviewForm = this.fb.group({
      
      feedback: [''],
      image: [null],
    });
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
  }

  upload(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  submitReview():void{
    
    var formData: any = new FormData();

    formData.append("review", this.reviewForm.value.Description);
    formData.append("image", this.selectedFile);
    formData.append("donorId", this.user.id);

    this.reviewService.create(formData).subscribe(
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
            this.reviewForm.reset();
            Swal.fire('Thank you...', 'You submitted succesfully!', 'success');
          } 
      }
      );
    }

}
