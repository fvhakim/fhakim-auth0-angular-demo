import { Component, OnInit } from '@angular/core';
import { AuthService, IdToken } from '@auth0/auth0-angular';
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
  selector: 'app-finances',
  templateUrl: './finances.component.html',
  styleUrls: ['./finances.component.css']
})
export class FinancesComponent implements OnInit {

  orgId:any = '';

  constructor(public auth: AuthService, private jwtHelper: JwtHelperService) { 

    this.orgId = localStorage.getItem('orgId');
  
    auth.idTokenClaims$.subscribe((claims) => {

      console.log(claims?.amr);
      if (claims?.amr === undefined)
      {

        if(this.orgId !== 'org_cPKo0SGbO0nrE0cn' && this.orgId !== 'org_EBHY1QFeX7AFSqEa' )
        {
        
          auth.loginWithRedirect({
            acr_values: 'http://schemas.openid.net/pape/policies/2007/06/multi-factor',  
            appState: { target: '/finances' }
            }); 
            
            
        }
        else
        {
          auth.loginWithRedirect({
            organization: this.orgId ,
            acr_values: 'http://schemas.openid.net/pape/policies/2007/06/multi-factor',  
            appState: { target: '/finances' }
            }); 
          
        }
            
      }
      });
      
     

    }
    

  ngOnInit(): void {
  }

}
