import { Component, OnInit } from '@angular/core';
import { FakeStoreService } from '../../services/fake-store.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})


export class ProductListComponent implements OnInit {
  products: any[] = [];
  categories: any[] = [];
  selectedCategory: string = '';


  constructor(private fakeStoreService: FakeStoreService) { }

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
  }

  // Cargar todas las categorías
  loadCategories(): void {
    this.fakeStoreService.getCategories().subscribe((data: any) => {
      this.categories = data;
    });
  }

  // Cargar todos los productos o por categoría seleccionada
  loadProducts(category: string = ''): void {
    if (category) {
      this.fakeStoreService.getProductsByCategory(category).subscribe((data: any) => {
        this.products = data;
      });
    } else {
      this.fakeStoreService.getProducts().subscribe((data: any) => {
        this.products = data;
      });
    }
  }

  // Método para seleccionar una categoría
  onCategorySelect(category: string): void {
    this.selectedCategory = category;
    this.loadProducts(category);
  }
  currentPage: number = 1;
  itemsPerPage: number = 5; 

// Método para cargar más productos al hacer scroll
  loadMoreProducts(): void {
    this.fakeStoreService.getProducts().subscribe((data: any) => {
      const nextProducts = data.slice(this.currentPage * this.itemsPerPage, (this.currentPage + 1) * this.itemsPerPage);
      this.products = [...this.products, ...nextProducts];
      this.currentPage++;
    });
  }
}
