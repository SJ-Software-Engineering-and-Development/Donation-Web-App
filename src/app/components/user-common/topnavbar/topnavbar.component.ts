import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-topnavbar',
  templateUrl: './topnavbar.component.html',
  styleUrls: ['./topnavbar.component.scss']
})
export class TopnavbarComponent implements OnInit {


  active:boolean = false;
  constructor() { }

  ngOnInit(): void {

  }
  //Value came from parent component
  toggleClass(value: boolean):void{
   this.active = value;
  }

}
