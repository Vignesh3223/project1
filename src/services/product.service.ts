import { Injectable } from '@angular/core';
//HTTPClient
import { HttpClient } from '@angular/common/http';
//Products Interface
import { Products } from 'src/models/products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  //product url
  produstsurl : string = "http://localhost:3000/products";

  //function to fetch products from json
  getProducts() {
    return this.http.get<Products[]>(this.produstsurl);
  }

}
