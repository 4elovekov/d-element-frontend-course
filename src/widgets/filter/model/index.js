import Builder from "../../../shared/lib/builder"
import addToCartModel from "../../../features/addToCart/model";
import { Card } from "../../../entities/card/index.js"
import { AddToCart } from "../../../features/addToCart/index.js";

export default class FilterModel {

    static selectors = {
        instanceSelector: "[data-js-filter]",
        checkboxSelectors: "data-js-search-param",
        labelSelectors: "data-js-search"
    };

    static instance = null
    
    constructor() {
        if (FilterModel.instance) {
            return FilterModel.instance;
        }


        FilterModel.instance = document.querySelector(FilterModel.selectors.instanceSelector);
        this.inputs = Array.from(document.querySelectorAll(`[${FilterModel.selectors.checkboxSelectors}]`))
        this.labels = Array.from(document.querySelectorAll(`[${FilterModel.selectors.labelSelectors}]`))

        this.url = new Builder(window.location.href);
        this.init()
        this.inputs != false ? this.inputs[0].dispatchEvent(new Event("change")) : "" ;
    }

    getSearchParam (checkbox) {
        return checkbox.getAttribute(FilterModel.selectors.checkboxSelectors)
    }

    changeChecked () {
        this.inputs.forEach( (input, index) => {
            if (input.checked) {
                input.setAttribute("checked", "")
                this.labels[index].setAttribute("checked", "")
                this.url.addParam(input.value, true);
            } else {
                input.removeAttribute("checked")
                this.labels[index].removeAttribute("checked")
                this.url.deleteParam(input.value)
            }
        })

    }

    cardParse(cards) {
        const oldCards = document.querySelectorAll(".card");
        oldCards.forEach(element => {
            element.remove();
        });

        let cardsHTML = ``
        cards.forEach((card) => {
            cardsHTML += Card({
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
                        hidden: false,
                        disabled: false,
                    }
                })
            })
        })
        const newCards = document.querySelector(".filter__cards");
        newCards.insertAdjacentHTML("afterbegin", cardsHTML);
    }

    async getCards(apiUrl) {
        try {
            const response = await fetch(apiUrl);
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

    checkboxChanged() {
        this.changeChecked();

        this.getCards(this.url.stringUrl())
            .then(data => {
                this.cardParse(data)
                this.runFeatures()
            })
            .catch(error => {
                console.error("Произошла ошибка:", error);
            });
    }

    runFeatures = async() => {
        new addToCartModel()
    }

    init() {
        this.checkboxChanged = this.checkboxChanged.bind(this);
        this.inputs.forEach(input => {
            input.addEventListener("change", this.checkboxChanged)
        })
    }

}