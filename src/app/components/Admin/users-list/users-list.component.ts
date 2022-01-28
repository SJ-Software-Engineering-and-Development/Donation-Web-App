import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/app/auth/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  usersList:any=[{
    id: '',
    fullName: '',
    address: '',
    contact:'',
    dob: '',
    createdAt: '',
    updatedAt: '',
    loginId: 1,
    login: {
        id: '',
        name: '',
        email: '',
        role: '',
        lastLogin: '',
        avatar: '',
        status: ''
}
}]
  constructor(
    private UserService: UserService
  ) { }

  //Pagination
page = 1;
count = 0;
tableSize = 10;

  ngOnInit(): void {
    this.getAll();
  }

  getAll():void{
    this.UserService.getAllUsers().subscribe({
      next:(data:any) =>{
       this.usersList = data;
        console.log(data);
       
      },
      error:(err:any) =>{
        console.log(err);
      },
      complete :()=>{
        
      }
    })
  }

  onTableDataChange(event:any){
    this.page = event;
  } 

}
