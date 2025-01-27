import { CommonModule } from '@angular/common';
import {
  Component,
  // CUSTOM_ELEMENTS_SCHEMA,
  Input,
  OnInit,
} from '@angular/core';

// swiper
// import { SwiperModule } from 'swiper/angular';
// import { register } from 'swiper/element/bundle';
// register();

@Component({
  selector: 'app-swiper-slider',
  // imports: [CommonModule],
  // imports: [CommonModule, SwiperModule],
  templateUrl: './swiper-slider.component.html',
  styleUrl: './swiper-slider.component.scss',
  standalone: true,
})
export class SwiperSliderComponent {
  @Input() images: string[] = [];
  @Input() swiperOptions: any = {};

  constructor() {}

  ngOnInit(): void {
    // set default swiper options
    if (!this.swiperOptions) {
      this.swiperOptions = {
        slidesPerView: 1,
        spaceBetween: 10,
        loop: true,
        autoplay: {
          delay: 5000,
        },
        pagination: {
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      };
    }
  }
}
