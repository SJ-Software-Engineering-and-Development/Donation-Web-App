import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { Router } from '@angular/router';
import { fundService } from 'src/app/services/app/fund.service';
import { registrationService } from 'src/app/services/app/auth/registration.service';
import { AuthenticationService } from 'src/app/services/app/auth/authentication.service';
import { TokenStorageService } from 'src/app/services/app/auth/token-storage.service';

@Component({
  selector: 'app-add-donation',
  templateUrl: './add-donation.component.html',
  styleUrls: ['./add-donation.component.scss']
})

export class AddDonationComponent implements OnInit {

  create_donationForm:FormGroup
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  fund = {
    title:'',
    description : '',
    targetAmount : '',
    targetDate : '',
    userProfileId:'',
    categoryId:1
  }
  
  user: any ={};

  constructor(
    private fb: FormBuilder,
    private tokenStorage:TokenStorageService,
    private fundService:fundService,
    // private registrationService:registrationService,
    private _router: Router,
    private http: HttpClient
  ) {}

  createForm() {
    this.create_donationForm = this.fb.group({
      title: [''],
      description: ['', Validators.required],
      targetAmout: [''],
      targetDate: [''],
      category:['']
    });
  }
  ngOnInit(): void {
    this.createForm();
    this.user =  JSON.parse(sessionStorage.getItem('auth-user') || '{}');
  }

  submit():void{
    this.fund.title = this.create_donationForm.value.title;
    this.fund.description = this.create_donationForm.value.description;
    this.fund.targetAmount = this.create_donationForm.value.targetAmout;
    this.fund.targetDate = this.create_donationForm.value.targetDate;
    this.fund.userProfileId = this.user.id;
    this.fund.categoryId = this.create_donationForm.value.category;
    console.log(this.fund);
    this.fundService.create(this.fund).subscribe(
      {
        next: (data) => {
          console.log(data);
        },

        error: (err) => {
          // this.errorMessage = 'Invalid Credentials!'; 
          console.log(err);
        },

        complete: () => {
          console.info('complete');
          
        } 
      }
    );
    
  }




}
