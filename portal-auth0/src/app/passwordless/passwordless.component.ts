import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpMethod } from '@auth0/auth0-angular';
import {HttpClient} from '@angular/common/http';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Inject} from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-passwordless',
  templateUrl: './passwordless.component.html',
  styleUrls: ['./passwordless.component.css']
})
export class PasswordlessComponent implements OnInit {

  user: {'email':''}  ;

  constructor(private router: Router, public auth: AuthService, public dialogRef: MatDialogRef<PasswordlessComponent>, private http: HttpClient, @Inject(MAT_DIALOG_DATA) public data: any)
   { 
    this.user = {'email':''}  ; 
   }

  ngOnInit(): void {
  }

  passwordless(newUser:any)
  {
       
    const json = '{ "client_id": "GlaCN55wdPF9REUuC1WDSJ8dH4NpDX7M","connection": "email", "email": "' + newUser['email'] + '", "send": "link", "authParams": { "scope": "openid", "state": "I_LOVE_OKTA", "response_type" : "code", "redirect_uri" : "http://localhost:4200/callback/dummie-login"}}';
    const body = JSON.parse(json);
    
    console.log(json);

    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');

    this.http.post('https://fhakim-demo.us.auth0.com/passwordless/start', body, {headers}).subscribe((result) => console.log(result));
    
    this.dialogRef.close();
       
  }
}