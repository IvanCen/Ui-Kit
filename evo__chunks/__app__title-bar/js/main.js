class CreateTitleBar extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
  }

  create() {
    if (typeof this.parameters.text === 'object') {
      this.element.textContent = this.parameters.text;
    }

    return super.create(this.element);
  }
}


class CreateTitleBarWithButton extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
    this.template = `
      <h2 class="title-bar__title title-bar__title--size--${this.parameters.titleSize}">${this.parameters.title}</h2>
      <button class="title-bar__button">${this.parameters.buttonText}</button>`;
  }

  create() {
    if (typeof this.parameters.text === 'object') {
      this.element.textContent = this.parameters.text;
    }
    this.element.insertAdjacentHTML('beforeend', this.template);
    return super.create(this.element);
  }
}
