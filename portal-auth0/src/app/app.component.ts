import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { HttpHeaders } from '@angular/common/http';
import {HttpClient} from '@angular/common/http';
import { SignupComponent } from './signup/signup.component';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { PasswordlessComponent } from './passwordless/passwordless.component';
import { LoginOptionsComponent } from './login-options/login-options.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

   orgId:any = '';

  constructor(private loginOtionsDialog: MatDialog, private passwordlessDialog: MatDialog, private signupDialog: MatDialog, private http: HttpClient,  public auth: AuthService) 
  {
     this.auth.isAuthenticated$.subscribe (result =>
   {
      if (result)
      {
        this.auth.idTokenClaims$.subscribe((claims) => {
         
         this.orgId = claims?.org_id;
         console.log (claims?.org_id);
         localStorage.setItem('orgId',this.orgId);     
         
        });
        
      }
/*
      else
      {
        const headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json');
        const jsonBodyGuestUser = '{"client_id":"bf1qLKnooGrB8xdNuW2QpaoXg6uJ3Oiy","client_secret":"tFVLSqtQGv2WEtrHDAApg9MOzKeb8EI_O4zlLAnN3fobIAnHDoumYSop7XuwCEJ2","audience":"https://auth0-portal-api.glitch.me/","grant_type":"client_credentials", "guest_name":"Adam Smith", "id":"1213"}';
        const bodyGuestUser = JSON.parse(jsonBodyGuestUser);
        this.http.post('https://fhakim-demo.us.auth0.com/oauth/token', bodyGuestUser, {headers}).subscribe((result) => 
          {
             console.log(result);
          });
      }
*/
   });


  }

  title = 'portal-auth0';

  loginWithRedirect(): void {
    // Call this to redirect the user to the login page
   // this.auth.loginWithRedirect(); //B2C
   // this.auth.loginWithRedirect({'organization':'org_EBHY1QFeX7AFSqEa'});  //ABC
   // this.auth.loginWithRedirect({'organization':'org_cPKo0SGbO0nrE0cn'}); //ADT
   //this.auth.loginWithPopup();

   this.loginOtionsDialog.open(LoginOptionsComponent, 
    {
      data: { },
      width: '500px'
    });
    this.passwordlessDialog.afterAllClosed.subscribe(result => 
      {
     console.log(result);
      });  


//this.auth.loginWithRedirect({'connection':'Okta-IdP'});

  }

  logout(): void {

    this.auth.logout({ returnTo: 'http://localhost:4200'});
   //window.location.href = "https://fhakim-demo.us.auth0.com/v2/logout?returnTo=http://localhost:4200&client_id=GlaCN55wdPF9REUuC1WDSJ8dH4NpDX7M";
   localStorage.setItem('orgId',''); 

  }


  loginPasswordless(): void {

    this.passwordlessDialog.open(PasswordlessComponent, 
      {
        data: { },
        width: '500px'
      });
      this.passwordlessDialog.afterAllClosed.subscribe(result => 
        {
       console.log(result);
        });  

  

  }

  signup(): void {

   
    this.signupDialog.open(SignupComponent, 
      {
        data: { },
        width: '500px'
      });
      this.signupDialog.afterAllClosed.subscribe(result => 
        {
       console.log(result);
        });  

  }

}
