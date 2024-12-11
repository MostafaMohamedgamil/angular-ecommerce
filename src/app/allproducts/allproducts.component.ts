import { Component } from '@angular/core';
import { AllproductService } from '../shared/services/allproduct.service';
import { Observable } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-allproducts',
  templateUrl: './allproducts.component.html',
  styleUrl: './allproducts.component.scss'
})
export class AllproductsComponent {
  Products: any;
  searchTerm: string = "";
  productsData$: Observable<any> | undefined;

  constructor(private _AllproductService: AllproductService, private title: Title) {
    this.setTitle('All Products');
   }

   setTitle(newTitle: string) {
    this.title.setTitle(newTitle);
  }
  
  ngOnInit(): void {
    this.productsData$ = this._AllproductService.getAllProducts()
    this.allproducts();
  }

  allproducts() {
    this._AllproductService.getAllProducts().subscribe({
      next: (res) => {
        this.Products = res.data
      },
      error: (err) => {
        console.log("err:AllproductsComponent", err);
      }
    })
  }
}
