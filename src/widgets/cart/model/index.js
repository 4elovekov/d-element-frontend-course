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

    getZus() {
        const { getState } = myStore;
        return getState().ids;
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
                children: `<img src="/images/close.svg" alt="delete">`
            })
        })
        const newCards = document.querySelector(".cart__cards");
        newCards.insertAdjacentHTML("afterbegin", cardsHTML);
    }

    formatDate(inputDate) {
        const day = inputDate.substring(0, 2);
        const month = inputDate.substring(2, 4);
        const year = inputDate.substring(4, 8);
      
        const formattedDate = `${day}.${month}.${year}`;
      
        return formattedDate;
      }


    init() {
        this.getCards()
            .then(data => {
                this.parseCards(data)
            })
            .catch(error => {
                console.error("Произошла ошибка:", error);
            });
    }

}