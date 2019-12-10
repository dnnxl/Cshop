import { ShoppingCartService } from './../shopping-cart.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent  {
  @Input('product') product;
  @Input('show-actions') showActions = true;
  constructor(private cartService: ShoppingCartService) { }

  addToCart(product){
    this.cartService.addToCart(product);
  }

}
