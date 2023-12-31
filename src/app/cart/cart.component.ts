import { Component, OnInit } from '@angular/core';
//CartService from Service
import { CartService } from 'src/services/cart.service';
//Cart Interface
import { Cart } from 'src/models/products';
//router
import { Router } from '@angular/router';
//primeNG Message Service
import { MessageService } from 'primeng/api';
//sweetlaert
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  paymentHandler: any = null;

  //primeNG toast for payment success
  paymentSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Order placed successfully' });
  }

  //primeNG toast for payment failure
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

  //Cart 
  carts: Cart = {
    id: 0,
    title: '',
    image: '',
    price: 0,
    total: 0,
    quantity: 1,
    description: '',
  }

  cartData: any = [];
  total: number = 0;
  quantity: number = 1;

  //primeNG toast for product deletion
  showRemove() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product removed successfully' });
  }

  //function to calculate the total price of items in the cart
  TotalPrice(data: any) {
    const initialValue = 0;
    this.cartData = data;
    const a = this.cartData.reduce((sum: any, item: any) => sum + (item.price * item.quantity), initialValue);
    return a;
  }

  cart: Cart[] = [];

  //function to increase the quantity of items in the cart
  increase(item: Cart) {
    item.quantity++;
    this.cartService.updateCart(item);
  }

  //function to decrease the quantity of items in the cart
  decrease(item: Cart) {
    if (item.quantity <= 1) {
      this.delete(item);
      this.showRemove();
      setTimeout(() => { this.router.navigate(['/cart']); }, 1000);
    }
    item.quantity--;
    this.cartService.updateCart(item);
  }

  //function to delete items from the cart
  delete(deleteItem: Cart) {
    Swal.fire({
      title: 'Are you sure?',
      text: "Want to remove item from cart",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cartService.removeItemFromCart(deleteItem).subscribe(
          () => console.log(deleteItem.id));
        setTimeout(() => { this.ngOnInit(); }, 500);
        this.showRemove();
      }
    });

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
