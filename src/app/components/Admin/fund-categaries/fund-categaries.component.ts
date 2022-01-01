import { flatten } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/app/auth/authentication.service';
import { categoryService } from 'src/app/services/app/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fund-categaries',
  templateUrl: './fund-categaries.component.html',
  styleUrls: ['./fund-categaries.component.scss']
})
export class FundCategariesComponent implements OnInit {

  
  categary: any=[]

  //Pagination
  page = 1;
  count = 0;
  tableSize = 5;
  
  CategoryForm: FormGroup;
  avatar: string='';
  isUpdate: boolean = false;

  constructor(
    private fb:FormBuilder,
    private categoryServide:categoryService,
    private router:Router,
    private authService: AuthenticationService,
    private actRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getAll();
    this.createForm();
  }

  createForm(){
    this.CategoryForm = this.fb.group({
      Name:['', [Validators.required, Validators.minLength(2)]],
      Description: [''],
      image: [null],
    });
  }
    
    
  selectedFile: File | null = null;

  getAll():void{
    this.categoryServide.getAll().subscribe({
      next:(data:any) =>{
        
       this.categary = data;
       
      },
      error:(err:any) =>{
        console.log(err);
      },
      complete :()=>{
        
      }
    })
  }

  submit():void{
    
    var formData: any = new FormData();

    formData.append("name", this.CategoryForm.value.Name);
    formData.append("description", this.CategoryForm.value.Description);
    formData.append("image", this.selectedFile);

    this.categoryServide.create(formData).subscribe(
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
            this.CategoryForm.reset();
            Swal.fire('Thank you...', 'You submitted succesfully!', 'success');
          } 
      }
      );
    }

    delete(id:any){
      this.categoryServide.delete(id).subscribe(
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
              this.CategoryForm.reset();
              Swal.fire('Thank you...', 'Deleted succesfully!', 'success');
            } 
        }
        );
    }

    update(){
      var formData: any = new FormData();

      formData.append("name", this.CategoryForm.value.Name);
      formData.append("id", this.oldfcategory[0].id);
      formData.append("description", this.CategoryForm.value.Description);
      formData.append("image", this.selectedFile);

    this.categoryServide.update(formData).subscribe(
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
            this.CategoryForm.reset();
            Swal.fire('Thank you...', 'Updated succesfully!', 'success');
          } 
      }
      );
    }

    oldfcategory: oldfcategory[];
    
    updateForm(id:any){ 
      this.isUpdate = true;
      this.oldfcategory = this.categary.filter((item:any) => item.id == id);
      this.CategoryForm.patchValue({
        Name: this.oldfcategory[0].name,
        Description: this.oldfcategory[0].description,
        Image: `http://localhost:8081/${this.oldfcategory[0].image}`
      });
    }

    btn_change(){
      this.isUpdate = false;
      this.CategoryForm.reset();
    }
    onTableDataChange(event:any){
      this.page = event;
      this.getAll();
    } 

    upload(event: any) {
      if (event.target.files.length > 0) {
        this.selectedFile = event.target.files[0];
      }
    }

    populateImage(name: string){
      this.avatar= `http://localhost:8081/${name}`;
    }
  
}

interface  oldfcategory {id:string,name: string, description:string, image:string};