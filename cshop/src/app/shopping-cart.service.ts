import { ShoppingCart } from './models/shopping-cart';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/take';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'; 
import { Product } from './models/product';

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

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCart();
    console.log(cartId);
    return this.db.object('/shopping-cart/' + cartId).valueChanges()
      .map((x:any) => new ShoppingCart(x.items) );
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
    this.updateItem(product, 1);
  }


  async removeFromCart(product){
    this.updateItem(product, -1);

  }





  private async updateItem(product: Product, change: number){
    let cartId = await this.getOrCreateCart();
    let items$ = this.getItem(cartId,product.$key); 
    items$.valueChanges().take(1).subscribe( (item:any) => {
      if( item === null ) {
        console.log(product.imagenUrl);

        items$.update({title: product.title,
                       price: product.price,
                       imagenUrl: product.imagenUrl,
                       category: product.category, 
                       quantity:  1});
        console.log('adding new product to cart');
      }else{
        items$.update({quantity: item.quantity + change});
        console.log('updating exisiting product ');
      }
    });
  }

  async clearCart() {
    let cartId = await this.getOrCreateCart();
    this.db.object('/shopping-cart/'+cartId+'/items').remove();
  }
}