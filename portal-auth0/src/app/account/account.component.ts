import { Component, OnInit } from '@angular/core';
import { AuthService, IdToken } from '@auth0/auth0-angular';
import { JwtHelperService } from "@auth0/angular-jwt";
import { HttpMethod } from '@auth0/auth0-angular';
import {HttpClient} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  id_token_raw? = '';
  id_token_decoded = '';
  id_token_expiration?: any;
  
  access_token_raw = '';
  access_token_decoded = '';
  access_token_expiration? : any;

  management_api_access_token_raw = '';
  management_api_access_token_decoded = '';
  management_api_access_token_expiration? : any;
  

  constructor(private http: HttpClient, public auth: AuthService, private jwtHelper: JwtHelperService) {

     console.log(localStorage);
    auth.idTokenClaims$.subscribe((claims) => {
      this.id_token_raw = claims?.__raw;
      this.id_token_decoded = jwtHelper.decodeToken(claims?.__raw);
      this.id_token_expiration = jwtHelper.getTokenExpirationDate(claims?.__raw);
      
 
    });

     auth.getAccessTokenSilently().subscribe((token) => {
       this.access_token_raw = token;
       this.access_token_decoded = jwtHelper.decodeToken(token);
       this.access_token_expiration = jwtHelper.getTokenExpirationDate(token);
       
     });

     auth.getAccessTokenSilently({'audience': 'https://fhakim-demo.us.auth0.com/api/v2/', 'scope': 'read:current_user '}).subscribe((token) => {
     console.log(token); 
     this.management_api_access_token_raw = token;
      this.management_api_access_token_decoded = jwtHelper.decodeToken(token);
      this.management_api_access_token_expiration = jwtHelper.getTokenExpirationDate(token);
      
    });

   }
  
  ngOnInit(): void {
  }

  getMessage(): void {

  
    this.http.get('https://auth0-portal-api.glitch.me/getmsg').subscribe(result => console.log(result));

  }
 
}
