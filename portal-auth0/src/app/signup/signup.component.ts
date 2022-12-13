import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpMethod } from '@auth0/auth0-angular';
import {HttpClient} from '@angular/common/http';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Inject} from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user: {'firstName':'','lastName':'', 'email':'', 'password':'' }  ;
  
  constructor( private router: Router, public auth: AuthService, public dialogRef: MatDialogRef<SignupComponent>, private http: HttpClient, @Inject(MAT_DIALOG_DATA) public data: any) {
   
    this.user = {'firstName':'','lastName':'', 'email':'', 'password':'' }  ; 


   }

  ngOnInit(): void {
  }

  signup(newUser:any)
  {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');

    const jsonSignup = '{"client_id": "GlaCN55wdPF9REUuC1WDSJ8dH4NpDX7M", "email": "' + newUser['email'] + '", "password": "' + newUser['password'] + '", "connection": "Username-Password-Authentication", "username": "' + newUser['email']+ '", "given_name": "' + newUser['firstName'] + '", "family_name": "' + newUser['lastName'] + '" , "name": "' +newUser['firstName'] + ' ' + newUser['lastName'] + '"}';
    const bodySignup = JSON.parse(jsonSignup);
   

    this.http.post('https://fhakim-demo.us.auth0.com/dbconnections/signup', bodySignup, {headers}).subscribe((result) => 
    {
      console.log(result);
      this.dialogRef.close('bye!');
      this.auth.loginWithRedirect({ login_hint: newUser['email']});

      /*
      const jsonSignin = '{"grant_type": "password","username": "' + newUser['email'] + '","password": "' + newUser['password'] + '","client_id": "GlaCN55wdPF9REUuC1WDSJ8dH4NpDX7M","client_secret": "GSUzRthF1n4kfXd4HcgmCb9WTdE5WKeIZ4KDhSEvZAsyia1pEVCNk1bj7xwFiE3T","scope" : "openid", "redirect_uri" : "http://localhost:4200/callback"}';
      const bodySignin = JSON.parse(jsonSignin);
      this.http.post('https://fhakim-demo.us.auth0.com/oauth/token', bodySignin, {headers}).subscribe((result) => {
        
      console.log(result);
      console.log('#######################################');
      
       
     
      type ObjectKey = keyof typeof result;
       const id_token = 'id_token' as ObjectKey;
       console.log(result[id_token]);
    });
    
    */


    });
    
   
    

  }

  /*
  private _setSession(authResult, profile) {
    const expTime = authResult.expiresIn * 1000 + Date.now();
    // Save authentication data and update login status subject
    localStorage.setItem('expires_at', JSON.stringify(expTime));
    this.accessToken = authResult.accessToken;
    this.userProfile = profile;
    this.authenticated = true;
  }

*/
  


 

}
