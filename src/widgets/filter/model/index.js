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
        this.url = new URL(window.location.href);
        this.params = new URLSearchParams(this.url.search);
        console.debug(this.url)
        console.debug(this.params.toString())
        this.init()
    }

    getSearchParam (checkbox) {
        return checkbox.getAttribute(FilterModel.selectors.checkboxSelectors)
    }

    checkboxChanged() {
        this.inputs.forEach(input => {
            if (input.checked) {
                input.setAttribute("checked", "")
                this.params.set(`${input.value}`, true);
            } else {
                input.removeAttribute("checked")
                this.params.delete(`${input.value}`)
            }
            // input.checked ? input.setAttribute("checked", "") : input.removeAttribute("checked")
            console.debug(this.params.toString())
            console.debug(input)
        })
        console.debug(this.url)
        fetch (this.url)
            .then(response => console.debug(response.json()))
    }

    init() {
        this.checkboxChanged = this.checkboxChanged.bind(this);
        this.inputs.forEach(input => {
            input.addEventListener("change", this.checkboxChanged)
        })
    }

}