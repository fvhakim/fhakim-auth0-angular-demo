import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-login-options',
  templateUrl: './login-options.component.html',
  styleUrls: ['./login-options.component.css']
})
export class LoginOptionsComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }
  loginWithRedirectIndividual()
  {
    this.auth.loginWithRedirect();
  }

  loginWithRedirectABC()
  {
    this.auth.loginWithRedirect({'organization':'org_EBHY1QFeX7AFSqEa'});
  }

  loginWithRedirectADT()
  {
    this.auth.loginWithRedirect({'organization':'org_cPKo0SGbO0nrE0cn'});
  }
}
