import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, RootRenderer } from '@angular/core';
import { ProductService } from '../services/product.service';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  products$ = [];
  category: string;
  filteredProducts;

  constructor(
    route: ActivatedRoute,
    private productService: ProductService
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
}