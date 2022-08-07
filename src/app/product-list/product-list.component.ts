import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductService } from '../services/product.service';
import { Product } from '../shared/product.interface';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('productDetail') productDetail!: ProductDetailComponent;

  constructor(private productService: ProductService) {}

  displayedColumns: string[] = ['id', 'blend_name', 'origin', 'intensifier'];
  dataSource = new MatTableDataSource<Product>();
  products: Product[] = [];
  selectedProduct!: Product;

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((resp) => {
      this.products = resp;
      if (this.products?.length > 0) {
        this.dataSource.data = this.products;
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  selectProduct(product: Product) {
    this.productService.openProductDetail(product);
  }
}
