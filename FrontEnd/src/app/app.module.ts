import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {LayoutModule} from '@angular/cdk/layout';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavcompComponent } from './navcomp/navcomp.component';
import { MaterialModule } from './material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import { OrderComp } from './OrderPizza';
import { IngredientComp } from './IngredientComp';
import { RouterModule } from '@angular/router';
import { HomeComp } from './HomeComp';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './data.service';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ShoppingComponent } from './shopping/shopping.component';




@NgModule({
  declarations: [
    AppComponent,
    NavcompComponent,OrderComp,IngredientComp,HomeComp, LoginComponent,LoginComponent, RegisterComponent, ShoppingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,HttpClientModule,ReactiveFormsModule,FormsModule,
    BrowserAnimationsModule,MaterialModule,LayoutModule,FlexLayoutModule,RouterModule.forRoot([{
      path:'',component:LoginComponent,
    },
    {
      path:'register',component:RegisterComponent
    },
    {
      path:'ourstory',component:HomeComp
    },
    {
      path:'orderpizza',component:OrderComp
    },
  {
    path:'buildpizza',component:IngredientComp
  }])
    
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
