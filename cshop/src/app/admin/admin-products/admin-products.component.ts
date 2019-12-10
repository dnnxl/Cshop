import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Subscription } from 'rxjs/Subscription';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  products; // Product[]
  filteresdProducts;
  subscription: Subscription;

  constructor(private productService: ProductService) {
  this.subscription =  this.productService.getAll().snapshotChanges().subscribe(products => this.filteresdProducts = this.products = products);
    
    console.log("Productos");
    console.log(this.filteresdProducts);
   }

  ngOnInit() {
  }

  filter(query: string){
    this.filteresdProducts = (query) ?
      this.products.filter(p => p.payload.val().title.toLowerCase().includes(query.toLowerCase())):
      this.products;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
