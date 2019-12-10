import { ShoppingCart } from './models/shopping-cart';
import { ShoppingItem } from './models/shopping-item';
import { ProductService } from 'src/app/services/product.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/take';
import { Observable } from 'rxjs/Observable';

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

  async getCart() {
    let cartId = await this.getOrCreateCart();
    return this.db.object('/shopping-cart/' + cartId);
  }

  private async getOrCreateCart(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  private getItem(cartId: string, productId: string){
    return this.db.object('/shopping-cart/'+cartId+'/items/'+productId);
  }

  async addToCart(product) {
    this.updateItemQuantity(product, 1);
  }


  async removeFromCart(product){
    this.updateItemQuantity(product, -1);

  }

  private async updateItemQuantity(product, change: number){
    let cartId = await this.getOrCreateCart();
    let items$ = this.getItem(cartId,product.key); 
    items$.valueChanges().take(1).subscribe( (item:any) => {
      if( item === null ) {
        items$.update({product: {title: product.payload.val().title,
                              price: product.payload.val().price,
                              imagenUrl: product.payload.val().imagenUrl,
                              category: product.payload.val().category}, quantity:  1});
        console.log('adding new product to cart');
      }else{
        items$.update({quantity: item.quantity + change});
        console.log('updating exisiting product ');
      }
    });
  }
}