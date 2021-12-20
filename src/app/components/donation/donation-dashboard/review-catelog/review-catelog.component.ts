import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-review-catelog',
  templateUrl: './review-catelog.component.html',
  styleUrls: ['./review-catelog.component.scss']
})
export class ReviewCatelogComponent implements OnInit {
  @Input('reviews') reviews:any;
  constructor() { }

  ngOnInit(): void {
  }

  showText(reviewid:number) {
    let index = this.reviews.findIndex((obj:any) => obj.id ==reviewid );
    this.reviews[index].isReadMore = !this.reviews[index].isReadMore;
  }
}
