import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import  { Router }  from '@angular/router'

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {

  constructor(private httpClient:HttpClient, private router:Router) { }

  ngOnInit() {
  }
  signupUser(e){
    e.preventDefault();
    var username=e.target.elements[0].value
    var email=e.target.elements[1].value
    var password=e.target.elements[2].value
    console.log(username,password)
    var body={
      username:username,
      email:email,
      password:password
    }
    this.httpClient.post('/api/signup',body,{responseType: 'text'})
                   .subscribe(
                     data=>{
                       console.log('post request sent')
                        this.router.navigate(['']);
                     },
                     error =>{
                       console.log('Error',error)
                     }
                   )

    return false;
  }

}
