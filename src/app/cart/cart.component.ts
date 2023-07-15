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

  paymentHandler: any = null;

  paymentSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Order placed successfully' });
  }

  paymentFailure() {
    this.messageService.add({ severity: 'danger', summary: 'error', detail: 'Error in generating Stripe Payment Gateway' });
  }
  
  //make payment function
  makePayment(amount: any) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51NQoOgSIF8NYMtoSsE3ybqgFcjiafBmE6SgRG0LOoz02qHSXlYDYWfB0wcZzauNoi8fpI8CJ7WQCOqcIeBJG72Pf00sQlgKl12',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken);
        this.paymentSuccess();
      }
    });
    paymentHandler.open({
      name: 'Order',
      description: 'Order Details',
      amount: amount,
    });
  }

  //invoking stripe payment
  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51NQoOgSIF8NYMtoSsE3ybqgFcjiafBmE6SgRG0LOoz02qHSXlYDYWfB0wcZzauNoi8fpI8CJ7WQCOqcIeBJG72Pf00sQlgKl12',
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken);
            this.paymentFailure();
          }
        });
      }
      window.document.body.appendChild(script);
    }
  }

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

  showRemove() {
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
      this.showRemove();
      setTimeout(() => { this.router.navigate(['/cart']); }, 1000);
    }
    item.quantity--;
    this.cartService.updateCart(item);
  }

  delete(deleteItem: Cart) {
    this.cartService.removeItemFromCart(deleteItem).subscribe(
      () => console.log(deleteItem.id));
    this.showRemove();
    this.ngOnInit();
  }

  ngOnInit(): void {
    this.invokeStripe();
    this.cartService.getCartItems().subscribe(
      (response) => {
        this.cart = response;
        console.log(this.cart);
      });
  }
}
