import { Component, OnInit } from '@angular/core';
import { donationService } from 'src/app/services/app/donation.service';

@Component({
  selector: 'app-confirmed-funds',
  templateUrl: './confirmed-funds.component.html',
  styleUrls: ['./confirmed-funds.component.scss']
})
export class ConfirmedFundsComponent implements OnInit {

  myDontions: any = [];
  image:any = '';
  description:any = '';
  
  //Pagination
  page = 1;
  count = 0;
  tableSize = 10;

  constructor(
    private donationService:donationService
  ) { }

  ngOnInit(): void {
    this.getFundById();
  }
  populateImage(name: string , des:string){
    this.image= `http://localhost:8081/${name}`;
    this.description = des;
  }

  onTableDataChange(event:any){
    this.page = event;
    this.getFundById();
  } 
  getFundById():void{
    const user = JSON.parse(sessionStorage.getItem('auth-user') || '{}');
    this.donationService.getMyDontions(user.id).subscribe({
      next:(data:any) =>{
       this.myDontions = data.data;
       console.log(data)


      },
      error:(err:any) =>{
        console.log(err);
      },
      complete :()=>{
        
      }
    })
  }

}
