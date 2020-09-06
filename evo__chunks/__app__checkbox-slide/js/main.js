class CreateCheckboxSlide extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
    this.template = `
        <input data-id="${this.parameters.id}" class="checkbox-slide__input" type="checkbox" />
        <span class="checkbox-slide__text text-area__price text-area__price--size--small"><span class="text-area__price text-area__price--size--smallest">${this.parameters.name} ${this.parameters.price}</span></span>
      `;
  }

  create() {
    this.element.insertAdjacentHTML('beforeend', this.template);

    return super.create(this.element);
  }
}
