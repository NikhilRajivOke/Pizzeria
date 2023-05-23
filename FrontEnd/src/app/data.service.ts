import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  constructor(private http: HttpClient) { }

  getPizza(){
    return this.http.get("http://localhost:4003/get-pizza");
  }

  getIngredient()
  {
    return this.http.get("http://localhost:4003/get-ingredients");
  }
  registerUser(obj:any){
    
    return this.http.post("http://localhost:4003"+"/add-user",obj);
  }
  LoginUser(obj:any){
    //console.log(obj);
    return this.http.post("http://localhost:4003"+"/login-user",obj);
  }
  Pizza(obj)
  {
    return this.http.post("http://localhost:4003"+"/shoppingcart",obj);
  }
  getPizzaData(userid:any)
  {
    return this.http.get("http://localhost:4003/getpizzadata/"+userid);
  }
  RemovePizza(obj:any){
    var data= {
     userid : obj.userid,
     pizzaname : obj.pizzaname,
    }
    
    //console.log(data);
    return this.http.post("http://localhost:4003"+"/rp",data);
  }
}
