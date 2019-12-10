import { Subscription } from 'rxjs/Subscription';
import { ShoppingCartService } from './../shopping-cart.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, RootRenderer, OnDestroy } from '@angular/core';
import { ProductService } from '../services/product.service';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {


  products$ = [];
  category: string;
  filteredProducts;
  cart: any;
  subscription: Subscription;

  constructor(
    route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService
  ) {

    //this.products$ = productService.getAll().valueChanges().subscribe;

    this.productService
      .getAll().snapshotChanges()
      .switchMap(
        products => {
          this.products$ = products;
          return route.queryParamMap;
        })

      .subscribe(params => {
        this.category = params.get('category');

        this.filteredProducts = (this.category) ?
          this.products$.filter(p => p.payload.val().category === this.category) :
          this.products$;
      });

    
  }

  async ngOnInit() {
    this.subscription = (await this.shoppingCartService.getCart()).valueChanges().subscribe(cart => this.cart = cart);

  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}