import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { data } from '../model/data';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  login!:FormGroup
    constructor(private demo:DataService,private fb:FormBuilder,private route:Router) {
        this.login=this.fb.group({
          userName:[''],
          password:['']
        })
    }
    arrdata={} as data
    ngOnInit(): void {
      this.demo.getdata().subscribe(p=>{
        console.log(p);
        this.arrdata=p
        console.log(this.arrdata)
      })
    }



    log(){

      this.demo.verifyuser(this.login.value.userName,this.login.value.password,this.arrdata)
      
      this.route.navigate(['mainform'])
    }


}
