import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/services/cart.service';
import { Cart } from 'src/models/products';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private cartService: CartService,
    private router: Router,
    private messageService: MessageService) { }

  carts: Cart = {
    id: 0,
    title: '',
    image: '',
    price: 0,
    total: 0,
    quantity: 1
  }
  cartData: any = [];
  total: number = 0;
  quantity: number = 1;

  ShowRemoveMessage() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product removed successfully' });
  }

  TotalPrice(data: any) {
    const initialValue = 0;
    this.cartData = data
    const a = this.cartData.reduce((sum: any, item: any) => sum + (item.price * item.quantity), initialValue);
    return a;
  }

  cart: Cart[] = [];

  increase(item: Cart) {
    item.quantity++;
    this.cartService.updateCart(item);
  }

  decrease(item: Cart) {
    if (item.quantity <= 1) {
      this.delete(item)
      this.ShowRemoveMessage();
      setTimeout(() => { this.router.navigate(['/cart']); }, 1000);
    }
    item.quantity--;
    this.cartService.updateCart(item);
  }

  delete(deleteItem: Cart) {
    this.cartService.removeItemFromCart(deleteItem).subscribe(
      () => console.log(deleteItem.id));
    this.ShowRemoveMessage();
    this.ngOnInit();
  }

  ngOnInit() {
    this.cartService.getCartItems().subscribe(
      (response) => {
        this.cart = response;
        console.log(this.cart);
      }
    )
  }
}
