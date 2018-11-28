import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import  { Router }  from '@angular/router'

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(private httpClient:HttpClient, private router:Router) { }

  ngOnInit() {
  }
  loginUser(e){
    e.preventDefault();
    var username=e.target.elements[0].value
    var password=e.target.elements[1].value
    var body={
      username:username,
      password:password
    }
    this.httpClient.post('/api/login',body,{responseType: 'text'})
                   .subscribe(
                     data=>{
                       console.log(data)
                        this.router.navigate(['']);
                     },
                     error =>{
                       console.log('Error',error)
                     }
                   )
    console.log(username,password)
    return false;
  }

}
