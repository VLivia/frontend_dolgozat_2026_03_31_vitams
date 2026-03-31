/*
* File: products.ts
* Author: Varga Livia
* Copyright: 2026, Varga Livia
* Group: Szoft II-E
* Date: 2026 03 31
* Github:
* Licenc: MIT
*/

import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  imports: [],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {
  private readonly http = inject(HttpClient);

  products: Array<{ id: number; name: string; form: string; price?: number | string }> = [];
  errorMessage = '';

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.http.get<{ success: boolean; data: Array<{ id: number; name: string; form: string; price?: number | string }> }>('http://localhost:8000/api/products').subscribe({
      next: (result) => {
        this.products = result.data;
        this.errorMessage = '';
      },
      error: () => {
        this.products = [];
        this.errorMessage = 'A termekek betoltese sikertelen.';
      }
    });
  }
}
