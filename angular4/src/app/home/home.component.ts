import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private httpClient:HttpClient) { }
  questions;
  ngOnInit() {
    this.httpClient.get('/api/questions',{responseType: 'text'})
                   .subscribe(
                     data=>{
                       console.log(data)
                       this.questions=JSON.parse(data).reverse();
                     },
                     error =>{
                       console.log('Error',error)
                     }
                   )
  }
  addQuestion(e){
    e.preventDefault();
    var question=e.target.elements[0].value
    this.httpClient.post('/api/question',{text:question},{responseType: 'text'})
                   .subscribe(
                     data=>{
                       console.log(data)
                       this.questions=JSON.parse(data).reverse();
                     },
                     error =>{
                       console.log('Error',error)
                     }
                   )

    return false;
  }

}
