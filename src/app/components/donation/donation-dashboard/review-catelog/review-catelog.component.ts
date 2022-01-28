import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/app/auth/authentication.service';

@Component({
  selector: 'app-review-catelog',
  templateUrl: './review-catelog.component.html',
  styleUrls: ['./review-catelog.component.scss']
})
export class ReviewCatelogComponent implements OnInit {
  @Input('reviewsList') reviewsList:any;

  //Pagination
  page = 1;
  count = 0;
  tableSize = 12;


  constructor(
    private router:Router,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
  }

  onTableDataChange(event:any){
    this.page = event;
    // this.getFunds();
  } 

  populateImage(name: string):string{
    
    console.log(name);
    return `http://localhost:8081/${name}`;
    
  }

  // showText(reviewid:number) {
  //   let index = this.reviews.findIndex((obj:any) => obj.id ==reviewid );
  //   this.reviews[index].isReadMore = !this.reviews[index].isReadMore;
  // }
}
