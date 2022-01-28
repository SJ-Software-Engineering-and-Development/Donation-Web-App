import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { fundService } from 'src/app/services/app/fund.service';
import { reviewService } from 'src/app/services/app/review.service';
import { categoryService } from 'src/app/services/app/category.service';
import { AuthenticationService } from 'src/app/services/app/auth/authentication.service';

// import Swiper core and required modules
import SwiperCore, { Navigation } from "swiper";
// install Swiper modules
SwiperCore.use([Navigation]);

@Component({
  selector: 'app-donation-dashboard',
  templateUrl: './donation-dashboard.component.html',
  styleUrls: ['./donation-dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DonationDashboardComponent implements OnInit {

  //Pagination
  page = 1;
  count = 0;
  tableSize = 12;

  reviewsList:IReview[];
  fundList:IFund[];
  categoryList:ICategory[];

  constructor(
    private fundService: fundService,
    private reviewService: reviewService,
    private categoryService: categoryService,
    private router:Router,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.getFunds();
    this.getReviews();
    this.getCategory();

  }
  onTableDataChange(event:any){
    this.page = event;
    this.getFunds();
  } 

  // showText(reviewid:number) {
  //   let index = this.reviewsList.findIndex((obj:any) => obj.id ==reviewid );
  //   this.reviewsList[index].isReadMore = !this.reviewsList[index].isReadMore;
  // }

  getFunds():void{
    this.fundService.getByStatus("active").subscribe({
      next:(data) =>{
        this.fundList = data;
      },
      error:(err) =>{

      },
      complete:()=>{
        console.log("funds list get success");
      }
    })
  }
  getCategory():void{
    this.categoryService.getAll().subscribe({
      next:(data) =>{
        this.categoryList = data;
        console.log("=============" + data)

      },
      error:(err) =>{

      },
      complete:()=>{
        console.log("funds list get success");
      }
    })
  }

  getReviews():void{
    this.reviewService.getAll().subscribe({
      next:(data) =>{
        this.reviewsList = data;
        
      },
      error:(err) =>{

      },
      complete:()=>{
        console.log("funds list get success");
      }
    })
  }

  donateNow(id:string):void{
    this.authService.isUserLoggedIn()?
      this.router.navigate(['view-fund',id]):
      this.router.navigate(['login']);
  }
  
  populateImage(name: string):string{
    
    console.log(name);
    return `http://localhost:8081/${name}`;
    
  }
} 

interface IFund{
  id:string,
        title: string,
        description: string,
        targetAmount: string,
        targetDate: string,
        createdDate: string,
        status: string,
        userProfileId: string,
        categoryId: string,
        category: {         
         id: string,
            name: string,
            description: string,
            image: string,
            status: string
        }
}

interface IReview{
  id: string,
  review: string,
  image: string,
  date:string,
  donorId : string
}

interface ICategory{
  id: string, 
  name: string, 
  description: string, 
  image: string, 
  status: string, 
  createdAt: string, 
  updatedAt: string
}