import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { ShoppingCartService } from './shopping-cart.service';
import { getObservableFromList } from "./extensions/firebase-extensions";
import { Observable } from 'rxjs/Observable';
import { Order } from './models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase, private shoppingCartService: ShoppingCartService) { }

  async storeOrder(order){
    let result = await this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }

  getOrders():Observable<Order[]>  { 
    let list = this.db.list('/orders', ref => ref.orderByChild('userId'));
    return getObservableFromList(list);
  }

  getOrdersByUser(userId: string): Observable<Order[]> {
    let list = this.db.list('/orders', ref => ref.orderByChild('userId').equalTo(userId));
    return getObservableFromList(list);
    }
}
