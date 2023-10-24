export default class HeaderModel {
    
    constructor() {
        if (!!HeaderModel.instance) {
            return HeaderModel.instance;
        }

        this.node = document.querySelector("[data-js-header]");

        HeaderModel.instance = this;
        return this;
    }
}