import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/app/auth/authentication.service';

@Component({
  selector: 'app-category-catelog',
  templateUrl: './category-catelog.component.html',
  styleUrls: ['./category-catelog.component.scss']
})
export class CategoryCatelogComponent implements OnInit {

  @Input('categoryList') categoryList:any;

   //Pagination
   page = 1;
   count = 0;
   tableSize = 3;
   
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
}
