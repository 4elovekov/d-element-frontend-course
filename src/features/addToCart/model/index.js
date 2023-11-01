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

  addToLocal(idProduct) {
    const data = JSON.parse(localStorage.getItem("idProduct"));
    data.id.push(idProduct);
    localStorage.removeItem("idProduct");
    localStorage.setItem("idProduct", JSON.stringify(data))
  }

  removeFromLocal(idProduct) {
    const data = JSON.parse(localStorage.getItem("idProduct"));
    const indexToRemove = data.id.indexOf(idProduct);
    data.id.splice(indexToRemove, 1);
    localStorage.removeItem("idProduct");
    localStorage.setItem("idProduct", JSON.stringify(data))
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
    const emptyLocal = { "id": [ "0" ] }
    localStorage.setItem("idProduct", JSON.stringify(emptyLocal))
    this.addListeningAttribute(this.btns)
    this.clickHandler = this.clickHandler.bind(this);
    this.btns.forEach((btn) => {
      btn.addEventListener("click", this.clickHandler);
    });
  }
}
