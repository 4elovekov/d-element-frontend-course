import myStore from "../../../shared/lib/zustandStore";

export default class addToCartModel {
  static Selectors = {
    defaultBtnSelector: ".btn--inCart",
    listeningBtnSelector: "data-js-addtocart-btn",
  };

  constructor() {
    this.btns = Array.from(
      document.querySelectorAll(
        `${addToCartModel.Selectors.defaultBtnSelector}`
      )
    );
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

  addToLocal(idProduct) {
    const data = JSON.parse(localStorage.getItem("idProduct"));
    if (data.id.indexOf(idProduct) == -1) {
      data.id.push(idProduct);
    }
    localStorage.removeItem("idProduct");
    localStorage.setItem("idProduct", JSON.stringify(data))

    const { getState } = myStore;
    if (!this.isInZus(getState().ids, Number(idProduct))) {
      getState().addId(Number(idProduct))
    }
    console.debug(getState().ids)
  }

  removeFromLocal(idProduct) {
    const data = JSON.parse(localStorage.getItem("idProduct"));
    const indexToRemove = data.id.indexOf(idProduct);
    data.id.splice(indexToRemove, 1);
    localStorage.removeItem("idProduct");
    localStorage.setItem("idProduct", JSON.stringify(data))

    const { getState } = myStore;
    const index = this.isInZus(getState().ids, Number(idProduct));
    if (index) {
      getState().removeId(index);
    }
    console.debug(getState().ids)
  }

  clickedCheck(btn) {
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
    if (this.clickedCheck(btn)) {
      this.removeFromLocal(idProduct)
    } else {
      this.addToLocal(idProduct);
    }
    console.debug("local in clickHandler: ", localStorage.getItem("idProduct"))
  }

  addListeningAttribute(btns) {
    btns.forEach((btn) => {
      if (!btn.hasAttribute(addToCartModel.Selectors.listeningBtnSelector)) {
        btn.setAttribute(addToCartModel.Selectors.listeningBtnSelector, "");
      }
    });
  }

  init() {
    const { getState } = myStore;
    this.addListeningAttribute(this.btns)
    this.clickHandler = this.clickHandler.bind(this);
    this.btns.forEach((btn) => {
      const card = btn.closest("[data-js-card]");
      const idProduct = card.getAttribute("data-js-idproduct");
      if (!this.isInZus(getState().ids, Number(idProduct)) == false) {
        btn.setAttribute(addToCartModel.Selectors.listeningBtnSelector, "clicked");
        btn.querySelector(".btn__label").textContent = "Удалить из корзины";
      }
      btn.addEventListener("click", this.clickHandler);
    });
  }
}
