export default class HeaderModel {
    
    constructor() {
        if (!!HeaderModel.instance) {
            return HeaderModel.instance;
        }

        HeaderModel.instance = this;
        return this;
    }
}