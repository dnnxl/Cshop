import { Subscription } from 'rxjs/Subscription';
import { ShoppingCartService } from '../shared/services/shopping-cart.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, RootRenderer, OnDestroy } from '@angular/core';
import { ProductService } from '../shared/services/product.service';
import 'rxjs/add/operator/switchMap';
import { ShoppingCart } from '../shared/models/shopping-cart';
import { Product } from '../shared/models/product';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {


  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  cart$: Observable<ShoppingCart>;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService
  ) {}

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    this.populateProducts();
  }

  private populateProducts() { 
    this.productService
      .getAll().snapshotChanges()
      .switchMap((products: any) => {
        console.log(products.key);
        this.products = products.map((product: any) =>({$key: product.key, ...product.payload.val()}));
        return this.route.queryParamMap;
      })
      .subscribe(params => {
        this.category = params.get('category');
        this.applyFilter();      
      });
  }

  private applyFilter() { 
    this.filteredProducts = (this.category) ? 
    this.products.filter(p => p.category === this.category) : 
    this.products;
  }
}