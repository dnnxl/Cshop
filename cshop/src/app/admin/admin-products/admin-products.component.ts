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

  products;
  filteresdProducts;
  subscription: Subscription;

  constructor(private productService: ProductService) {
  this.subscription =  this.productService.getAll().snapshotChanges().subscribe(products => this.filteresdProducts =this.products= products);
  /*for (let entry of this.filteresdProducts) {
    var tmp : Product = {title: entry.payload.val().title, price: entry.payload.val().price,
    category: entry.payload.val().category, imageUrl:entry.payload.val().imageUrl};
    this.products.push(tmp);
    console.log("Tmp");

    console.log(tmp);
  }*/
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
