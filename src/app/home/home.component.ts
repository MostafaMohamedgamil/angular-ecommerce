import { Component } from '@angular/core';
import { AllproductService } from '../shared/services/allproduct.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  days: number = 3;
  hours: number = 23;
  minutes: number = 19;
  seconds: number = 56;

  allproduct: any[] = [];
  constructor(private _AllProduct: AllproductService, private title: Title) {
    this.setTitle('Home Page');
    _AllProduct.getAllProducts().subscribe({
      next: (res) => {
        this.allproduct = res.data;
      },
      error: (err) => {
        console.log(`err`, err);
      },
    });
  }
  setTitle(newTitle: string) {
    this.title.setTitle(newTitle);
  }
  ngOnInit(): void {
    setInterval(() => {
      this.seconds--;
      if (this.seconds < 0) {
        this.seconds = 59;
        this.minutes--;
        if (this.minutes < 0) {
          this.minutes = 59;
          this.hours--;
          if (this.hours < 0) {
            this.hours = 23;
            this.days--;
          }
        }
      }
    }, 1000);
  }
}
