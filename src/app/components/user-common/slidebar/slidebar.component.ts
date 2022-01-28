import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { AuthenticationService } from 'src/app/services/app/auth/authentication.service';
import { TokenStorageService } from 'src/app/services/app/auth/token-storage.service';

@Component({
  selector: 'app-slidebar',
  templateUrl: './slidebar.component.html',
  styleUrls: ['./slidebar.component.scss']
})
export class SlidebarComponent implements OnInit, OnChanges {

@Input('isAc') isActive:any;
@Output() sliderEvent = new EventEmitter<boolean>();

loggedUser:any = {};
avatar:string='';
isUserLoggedIn:boolean=false;

role:string = 'client';

  constructor(
    private authService:AuthenticationService,
    private tokenStSerice:TokenStorageService
  ) { }

  ngOnInit(): void {
    this.pupulateUserCard();
  }

  pupulateUserCard():void{
    this.loggedUser = JSON.parse(sessionStorage.getItem('auth-user') || '{}');
    
    if(this.authService.isUserLoggedIn())
    {
      this.avatar= `http://localhost:8081/${this.loggedUser.avatar}`;
      this.role = this.loggedUser.role;
    }else{
      this.avatar="../../../../assets/images/avatar/userempty.png";
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
    this.pupulateUserCard();
    this.isUserLoggedIn= this.authService.isUserLoggedIn();
  }

  handleSlider(value: boolean) {
    this.sliderEvent.emit(value);
  }

  logout():void{
    this.tokenStSerice.signOut();
    this.authService.logout(this.loggedUser.email).subscribe(
      {
        next: (data:any)=>{

        },
        error:(err:any)=>{
          this.tokenStSerice.signOut();
        },
        complete:()=>{
         this.tokenStSerice.signOut();
        }
      }
    )
   
  }
}
