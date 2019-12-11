import { ShoppingItem } from './shopping-item';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

export class ShoppingCart{
    public title;
    public quantity;
    public imagenUrl;
    public category;
    public price;
    constructor(pTitle, pQuantity, pImage, pCategory, pPrice){
        this.title = pTitle;
        this.quantity = pQuantity;
        this.imagenUrl = pImage;
        this.category = pCategory;
        this.price = pPrice;
    }

    
}