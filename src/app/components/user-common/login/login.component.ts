import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/app/auth/authentication.service';
import { TokenStorageService } from 'src/app/services/app/auth/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  role: string='';
  
  constructor(
    private tokenStorage:TokenStorageService,
    private authService:AuthenticationService,
    private _router: Router
  ){ }

  ngOnInit(): void {

    this.loginForm = new FormGroup({
      'username' : new FormControl(null, [Validators.required]),
      'password' : new FormControl(null, [Validators.required])
    });

    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.role = this.tokenStorage.getUser().role;   
    }

  }

  onSubmit(): void {
    this.authService.login(this.loginForm.value).subscribe(
      {
        next: (data) => {
          this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveUser(data.user);
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.role = data.user.role;
          this.loginForm.reset();

          switch(this.role){
            case 'client':  this._router.navigate(["donation-dashboard"]);
            break;
            case 'site-admin':  this._router.navigate(["admin-dashboard"]);
            break;
            default:  ;
          }

          
        },
        error: (err) => {
          this.errorMessage = 'Invalid Credentials!';
          this.isLoginFailed = true;
          console.log(err);
        },
        complete: () => console.info('complete') 
    }
    );
  }

  btn_registration():void{
    this._router.navigate(["registration"]);
  }

  clicksub(){
    this.loginForm.reset();
  }
  get f()
  {
      return this.loginForm.controls;
  }

  get username(){
    return this.loginForm.get('username');
  }

  get password(){
    return this.loginForm.get('password');
  }


}
