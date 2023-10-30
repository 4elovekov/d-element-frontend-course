import Swiper from "swiper";
//import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default class SliderModel {

  static Selectors = {
    swiperSelector: ".swiper",
    nextBtnSelector: ".swiper-button-next",
    prevBtnSelector: ".swiper-button-prev"
  }

  constructor() {
      this.swiper = new Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
    
    this.swiper = document.querySelector(SliderModel.Selectors.swiperSelector);
    if (this.swiper) {
      this.swiper = this.swiper.swiper;
      this.btnNext = document.querySelector(SliderModel.Selectors.nextBtnSelector);
      this.btnPrev = document.querySelector(SliderModel.Selectors.prevBtnSelector);
      this.init()
    }
  }

  nextSlide() {
    this.swiper.slideNext()
  }

  prevSlide() {
    this.swiper.slidePrev()
  }

  init() {
    this.nextSlide = this.nextSlide.bind(this);
    this.prevSlide = this.prevSlide.bind(this);
    this.btnNext.addEventListener("click", this.nextSlide);
    this.btnPrev.addEventListener("click", this.prevSlide);
  }

}