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

        fetch(this.url.stringUrl())
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.debug("data: ", data)
            data.forEach((card) => {
                console.debug("data.card: ", card)
                Card({
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
                })
            })
            

        })
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