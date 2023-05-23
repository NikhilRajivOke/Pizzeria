import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataService } from '../data.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  RegisterForm = new FormGroup({
    username:new FormControl(),
    userid:new FormControl(),
    password:new FormControl(),
    phoneno:new FormControl(),
  });

  regData(){
    this.ser.registerUser(this.RegisterForm.value).subscribe(
      (response:{status:boolean})=>{
        console.log(response);
        if(response.status===true){
          alert("User Registered Succesful !")
          this.router.navigate([''])
        }
      }
    )
  }
  constructor(private ser : DataService,private router : Router) { }

  ngOnInit() {
  }

}
