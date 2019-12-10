import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  getAll()
  {
    return this.db.list('/products');
  }

  create(product){
    this.db.list('/products').push(product);
  }

  get(productId){
    return this.db.object('/products/'+productId);
  }

  update(productId, product){
    this.db.object('/products/'+productId).update(product);
  }

  delete(productId){
    return this.db.object('/products/'+productId).remove();
  }
}
