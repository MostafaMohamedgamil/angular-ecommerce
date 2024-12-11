import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  constructor(private _AuthService: AuthService, private _Router: Router, private title: Title) {
    this.setTitle('Sign up');
  }

  setTitle(newTitle: string) {
    this.title.setTitle(newTitle);
  }
  isLoadind: boolean = false;
  apiError: string = '';
  registerForm: FormGroup = new FormGroup({
    // Validation
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(16),
    ]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Z][a-d0-9]{5,10}$/),
    ]), //A123a0
    rePassword: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Z][a-d0-9]{5,10}$/),
    ]),
    phone: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^01[0125][0-9]{8}$/),
    ]),
  });

  handelSubmit(registerForm: FormGroup) {
    this.isLoadind = true;
    if (registerForm.valid) {
      this._AuthService.register(registerForm.value).subscribe({
        next: (res) => {
          console.log('res', res);
          if (res.message === 'success') {
            this.isLoadind = false;
            this._Router.navigate(['/login']);
          }
        },
        error: (err) => {
          this.isLoadind = false;
          this.apiError = err.error.errors.msg;
          console.log('err', err);
        },
      });
    }
  }

  ///////////////////////////////////---------OTP---------///////////////////////////////////
  //---------OTP---------

  otpForm:FormGroup = new FormGroup({
    phone: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^01[0125][0-9]{8}$/),
    ]),
  });

  handelOTP(otpForm: FormGroup){

  }
  
}
