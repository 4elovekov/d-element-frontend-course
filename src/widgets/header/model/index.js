export default class HeaderModel {
    
    constructor() {
        if (HeaderModel.instance) {
            return HeaderModel.instance;
        }

        HeaderModel.instance = document.querySelector("[data-js-header]");
        this.logo = document.getElementById("logo");
        console.debug(this.logo)

        this.init()
    }

    logoClick() {
        window.location.href = "./index.html";
    }
    
    init() {
        this.logo.addEventListener("click", this.logoClick)
    }

}