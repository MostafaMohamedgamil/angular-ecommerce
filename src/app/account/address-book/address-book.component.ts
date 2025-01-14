import { Component } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalModule } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-address-book',
  templateUrl: './address-book.component.html',
  styleUrl: './address-book.component.scss'
})
export class AddressBookComponent {
  allAddress: any;
  addressData$: Observable<any> | undefined;

  constructor(private _Auth: AuthService, private _toastr: ToastrService, private modalService: BsModalService, private title: Title) { 
    this.setTitle('Addresses Book');

  }

   setTitle(newTitle: string) {
    this.title.setTitle(newTitle);
  }

  modalRef?: BsModalRef;

  openModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template);
  }

  addressForm: FormGroup = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(16),
    ]),
    details: new FormControl(null, Validators.required),
    phone: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^01[0125][0-9]{8}$/),
    ]),
    city: new FormControl(null, Validators.required)
  });


  addUserAddress() {
    // this.addressData$ = this._Auth.userAddress(this.addressForm.value)
    if (this.addressForm.valid) {
      this._Auth.userAddress(this.addressForm.value).subscribe({
        next: (res) => {
          this.addressForm.reset()
          this._toastr.success('Addresses added', res.message);
          this.getUserAddress();
          if (this.modalRef) {
            this.modalRef.hide();
          }
        },
        error: (err) => {
          this._toastr.success('Error has been occured', err.message);
        }
      })
    }
  }

  getUserAddress() {
    this.addressData$=this._Auth.getUserAddress()
  }

  removeAddress(addressId: string) {
    this.addressData$ = this._Auth.removeUserAddress(addressId)
    this._Auth.removeUserAddress(addressId).subscribe({
      next: (res) => {
        // console.log(``,);
        this._toastr.success('Addresses Removed', res.message);
        this.getUserAddress()
      },
      error: (err) => {
        console.log(`err Remove`, err);
      }
    })
  }
  ngOnInit(): void {
    this.getUserAddress()
  }
}
