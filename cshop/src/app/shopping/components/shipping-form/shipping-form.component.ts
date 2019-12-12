import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { OrderService } from '../../../shared/services/order.service';
import { Subscription } from 'rxjs/Subscription';
import { Order } from '../../../shared/models/order';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit {
  @Input("cart") cart;
  shipping = {}; 
  userId: string;
  userSubscripton: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService,
  ) { }

  ngOnInit() {
    this.userSubscripton = this.authService.user$.subscribe(user => this.userId = user.uid);

  }
  
  async placeOrder() {

    let order = new Order(this.userId, this.shipping, this.cart);
    let result:any = await this.orderService.storeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }  

  ngOnDestroy(){
    this.userSubscripton.unsubscribe();
  }
}
