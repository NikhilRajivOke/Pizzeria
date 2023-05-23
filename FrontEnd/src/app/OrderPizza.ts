import {Component , OnInit, ɵConsole} from '@angular/core';
import { DataService } from './data.service';

@Component({
    template:`  
    <app-navcomp></app-navcomp>
                    <div  fxLayout="row" fxLayout.xs="column" fxLayoutGap="0.05%" fxLayoutAlign="center" >
                      <div  fxLayout.xs="column" fxLayout="Wrap Column" fxLayoutGap="0%" fxLayoutAlign="center">
                        <mat-card fxFlex="45%" *ngFor="let p of pizzaData;index as i" fxLayoutGap="20px">
                            <div >
                            <mat-card-title>
                                <label>{{p.name}}</label>
                            </mat-card-title>
                            {{p.price | currency:'INR':ture}}
                            </div>
                            <div fxLayout>
                            <mat-card-content>
                                <div>
                                    <p>{{p.description}}</p>
                                    <p><span class="heading">Ingredients : </span>{{p.ingredients}}</p>
                                    <p><span class="heading">Toppings : </span>{{p.topping}}</p>
                                </div>
                            </mat-card-content >
                            </div>
                            <div fxLayout>
                            <mat-card-actions align="center">
                                <div>
                                    <img src={{p.image}} alt="Pizza image" height="150px" width="150px">
                                    <button id={{i+1}} mat-flat-button color="warn" (click)="AddPizza(p,i+1)">Add to Cart</button>
                                </div>
                            </mat-card-actions>
                            </div>
                        </mat-card>
                        
                    </div>
                    
                       
`,
styles:[`
         
            mat-card{
               
                
                display:flex;
                box-shadow:5px 10px;
            }
          
            mat-card-actions button
            {
              
            }
            mat-card-content{
               
                display:flex;
            }
           .heading{
               font-weight:bold;
           }
           #name label{
                font-weight:bold;
                font-size:20px;
                
           }
          
        `]
})
export class OrderComp implements OnInit
{
    pizzaData:[];
    constructor(private ser : DataService){}
    AddPizza(val,index){
        console.log(index);
        var userid = localStorage.getItem("userid");
        console.log(userid);
        var data = {
            userid:userid,
            pizzaname:val.name,
            img:val.image,
            pizzaprice:val.price,
        }
        console.log(data);
        this.ser.Pizza(data).subscribe(
            (response:{status:Boolean,msg:String})=>{
                if(response.status===true)
                {
                    console.log(response.msg);
                    document.getElementById(index).innerHTML="Added";
                }
            })
        
    }
    ngOnInit()
    {
        this.ser.getPizza().subscribe(
            (response:{status:Boolean,pizzadata:[]})=>
            {
                //console.log(response.pizzadata);
                
                this.pizzaData = response.pizzadata; 
                //console.log(this.pizzaData);
            }
        )
        
    }
}
   

