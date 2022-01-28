import { Component, OnInit } from '@angular/core';
import { donationService } from 'src/app/services/app/donation.service';

@Component({
  selector: 'app-donations-list',
  templateUrl: './donations-list.component.html',
  styleUrls: ['./donations-list.component.scss']
})
export class DonationsListComponent implements OnInit {

  donations:any = [{
    id: "",
    status: "",
    amount: "",
    details: "",
    type: "",
    isPublic: true,
    image: "",
    DonatedDate: "",
    createdAt: "",
    updatedAt: "",
    fundId: "",
    donatorId: ""
}];

//Pagination
page = 1;
count = 0;
tableSize = 10;

  image:string = '';

  constructor(
    private donationService:donationService
  ) { }

  ngOnInit(): void {
    this.getDonations();
  }

  getDonations():void{
    this.donationService.getAllDonations().subscribe({
      next:(data:any) =>{
       this.donations = data.data;
        console.log(data);
       
      },
      error:(err:any) =>{
        console.log(err);
      },
      complete :()=>{
        
      }
    })
  }
  populateImage(name: string){
    this.image= `http://localhost:8081/${name}`;
    // this.description = des;
  }

  onTableDataChange(event:any){
    this.page = event;
  } 

}
