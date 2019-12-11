import { ShoppingCartService } from './../shopping-cart.service';
import { AuthService } from '../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AppUser } from '../models/app-user';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit{

  appUser: AppUser;
  shoppingCartItemCount: number;
  constructor(private auth: AuthService,
    private shoppingCartService: ShoppingCartService) { 

  }

  logout(){
    this.auth.logout();
  }

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    let cart$ = await this.shoppingCartService.getCart();

    this.shoppingCartItemCount = 0;
    cart$.valueChanges().subscribe((cart:any) => {
      this.shoppingCartItemCount = 0;
      for(let productId in cart.items){
        this.shoppingCartItemCount += cart.items[productId].quantity;
        console.log("Quantity " + cart.items[productId].quantity);

      }
    });

  }
}