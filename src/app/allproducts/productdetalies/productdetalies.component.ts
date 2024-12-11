import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AllproductService } from '../../shared/services/allproduct.service';
import Swiper from 'swiper';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
import { Title } from '@angular/platform-browser';
import 'swiper/css';
Swiper.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);
@Component({
  selector: 'app-productdetalies',
  templateUrl: './productdetalies.component.html',
  styleUrl: './productdetalies.component.scss'
})
export class ProductdetaliesComponent {
  productDetalis: any
  productId: any;
  imagePath: any;

  constructor(private _ActivatedRoute: ActivatedRoute, private AllproductService: AllproductService, private title: Title) { }
  setTitle(newTitle: string) {
    this.title.setTitle(newTitle);
  }

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe((params) => {
      this.productId = params.get('id');
    });

    this.AllproductService.getProductsDetails(this.productId).subscribe({
      next: (res) => {
        this.productDetalis = res.data;
        this.imagePath = this.productDetalis.imageCover
        this.setTitle(res.data.title)
      }
    })
  }
  isExpanded: boolean = false;
  toggleDescription() {
    this.isExpanded = !this.isExpanded;
  }

}
