import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';

import { AppUser } from '../models/app-user';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  save(user: firebase.User){
    this.db.object('/users/'+user.uid).update({
      name: user.displayName,
      email: user.email
    });
  }

  get(uid:string):AngularFireObject<AppUser>{
    return this.db.object('/users/'+uid);
    }
}