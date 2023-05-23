import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

@Component({
    template: `
    <app-navcomp></app-navcomp>
    <p align="center">Pizzeria now gives you options to build your own pizza.Customize your pizza by choosing from ingredients from the list given below </p>
                <div  align="center" >
                <mat-table class="mat-elevation-z8 tablecss" [dataSource]="data">
                <ng-container matColumnDef="ingredient">
                    <mat-header-cell *matHeaderCellDef>Ingredients</mat-header-cell>
                    <mat-cell *matCellDef ="let d"><img src={{d.image}} height="130px" width="130px"></mat-cell>
                </ng-container>
                <ng-container matColumnDef="price">
                    <mat-header-cell *matHeaderCellDef>Name & price</mat-header-cell>
                    <mat-cell *matCellDef="let d">{{d.tname}}   {{d.price | currency:'INR':true}}</mat-cell>
                </ng-container>
                <ng-container matColumnDef="add">
                    <mat-header-cell *matHeaderCellDef>Add Ingredients</mat-header-cell>
                    <mat-cell *matCellDef="let d"><input type="checkbox" (change)="CalcTotal(d,$event)"><span style="color:orange;paddin-left:20px">Add</span></mat-cell>
                </ng-container>
                <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
    
                <mat-row *matRowDef="let d; columns: displayedColumns"></mat-row>
                </mat-table>
                <div align="left">
                <label style="color:blue;font-weight:bold;font-size:18px">Total Cost</label>  : <span style="border:1px solid black">{{total}}</span>
                </div>
                <br/>
                <br/>
                <button mat-raised-button>Build Ur Pizza</button>
                </div>
                `,
    styles: [`
                .tablecss
                {
                    width:70%;
                    
                }
                mat-header-cell{
                    
                    color:black;
                    font-size:12px;
                }
                button{
                    color:orange;
                    background-color:black;
                }
            `]
})
export class IngredientComp implements OnInit {
    data: [];
    constructor(private ser: DataService) { }
    total: any = 0;
    flag=true;
    CalcTotal(obj: any,event:any) {
        //console.log(obj.price);
        //console.log(typeof(price));
        if(event.target.checked)
        this.total = this.total + obj.price;
        else
        this.total = this.total - obj.price;
        //console.log(typeof(this.total));
    }
    displayedColumns: any = ['ingredient', 'price', 'add'];
    ngOnInit() {
        this.ser.getIngredient().subscribe(
            (response: { status: Boolean, ingredientdata: [] }) => {
                if (response.status === true)
                    this.data = response.ingredientdata
                //console.log(response.ingredientdata);  
            }

        )
    }
}
