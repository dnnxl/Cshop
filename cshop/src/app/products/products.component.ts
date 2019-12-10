import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from './../category.service';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  products$ = [];
  categories$;
  category: string;
  filteredProducts;

  constructor(
    route: ActivatedRoute,
    private productService: ProductService, 
    categoryService: CategoryService) {
    //this.products$ = productService.getAll().valueChanges().subscribe;
    this.categories$ = categoryService.getCategories();

    this.productService.getAll().snapshotChanges().subscribe(products => this.filteredProducts =this.products$= products);


    route.queryParamMap.subscribe(params =>{
      this.category = params.get('category');
      this.filteredProducts = (this.category) ?
        this.products$.filter(p => p.payload.val().category === this.category) :
        this.products$;
    });
   }
}
