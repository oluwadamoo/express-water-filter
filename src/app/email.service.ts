import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  baseURL: string = 'https://express-water-filter-api.herokuapp.com/email/';
  constructor(private http: HttpClient) {}

  sendMessage(body: {
    email: any;
    first_name: any;
    last_name: any;
    city: any;
    phone: any;
  }) {
    let headers = {
      'Content-Type': 'application/json',
    };
    let theBody = JSON.stringify(body);
    console.log(theBody, 'the body...........');
    return this.http.post(this.baseURL, theBody, {
      headers: headers,
    });
  }
}
