export default class RequestBuilder {
    constructor(url = "") {
      this.url = new URL(url);
    }
  
    addParam (name, value) {
      this.url.searchParams.set(name, value);
  
      return this;
    }

    deleteParam (name) {
        this.url.searchParams.delete(name);

        return this;
    }

    stringParams () {
        return this.url.searchParams.toString();
    }

    stringUrl () {
        return this.url.href;
    }

  }
  