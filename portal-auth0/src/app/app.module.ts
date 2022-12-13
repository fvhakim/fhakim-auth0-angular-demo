import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import {RouterModule} from '@angular/router';
import { AuthModule } from '@auth0/auth0-angular';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHttpInterceptor } from '@auth0/auth0-angular';
import { HttpMethod } from '@auth0/auth0-angular';
import {HttpClient} from '@angular/common/http';
import { AccountComponent } from './account/account.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';
import { FinancesComponent } from './finances/finances.component';
import { FormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PasswordlessComponent } from './passwordless/passwordless.component';
import { LoginOptionsComponent } from './login-options/login-options.component';
import { DummieLoginComponent } from './dummie-login/dummie-login.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AccountComponent,
    DashboardComponent,
    SignupComponent,
    FinancesComponent,
    PasswordlessComponent,
    LoginOptionsComponent,
    DummieLoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule,     
    AuthModule.forRoot({
      domain: 'add your domain',
      clientId: 'add your client id',
      audience: 'add your API',
      cacheLocation: 'localstorage',
      redirectUri: 'http://localhost:4200/',
      scope: 'openid profile email ',

      httpInterceptor: {
        allowedList: [
          
          {
            uri: 'https://auth0-portal-api.glitch.me/getmsg',
          } 
        ]
      },

    }),
    RouterModule.forRoot([
      { path: '', component: HomeComponent},
      { path: 'signup', component: SignupComponent},
      { path: 'account', component: AccountComponent,  canActivate: [AuthGuard]},
      { path: 'finances', component: FinancesComponent,  canActivate: [AuthGuard]},
      { path: 'dummie-login', component: DummieLoginComponent}
    ]),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true }, 
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
