import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls  : ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  pageTitle: string = 'Product List!';
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  errorMessage: string;
  _listFilter : string;
  get listFilter(): string {
    return  this._listFilter;
  }

  set listFilter(value : string){
    this._listFilter = value;
    this.filteredProducts = this._listFilter ? this.performFilter(this.listFilter) : this.products;
  }

  filteredProducts: IProduct[];
  products: IProduct[] = [];

  constructor(private productService: ProductService) {

    //this.listFilter = 'cart';
  }


  onRatingClicked(message: string): void{
    this.pageTitle = 'Product List: ' + message;
  }


  performFilter(filterBy: string) : IProduct[] {
    filterBy = filterBy.toLowerCase();
    return this.products.filter(( product: IProduct) => product.productName.toLocaleLowerCase().indexOf(filterBy) != -1)
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit() : void {
    this.productService.getProducts().subscribe({
      next: products => {
         this.products = products;
         this.filteredProducts = this.products;
       },
      error :err   => this.errorMessage = err
    });
    this.filteredProducts = this.products;
  }
}
