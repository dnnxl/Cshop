import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private create() {
    return this.db.list('/shopping-cart').push({
      dateCreated: new Date().getTime()
    });

  }

  private getCart(cartId: string) {
    return this.db.object('/shopping-cart/' + cartId);
  }

  private async getOrCreateCart() {
    let cartId = localStorage.getItem('cartId');
    if (!cartId) {
      let result = await this.create();
      localStorage.setItem('cartId', result.key);
      return this.getCart(result.key);
    }
    return this.getCart(cartId);
  }
}