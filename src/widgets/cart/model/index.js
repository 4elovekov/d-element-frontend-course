// import { Card } from "../../../entities/card/index.js"

export default class CardModel {

    static selectors = {
        instanceSelector: "[data-js-cart]",
    };

    static instance = null
    
    constructor() {
        if (CardModel.instance) {
            return CardModel.instance;
        }


        CardModel.instance = document.querySelector(CardModel.selectors.instanceSelector);

        this.init()
    }

    init() {

    }

}