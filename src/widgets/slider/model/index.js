import Swiper from "swiper";
//import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Card } from "../../../entities/card/index.js"
import { AddToCart } from "../../../features/addToCart/index.js"
import addToCartModel from "../../../features/addToCart/model/index.js";

export default class SliderModel {

  static Selectors = {
    swiperSelector: ".swiper",
    nextBtnSelector: ".swiper-buttonNext",
    prevBtnSelector: ".swiper-buttonPrev"
  }

  constructor() {
      this.swiper = new Swiper(".mySwiper", {
        slidesPerView: "auto",
        spaceBetween: 32,
        loop: true,
      });
    
    this.swiper = document.querySelector(SliderModel.Selectors.swiperSelector);
    if (this.swiper) {
      this.swiper = this.swiper.swiper;
      this.btnNext = document.querySelector(SliderModel.Selectors.nextBtnSelector);
      this.btnPrev = document.querySelector(SliderModel.Selectors.prevBtnSelector);
      this.init()
    }
  }

  runFeatures = async() => {
    new addToCartModel()
  }

  async getCards() {
    try {
        const response = await fetch("http://localhost:5173/index.html");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Ошибка при работе с API:", error);
        throw error;
    }
  }

  cardParse(cards) {
    const oldCards = document.querySelectorAll(".card");
    oldCards.forEach(element => {
        element.remove();
    });

    const wrapper = document.querySelector(".swiper-wrapper")

    cards.forEach((card) => {
      wrapper.insertAdjacentHTML("beforeend", `
      <div class="swiper-slide">
        ${Card({
        imageSrc: card.imageSrc,
        label: card.label,
        productName: card.productName,
        idProduct: card.idProduct,
        children: AddToCart({
            extraAttrs: {
                "id": "btn",
            },
            extraClasses: {
                inCart: true,
            }
        })
      })}
      </div>`)
    })
  }

  nextSlide() {
    this.swiper.slideNext()
    console.debug("next slide")
  }

  prevSlide() {
    this.swiper.slidePrev()
    console.debug("prev slide")
  }

  init() {
    this.nextSlide = this.nextSlide.bind(this);
    this.prevSlide = this.prevSlide.bind(this);
    this.btnNext.addEventListener("click", this.nextSlide);
    this.btnPrev.addEventListener("click", this.prevSlide);

    this.getCards()
    .then(data => {
        this.cardParse(data)
        this.runFeatures()
    })
    .catch(error => {
        console.error("Произошла ошибка:", error);
    });

  }

}