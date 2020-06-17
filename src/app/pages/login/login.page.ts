import { Component, OnInit } from '@angular/core';
import { AngularTokenService } from 'angular-token';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private tokenService: AngularTokenService
  ) { }

  ngOnInit() {
    
  }

  login() {
    this.tokenService.signInOAuth('google_oauth2');
  }

  logout() {
    this.tokenService.signOut().subscribe(
      (x) => console.log('Successful logout')
    );
  }

}
