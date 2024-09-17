import { Component } from '@angular/core';
import { CartService } from './../shared/services/cart.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent {
  cartDetails: any = null;

  constructor(private _CartService: CartService) { }

  ngOnInit(): void {
    this._CartService.getLoggedUserCart().subscribe({
      next: (res) => {
        this.cartDetails = res.data;
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  form: FormGroup = new FormGroup({
    details: new FormControl(null, Validators.required),
    phone: new FormControl(null, Validators.required),
    city: new FormControl(null, Validators.required),
    payment: new FormControl(null, Validators.required)
  });

  navigateToPage(url: string) {
    window.location.href = url
  }


  handelSubmit() {
    if (this.form.invalid) {
      return console.log('invalid form');
    }
    console.log(this.form.value);
    // return console.log(shippingAddress.value);
    if (this.form.value.payment == 'bank') {
      this._CartService
        .onlinePayment(this.form.value, '66d6dc14832c8800a83eaee9')
        .subscribe({
          next: (res: any) => {
            this.navigateToPage(res.session.url)
            console.log('res.session.url', res.session.url);
          },
          error: (err) => {
            console.log(err);
          },
        });
    }
else{
  
}
  }
}
