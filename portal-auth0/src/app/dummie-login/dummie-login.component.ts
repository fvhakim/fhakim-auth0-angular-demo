import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-dummie-login',
  templateUrl: './dummie-login.component.html',
  styleUrls: ['./dummie-login.component.css']
})
export class DummieLoginComponent implements OnInit {

  constructor(public auth: AuthService) 
  { 
    
   // this.auth.loginWithRedirect();
  }

  ngOnInit(): void {
    this.auth.loginWithRedirect({'connection':'Okta-IdP'});
  }

}
