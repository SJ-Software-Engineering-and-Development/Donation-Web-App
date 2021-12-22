import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { fundService } from 'src/app/services/app/fund.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

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

  reviewsList = [{
    "id":1,
    "name": "Supun Perera",
    "review" :"Awesome product pissu manna ge face eka nam nice lol🤣",
    "date":"2021-02-04",
    "isReadMore": true
  },{
    "id":2,
    "name": "Kamal",
    "review" :"Loving it so soft 100% perfect",
    "date":"2021-02-04",
    "isReadMore": true
  },{
    "id":3,
    "name": "Sakuni",
    "review" :"Who knew a simple t shirt had the capability to present a joke!😎🌚 #ඔව්",
    "date":"2021-05-27",
    "isReadMore": true
  },{
    "id":4,
    "name": "Sashini Rathnakeerthi",
    "review" :"I always wanted to buy this t shirt. Super satisfied with the customer service too. I am so happy with the product and the excellent service. Love it!!❤️ Looking forward to buy moreee.",
    "date":"2021-04-04",
    "isReadMore": true
  },{
    "id":5,
    "name": "Milan Joiey",
    "review" :"Awesome product love it",
    "date":"2021-07-04",
    "isReadMore": true
  },{
    "id":6,
    "name": " Geethaka Rajapaksha",
    "review" :"One of my best purchases 🥰❤️",
    "date":"2021-02-04",
    "isReadMore": true
  },{
    "id":7,
    "name": "Piyuni",
    "review" :"Love this Tshirt so much, so adorable, comfortable and lightweight!!!",
    "date":"2021-02-04",
    "isReadMore": true
  },{
    "id":8,
    "name": "Kusal Lakshan",
    "review" :"Just a quick note to say how pleased I am with the quality and fit of your T-shirts. The fit is just right for me, in the past I have purchased T-shirts that are too long and others just right but wash up short. After several washes your T-shirts have maintained their shape and colour. I’m very happy not only with the quality of your shirts but also the excellent service.",
    "date":"2021-02-04",
    "isReadMore": true
  },{
    "id":9,
    "name": "Kusal Lakshan",
    "review" :"Just a quick note to say how pleased I am with the quality and fit of your T-shirts. The fit is just right for me, in the past I have purchased T-shirts that are too long and others just right but wash up short. After several washes your T-shirts have maintained their shape and colour. I’m very happy not only with the quality of your shirts but also the excellent service.",
    "date":"2021-02-04",
    "isReadMore": true
  },{
    "id":10,
    "name": "Kusal Lakshan",
    "review" :"Just a quick note to say how pleased I am with the quality and fit of your T-shirts. The fit is just right for me, in the past I have purchased T-shirts that are too long and others just right but wash up short. After several washes your T-shirts have maintained their shape and colour. I’m very happy not only with the quality of your shirts but also the excellent service.",
    "date":"2021-02-04",
    "isReadMore": true
  },{
    "id":11,
    "name": "Kusal Lakshan",
    "review" :"Just a quick note to say how pleased I am with the quality and fit of your T-shirts. The fit is just right for me, in the past I have purchased T-shirts that are too long and others just right but wash up short. After several washes your T-shirts have maintained their shape and colour. I’m very happy not only with the quality of your shirts but also the excellent service.",
    "date":"2021-02-04",
    "isReadMore": true
  }];

  fundList=[
    {
        "id": "",
        "title": "",
        "description": "",
        "targetAmount": "",
        "targetDate": "",
        "createdDate": "",
        "status": "",
        "userProfileId": "",
        "categoryId": "",
        "category": {
            "id": "",
            "name": "",
            "description": "",
            "image": "",
            "status": ""
        }
    }
];

  constructor(
    private fundService: fundService,
    private router:Router,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.getFunds();

  }

  showText(reviewid:number) {
    let index = this.reviewsList.findIndex((obj:any) => obj.id ==reviewid );
    this.reviewsList[index].isReadMore = !this.reviewsList[index].isReadMore;
  }

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

  donateNow(id:string):void{
    this.authService.isUserLoggedIn()?
      this.router.navigate(['view-fund',id]):
      this.router.navigate(['login']);
  }
} 
