import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { registrationService } from 'src/app/services/app/registration/registration.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  // role: string='client';
  user = {
    userProfile : {
      fullName: '',
      address: '',
      contact: '',
      dob: '',
      login: {
      name: '',
      email: '',
      password: '',
      avatar: ''
    }
  }
};

  constructor(
    private fb: FormBuilder,
    private tokenStorage:TokenStorageService,
    private authService:AuthenticationService,
    private registrationService:registrationService,
    private _router: Router
  ) { }
  
  createForm() {
    this.registrationForm = this.fb.group({
      name: [''],
      email: ['', Validators.required],
      contact: [''],
      address: [''],
      dob: [''],
      password: ['']
    });
  }
  ngOnInit(): void {
    this.createForm();
  }

  register(): void {
    
    this.user.userProfile.fullName = this.registrationForm.value.name;
    this.user.userProfile.address = this.registrationForm.value.address;
    this.user.userProfile.contact = this.registrationForm.value.contact;
    this.user.userProfile.dob = this.registrationForm.value.dob;
    this.user.userProfile.login.name = this.registrationForm.value.name;
    this.user.userProfile.login.email = this.registrationForm.value.email;
    this.user.userProfile.login.password = this.registrationForm.value.password;
    this.user.userProfile.login.avatar = "wfdsfsfdds";

    this.registrationService.createUser(this.user, 'client').subscribe(
    {
        next: (data) => {
          console.log(data);
        },

        error: (err) => {
          // this.errorMessage = 'Invalid Credentials!'; 
          console.log(err);
        },

        complete: () => console.info('complete') 
    }
    );
  }

}
