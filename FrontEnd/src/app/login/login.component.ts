import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   LoginForm = new FormGroup({
    userid:new FormControl(),
    password:new FormControl(),
  });
  sendData()
  {
   //console.log(this.LoginForm.value);
   this.ser.LoginUser(this.LoginForm.value).subscribe(
     (response:{status:Boolean,msg:string,val:string})=>{
       if(response.status===true)
       {
         localStorage.setItem("userid",response.val);
         this.router.navigate(['/ourstory']);
       }
       else
       {
         alert(response.msg);
       }

     }
   );
  }
  constructor(private ser : DataService,private router : Router) { }

  ngOnInit() {
      
    
  }

}
