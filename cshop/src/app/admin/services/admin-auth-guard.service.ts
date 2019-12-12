import 'rxjs/add/operator/switchMap';

import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../../shared/services/auth.service';
import { UserService } from '../../shared/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate{

  constructor(private auth: AuthService, private userService: UserService) { }

  canActivate(): Observable<boolean> {
    return this.auth.appUser$
    .map(appUser => appUser.isAdmin);
    }  
}