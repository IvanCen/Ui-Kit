/* function createTitleBar(parameters) {
  if (typeof parameters !== 'object') {
    parameters = {};
  }

  const element = document.createElement('h2');
  element.classList.add('title-bar', 'title-bar__title');

  if (typeof parameters.styles === 'object') {
    for (const style of parameters.styles) {
      element.classList.add(`title-bar__title${style}`);
    }
  }

  if (typeof parameters.text === 'object') {
    element.textContent = parameters.text;
  }

  return element;
} */

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
