import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Products } from 'src/models/products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  produstsurl : string = "http://localhost:3000/products";

  getProducts() {
    return this.http.get<Products[]>(this.produstsurl);
  }

}
