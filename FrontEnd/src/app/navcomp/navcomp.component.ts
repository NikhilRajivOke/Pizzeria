import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-navcomp',
  templateUrl: './navcomp.component.html',
  styleUrls: ['./navcomp.component.css']
})
export class NavcompComponent implements OnInit {
 items:any;
 length:number=0;
 cost : number =0;
 displayedColumns: any = ['name', 'image'];
  constructor(private ser : DataService) { }
  RemoveItem(obj:any){
    console.log("In Remove Pizza");
      console.log(obj);
      this.ser.RemovePizza(obj).subscribe(
        (response:{})=>
        {
          console.log("Hello");
        }
      )
  }
 menu()
 {
  var userid=localStorage.getItem('userid');
    
  this.ser.getPizzaData(userid).subscribe(
    (response:{pizzadata:[]})=>{
      //console.log(response.pizzadata);
      this.items = response.pizzadata;
      this.length=this.items.length;
    }
    
  ) 
  
 }
  ngOnInit() {
  var userid=localStorage.getItem('userid');
    
  this.ser.getPizzaData(userid).subscribe(
    (response:{pizzadata:[]})=>{
      //console.log(response.pizzadata);
    
      this.items = response.pizzadata;
      this.length=this.items.length;
    }
    
  ) 
  
    
  };
}
