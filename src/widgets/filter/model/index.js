import Builder from "../../../shared/lib/builder"
import { Card } from "../../../entities/card/index.js"
import { AddToCart } from "../../../features/addToCart/index.js";

export default class FilterModel {

    static selectors = {
        instanceSelector: "[data-js-filter]",
        checkboxSelectors: "data-js-search-param"
    };

    static instance = null
    
    constructor() {
        if (FilterModel.instance) {
            return FilterModel.instance;
        }


        FilterModel.instance = document.querySelector(FilterModel.selectors.instanceSelector);
        this.inputs = Array.from(document.querySelectorAll(`[${FilterModel.selectors.checkboxSelectors}]`))

        this.url = new Builder(window.location.href);
        this.init()
        this.inputs != false ? this.inputs[0].dispatchEvent(new Event("change")) : "" ;
    }

    getSearchParam (checkbox) {
        return checkbox.getAttribute(FilterModel.selectors.checkboxSelectors)
    }

    cardParse(cards) {
        const oldCards = document.querySelectorAll(".card");
        oldCards.forEach(element => {
            element.remove();
          });

        cards.forEach((card) => {
            console.debug("data.card: ", card)
            const filterHTML = document.querySelector(".filter");
            console.debug("filterhtml: ", filterHTML)
            filterHTML.insertAdjacentHTML("afterbegin", Card({
                imageSrc: card.imageSrc,
                label: card.label,
                productName: card.productName,
                children: AddToCart({
                    extraAttrs: {
                        "id": "btn"
                    },
                    extraClasses: {
                        hidden: false,
                        disabled: true,
                    }
                })
            }))
        })
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
        this.inputs.forEach(input => {
            if (input.checked) {
                input.setAttribute("checked", "")
                this.url.addParam(input.value, true);
            } else {
                input.removeAttribute("checked")
                this.url.deleteParam(input.value)
            }
        })

        this.getCards(this.url.stringUrl())
            .then(data => {
                console.debug("Data from the API:", data);
                this.cardParse(data)
            })

        // fetch(this.url.stringUrl())
        // .then((response) => {
        //     return response.json();
        // })
        // .then((data) => {
        //     console.debug("data: ", data)
        //     data.forEach((card) => {
        //         console.debug("data.card: ", card)
        //         Card({
        //             imageSrc: card.imageSrc,
        //             label: card.label,
        //             productName: card.productName,
        //             children: AddToCart({
        //                 extraAttrs: {
        //                     "id": "btn"
        //                 },
        //                 extraClasses: {
        //                     hidden: false,
        //                     disabled: true,
        //                 }
        //             })
        //         })
        //     })
        // })
        .catch(error => {
            console.error("Произошла ошибка:", error);
        });
    }

    init() {
        this.checkboxChanged = this.checkboxChanged.bind(this);
        this.inputs.forEach(input => {
            input.addEventListener("change", this.checkboxChanged)
        })
    }

}