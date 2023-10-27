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
        this.url = new URL(window.location.href)
        this.init()
    }

    getSearchParam (btn) {
        return btn.getAttribute(FilterModel.selectors.checkboxSelectors)
    }

    checkboxChanged(e) {
        console.debug(this.inputs)
    }

    init() {
        this.inputs.forEach(input => {
            input.addEventListener("change", this.checkboxChanged)
        })
    }

}