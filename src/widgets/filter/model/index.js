export default class FilterModel {

    static selectors = {
        instanceSelector: "[data-js-filter]",
        btnSelectors: "data-js-search-param"
    };

    static instance = null
    
    constructor() {
        if (FilterModel.instance) {
            return FilterModel.instance;
        }


        FilterModel.instance = document.querySelector(FilterModel.selectors.instanceSelector);
        this.btns = Array.from(document.querySelectorAll(`[${FilterModel.selectors.btnSelectors}]`))
        this.init()
    }

    getSearchParam (btn) {
        return btn.getAttribute(FilterModel.selectors.btnSelectors)
    }

    init() {
        this.btns.forEach(btn => {
            console.debug(this.getSearchParam(btn))
        })
    }

}