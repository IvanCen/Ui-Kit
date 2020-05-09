class CreateMapStores extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
  }

  create() {
    this.element.id = 'map';
    return super.create(this.element);
  }
}
