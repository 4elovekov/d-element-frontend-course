import Builder from "../../../shared/lib/builder"

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
        // this.url = new URL(window.location.href)

        // this.url = new URL(window.location.href);
        // this.params = new URLSearchParams(this.url.search);

        this.url = new Builder(window.location.href);
        this.init()
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
            // input.checked ? input.setAttribute("checked", "") : input.removeAttribute("checked")
        })

        // this.new_url = new URL(`${this.url.origin}${this.url.pathname}?${this.params}`);
        // console.debug("new url: ", this.new_url)

        console.debug(this.url.stringParams())
        console.debug(this.url.stringUrl())
        fetch (this.url.stringUrl())
            .then(response => console.debug(response.json()))
    }

    init() {
        this.checkboxChanged = this.checkboxChanged.bind(this);
        this.inputs.forEach(input => {
            input.addEventListener("change", this.checkboxChanged)
        })
    }

}