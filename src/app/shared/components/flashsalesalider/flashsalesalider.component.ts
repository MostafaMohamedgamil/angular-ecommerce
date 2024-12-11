import { Component } from '@angular/core';
import { AllproductService } from '../../services/allproduct.service';

@Component({
  selector: 'app-flashsalesalider',
  templateUrl: './flashsalesalider.component.html',
  styleUrl: './flashsalesalider.component.scss',
})
export class FlashsalesaliderComponent {
 

  allproduct: any[] = [];
  constructor(private _AllproductService: AllproductService) {
    _AllproductService.getAllProducts().subscribe({
      next: (res) => {
        this.allproduct = res.data.slice(5, 10);
      },
      error: (err) => {
        console.log('err', err.data);
      },
    });
  }
}
