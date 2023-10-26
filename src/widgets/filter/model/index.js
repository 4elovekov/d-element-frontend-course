export default class FilterModel {

    static selectors = {
        instanceSelector: "[data-js-filter]",
        btnSelector: "[data-js-search-param]"
    }

    static instance = null;
    
    constructor() {
        if (FilterModel.instance) {
            return FilterModel.instance;
        }


        FilterModel.instance = document.querySelector(FilterModel.selectors.instanceSelector);
        this.btns = Array.from(document.querySelectorAll(FilterModel.selectors.btnSelector));
    }

    getSearchParam(btn) {
        console.debug(btn);
        return btn.getAttribute(FilterModel.selectors.btnSelector)
    }

    init() {
        this.btns.forEach(btn => {
            console.debug(this.getSearchParam(btn))
        })
    }
}