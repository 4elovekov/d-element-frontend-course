// import { Card } from "../../../entities/card/index.js"
import myStore from "../../../shared/config/zustandStore";
import { Card } from "../../../entities/card/index.js"

export default class CartModel {

    static selectors = {
        instanceSelector: "[data-js-cart]",
    };

    static instance = null
    
    constructor() {
        if (CartModel.instance) {
            return CartModel.instance;
        }


        CartModel.instance = document.querySelector(CartModel.selectors.instanceSelector);
        if (CartModel.instance) {
            this.init()
        }
    }

    isInZus(arr, num) {
        const index = arr.indexOf(num);
        if (index !== -1) {
            return index
        } else {
            return false
        }
    }

    async checkPromo(promoText) {
        try {
            const response = await fetch("http://localhost:5173/cart.html", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ promo: promoText }),
            });
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

    async getCards() {
        try {
            const response = await fetch("http://localhost:5173/cart.html");
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

    parseCards(cards) {
        const oldCards = document.querySelectorAll(".card");
        oldCards.forEach(element => {
            element.remove();
        });

        let cardsHTML = ``
        cards.forEach((card) => {
            cardsHTML += Card({
                extraClasses: {
                    small: true,
                },
                type: "small",
                imageSrc: card.imageSrc,
                label: card.label,
                productName: card.productName,
                idProduct: card.idProduct,
                startDate: this.formatDate(card.registration.startDate),
                endDate: this.formatDate(card.registration.endDate),
                startCourse: this.formatDate(card.startCourse),
                children: `<img src="/images/close.svg" class="card__delete" alt="delete">`
            })
        })
        const newCards = document.querySelector(".cart__cards");
        newCards.insertAdjacentHTML("afterbegin", cardsHTML);
        this.addListenersToBtns();
    }

    addListenersToBtns() {
        const deleteImages = Array.from(document.querySelectorAll(".card__delete"));
        this.deleteClickHandler = this.deleteClickHandler.bind(this);
        deleteImages.forEach((img) => {
            img.addEventListener("click", this.deleteClickHandler)
        })
    }

    formatDate(inputDate) {
        const day = inputDate.substring(0, 2);
        const month = inputDate.substring(2, 4);
        const year = inputDate.substring(4, 8);
      
        const formattedDate = `${day}.${month}.${year}`;
      
        return formattedDate;
    }

    thousandSeparator(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    deleteClickHandler(event) {
        const { getState } = myStore;
        const card = event.target.closest("[data-js-card]");
        const idProduct = card.getAttribute("data-js-idproduct");
        const index = this.isInZus(getState().ids, Number(idProduct));
        if (index) {
          getState().removeId(index);
        }
        this.getCards()
        .then(data => {
            this.parseCards(data)
            this.calcPrice(data)
        })
        .catch(error => {
            console.error("Произошла ошибка:", error);
        });
    }

    calcPrice(cards) {
        let price = 0;
        let count = 0;
        cards.forEach((card) => {
            price += card.price;
            count += 1;
        })
        const priceBeforePromo = document.querySelector(".cart__amount");
        const priceAfterPromo = document.querySelector(".cart__price");
        const quantity = document.querySelector(".cart__quantity");
        const product = "товар";
        priceBeforePromo.textContent = `${this.thousandSeparator(price)} ₽`
        priceAfterPromo.textContent = `${this.thousandSeparator(price)} ₽`
        if (count % 10 === 1 && count % 100 !== 11) {
            quantity.textContent = `${count} ${product}`;
        } else if ([ 2, 3, 4 ].includes(count % 10) && ![ 12, 13, 14 ].includes(count % 100)) {
            quantity.textContent = `${count} ${product}а`;
        } else {
            quantity.textContent = `${count} ${product}ов`;
        }
    }

    blurInputHandler(event) {
        const value = event.target.closest("#promoInput").value
        if (value) {
            this.checkPromo(event.target.closest("#promoInput").value)
                .then(data => {
                    this.promoAftereffect(data, event.target)
                })
                .catch(error => {
                    console.error("Произошла ошибка:", error);
                });
        } else {
            const promoRes = document.getElementById("promoResult")
            if (promoRes) {
                promoRes.remove();
            }
            document.querySelector(".cart__form").style.height = "376px";
            const priceBefore = document.querySelector(".cart__amount");
            const priceAfter = document.querySelector(".cart__price");
            priceAfter.textContent = priceBefore.textContent;
            priceAfter.style.color = "rgba(11, 16, 20, 1)";
        }
    }

    promoAftereffect(res, input) {
        const promoRes = document.getElementById("promoResult")
        const cartForm = document.querySelector(".cart__form");
        if (promoRes) {
            promoRes.remove();
        }
        if (res.isPromoAvailable) {
            cartForm.style.height = "408px"
            const strRes = `<p id="promoResult">Промокод успешно применён!</p>`;
            input.closest(".cart__promo").insertAdjacentHTML("beforeend", strRes);
            const resPromo = document.getElementById("promoResult");
            resPromo.style.color = "green";

            const priceBefore = document.querySelector(".cart__amount");
            const priceAfter = document.querySelector(".cart__price");
            let text = priceBefore.textContent;
            console.debug("text: ", text)
            text = text.replace(/ /g, "")
            text = text.replace("₽", "")
            console.debug(text)
            text = Number(text) - Number(text) * Number(res.percentage) / 100;
            priceAfter.textContent = `${this.thousandSeparator(text)} ₽`
            priceAfter.style.color = "green"
        } else {
            cartForm.style.height = "408px"
            const strRes = `<p id="promoResult">Промокод недействителен!</p>`
            input.closest(".cart__promo").insertAdjacentHTML("beforeend", strRes)
            const resPromo = document.getElementById("promoResult");
            resPromo.style.color = "red";

            const priceBefore = document.querySelector(".cart__amount");
            const priceAfter = document.querySelector(".cart__price");
            priceAfter.textContent = priceBefore.textContent;
            priceAfter.style.color = "rgba(11, 16, 20, 1)"
        }
    }

    init() {
        this.promoAftereffect = this.promoAftereffect.bind(this);
        this.blurInputHandler = this.blurInputHandler.bind(this);
        this.calcPrice = this.calcPrice.bind(this);
        const input = document.getElementById("promoInput");
        input.addEventListener("blur", this.blurInputHandler);
        this.getCards()
            .then(data => {
                this.parseCards(data)
                this.calcPrice(data)
            })
            .catch(error => {
                console.error("Произошла ошибка:", error);
            });
    }

}