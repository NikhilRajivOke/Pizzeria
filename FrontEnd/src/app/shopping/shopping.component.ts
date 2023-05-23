import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit {
  items:any;
  length:number;
  displayedColumns: any = ['name', 'image'];
  constructor(private ser : DataService) { }
  menu()
  {
   var userid=localStorage.getItem('userid');
     
   this.ser.getPizzaData(userid).subscribe(
     (response:{pizzadata:[]})=>{
       console.log(response.pizzadata);
       this.items = response.pizzadata;
     }
    
   ) 
  this.length=this.items.length;
  }
  ngOnInit() {
  }

}
