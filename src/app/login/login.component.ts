import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private _AuthService: AuthService, private _Router: Router, private title: Title) {
    this.setTitle('Login Page');
  }
  setTitle(newTitle: string) {
    this.title.setTitle(newTitle);
  }
  isLoadind: boolean = false;
  apiError: string = ""
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-d0-9]{5,10}$/)]), //E12345
  });

  handelLogIn(loginForm: FormGroup) {
    this.isLoadind = true;
    if (loginForm.valid) {
      //register
      this._AuthService.login(loginForm.value).subscribe({
        next: (res) => {
          if (res.message === "success") {
            localStorage.setItem('token', res.token);
            // save name and email in localStorage to use it in account settings
            localStorage.setItem('userData', JSON.stringify(res.user));
            this._AuthService.decodeUserData();
            this.isLoadind = false;
            this._Router.navigate(['/home']);
          }
        },
        error: (err) => {
          this.isLoadind = false;
          this.apiError = err.error.errors.msg
          console.log("err", err)
        }
      })
    }
  }
}
