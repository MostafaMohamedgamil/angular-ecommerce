import { Component } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-allorder',
  templateUrl: './allorder.component.html',
  styleUrl: './allorder.component.scss'
})
export class AllorderComponent {

  constructor(private _AuthService: AuthService,private title:Title) {
    this.setTitle('All Orders');
   }
   setTitle(newTitle: string) {
    this.title.setTitle(newTitle);
  }
  ngOnInit(): void {
    this.allorders()
  }
  orders: any;
  allorders() {
    this._AuthService.getAllOrders().subscribe({
      next: (res) => {
        this.orders = res
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
