import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/app/auth/authentication.service';
import { fundService } from 'src/app/services/app/fund.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-funds',
  templateUrl: './funds.component.html',
  styleUrls: ['./funds.component.scss']
})
export class FundsComponent implements OnInit {

  funds: any=[]
  allFunds: any=[]
  
  //Pagination
  page = 1;
  count = 0;
  tableSize = 5;

  constructor( 
    private fundService:fundService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll():void{
    this.fundService.getByStatus("all").subscribe({
      next:(data:any) =>{

        this.allFunds = data;
        this.funds = this.allFunds.filter((item:any) => item.status == "active");

      },
      error:(err:any) =>{
        console.log(err);
      },
      complete :()=>{
        
      }
    })
  }

  filterFunds(status:any){
    this.funds = this.allFunds.filter((item:any) => item.status == status); 
  }

  action(id:string, status: string){

    Swal.fire({
      title: 'Are you sure to ' +status+' ?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, '+status+'  it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.fundService.update(id, status).subscribe(
          {
              next: (data:any) => {
                console.log(data);
                this.getAll();
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
               
                Swal.fire('Thank you...', 'Updated succesfully!', 'success');
              } 
          }
          );
      }
    })
  }
  onTableDataChange(event:any){
    this.page = event;
    this.getAll();
  } 

  details(id:string):void{
   console.log(id);
    this.router.navigate(['fund-details',id]);
    
}

}
