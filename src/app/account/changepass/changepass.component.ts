import { Component } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-changepass',
  templateUrl: './changepass.component.html',
  styleUrl: './changepass.component.scss'
})
export class ChangepassComponent {
  constructor(private _Auth: AuthService, private _toastr: ToastrService, private title: Title) {
    this.setTitle('Change Pass');
  }
  setTitle(newTitle: string) {
    this.title.setTitle(newTitle);
  }
  passForm: FormGroup = new FormGroup({
    currentPassword: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Z][a-d0-9]{5,10}$/),
    ]), //A123a0
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Z][a-d0-9]{5,10}$/),
    ]), //A123a0
    rePassword: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Z][a-d0-9]{5,10}$/),
    ]),
  })

  updatePassword() {
    if (this.passForm.valid) {
      this._Auth.updateUserPass(this.passForm.value).subscribe({
        next: (res) => {
          console.log("res Pass Data", res);
          this.passForm.reset()
          this._toastr.success('Password Changes', res.message);
        },
        error: (err) => {
          console.log("err Pass ", err);
          this._toastr.error('Error has been occured', err.message);
        }
      })
    }
  }
}
