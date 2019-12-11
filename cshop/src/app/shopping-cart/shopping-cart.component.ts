import { ShoppingCart } from './../models/shopping-cart';
import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  shoppingCartItemCount: number;
  cart$;
  cartElem: Array<ShoppingCart> = new Array<ShoppingCart>();
  total = 0;
  constructor(private shoppingCartService: ShoppingCartService) {
    this.shoppingCartItemCount = 0;

  }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();

    this.shoppingCartItemCount = 0;
    this.cart$.valueChanges().subscribe((cart: any) => {
      this.shoppingCartItemCount = 0;
      for (let productId in cart.items) {
        this.shoppingCartItemCount += cart.items[productId].quantity;
        console.log("Quantity " + cart.items[productId].product.title);
        if (cart.items[productId].quantity != 0) {
          var tmp = new ShoppingCart(cart.items[productId].product.title,
            cart.items[productId].quantity,
            cart.items[productId].product.imagenUrl,
            cart.items[productId].product.category,
            cart.items[productId].product.price);
          this.total = tmp.total + this.total;
          this.cartElem.push(tmp);
        }
      }
    });
  }
}