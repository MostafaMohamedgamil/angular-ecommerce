import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrl: './myprofile.component.scss'
})
export class MyprofileComponent {
  constructor(private _Auth: AuthService, private toastr: ToastrService, private title: Title) {
    this.setTitle('My Profile');
  }

  setTitle(newTitle: string) {
    this.title.setTitle(newTitle);
  }

  form: FormGroup = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(16),
    ]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    phone: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^01[0125][0-9]{8}$/),
    ]),
  });

  updateData(form: FormGroup) {
    if (form.valid) {
      console.log("Form Data: ", form.value); // عرض البيانات قبل الإرسال
      this._Auth.updateUserData(form.value).subscribe({
        next: (res) => {
          this.toastr.success('Data Has Updated!', res.message);
          // يمكنك هنا تحديث localStorage
        },
        error: (err) => {
          this.toastr.error('Data Has Error', err.message || 'Unknown error occurred');
        }
      })
    } else {
      console.log("Form is invalid", form); // عرض بيانات النموذج في حال كان غير صالح
    }
  }

  ngOnInit(): void {
    console.log("form", this.form);
    this.form.patchValue(
      JSON.parse(localStorage.getItem('userData') || ''))
  }
}
