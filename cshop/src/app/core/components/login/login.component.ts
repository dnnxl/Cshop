import { AuthService } from '../../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  constructor(private afAuth: AuthService) { }

  login(){
    this.afAuth.login();
  }
}
