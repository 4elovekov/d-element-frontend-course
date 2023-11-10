import myStore from "../../../shared/config/zustandStore";

export default class addToCartModel {
  static Selectors = {
    defaultBtnSelector: ".btn--inCart",
    listeningBtnSelector: "data-js-addtocart-btn",
  };

  constructor() {
    this.btns = Array.from(document.querySelectorAll(`${addToCartModel.Selectors.defaultBtnSelector}`));
    this.init();
  }

  isInZus(arr, num) {
    const index = arr.indexOf(num);
    if (index !== -1) {
      return index
    } else {
      return false
    }
  }

  addToZus(idProduct) {
    const { getState } = myStore;
    if (!this.isInZus(getState().ids, Number(idProduct))) {
      getState().addId(Number(idProduct))
    }
  }

  removeFromZus(idProduct) {
    const { getState } = myStore;
    const index = this.isInZus(getState().ids, Number(idProduct));
    if (index) {
      getState().removeId(index);
    }
  }

  isClicked(btn) {
    if (btn.getAttribute("data-js-addtocart-btn") == "clicked") {
      btn.setAttribute(addToCartModel.Selectors.listeningBtnSelector, "");
      btn.querySelector(".btn__label").textContent = "В корзину";
      return true
    } else {
      btn.setAttribute(addToCartModel.Selectors.listeningBtnSelector, "clicked");
      btn.querySelector(".btn__label").textContent = "Удалить из корзины";
      return false
    }
  }

  clickHandler(event) {
    const btn = event.target.closest("[data-js-addtocart-btn]")
    const card = event.target.closest("[data-js-card]");
    const idProduct = card.getAttribute("data-js-idproduct");
    if (this.isClicked(btn)) {
      this.removeFromZus(idProduct)
    } else {
      this.addToZus(idProduct);
    }
  }

  addListeningAttribute(btns) {
    btns.forEach((btn) => {
      if (!btn.hasAttribute(addToCartModel.Selectors.listeningBtnSelector)) {
        btn.setAttribute(addToCartModel.Selectors.listeningBtnSelector, "");
      }
    });
  }

  pageLoad(btn, idProduct) {
    const { getState } = myStore;
    if (!this.isInZus(getState().ids, Number(idProduct)) == false) {
      btn.setAttribute(addToCartModel.Selectors.listeningBtnSelector, "clicked");
      btn.querySelector(".btn__label").textContent = "Удалить из корзины";
      
    }
  }

  init() {
    this.addListeningAttribute(this.btns)
    this.clickHandler = this.clickHandler.bind(this);
    this.btns.forEach((btn) => {
      const card = btn.closest("[data-js-card]");
      const idProduct = card.getAttribute("data-js-idproduct");
      this.pageLoad(btn, idProduct);
      btn.addEventListener("click", this.clickHandler);
    });
  }
}
