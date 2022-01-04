import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/app/auth/authentication.service';


@Component({
  selector: 'app-fund-catelog',
  templateUrl: './fund-catelog.component.html',
  styleUrls: ['./fund-catelog.component.scss']
})
export class FundCatelogComponent implements OnInit {
  @Input('fundList') fundList:any;

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

  donateNow(id:string):void{
    this.authService.isUserLoggedIn()?
      this.router.navigate(['view-fund',id]):
      this.router.navigate(['login']);
  }
}
