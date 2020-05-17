import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from './../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private authService: AuthenticateService,
  ) { }

  ngOnInit() {
    
  }

}
