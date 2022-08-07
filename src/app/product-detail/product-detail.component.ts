import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../shared/product.interface';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  productDetail!: Product;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.openProductDetailObs$.subscribe((resp) => {
      this.productDetail = resp;
    });
  }
}
