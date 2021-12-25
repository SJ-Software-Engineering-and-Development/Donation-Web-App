import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/app/auth/authentication.service';
import { registrationService } from 'src/app/services/app/auth/registration.service';
import { TokenStorageService } from 'src/app/services/app/auth/token-storage.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2'; 

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

  // selectedFile = null;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private tokenStorage:TokenStorageService,
    private authService:AuthenticationService,
    private registrationService:registrationService,
    private _router: Router,
    private http: HttpClient
  ) { }
  
  createForm() {
    this.registrationForm = this.fb.group({
      name: [''],
      email: ['', Validators.required],
      contact: [''],
      address: [''],
      dob: [''],
      // image:[''],
      img:[null],
      password: ['']
    });
  }
  ngOnInit(): void {
    this.createForm();
  }

  // upload(event: { target: { files: null[]; }; }){
  //   this.selectedFile = event.target.files[0];
  // }

  upload(event: any) {
    // this.selectedFile = event.item(0);
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      // this.registrationForm.get('profile').setValue(file);

    }
}
  
  register(): void {
    
    var formData: any = new FormData();
    formData.append("avatar", this.selectedFile);
    formData.append("fullName", this.registrationForm.value.name);
    formData.append("address",this.registrationForm.value.address);
    formData.append("contact", this.registrationForm.value.contact);
    formData.append("dob", this.registrationForm.value.dob);
    formData.append("name", this.registrationForm.value.name);
    formData.append("email", this.registrationForm.value.email);
    formData.append("password", this.registrationForm.value.password);
    // this.user.userProfile.login.avatar = 
   
    this.registrationService.createUser(formData, 'client').subscribe(
    {
        next: (data) => {
          console.log(data);
        },

        error: (err) => {
          // this.errorMessage = 'Invalid Credentials!'; 
          Swal.fire({  
            icon: 'error',  
            title: 'Oops...',  
            text: "All fields are required!",  
            footer: '<a href>Why do I have this issue?</a>'  
          })  

          console.log(err);
        },

        complete: () => {console.info('complete');
      this.registrationForm.reset();
      
      Swal.fire('Thank you...', 'You submitted succesfully!', 'success');
      setTimeout(() => {
        this._router.navigate(["login"]);
      }, 1500);
    } 
    }
    );
  }

  btn_login():void{
    this._router.navigate(["login"]);
  }

}
