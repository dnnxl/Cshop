import { ProductService } from '../../../shared/services/product.service';
import { CategoryService } from '../../../shared/services/category.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';
import { take } from 'rxjs-compat/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']

})
export class ProductFormComponent implements OnInit {

  categories$;
  product:any = {};
  id;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    categoryService: CategoryService, private productService: ProductService) { 
    this.categories$ = categoryService.getCategories();

    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id) 
      this.productService.get(this.id).valueChanges().take(1).subscribe(p => this.product = p);

  }

  ngOnInit() {
  }

  save(product){
    if(this.id) this.productService.update(this.id, product);
    else this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }

  delete(){
    if(!confirm('Are you sure to delete this product')) return;
    
    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
    
  }

}
