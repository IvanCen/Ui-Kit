class CreateTitleBar extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
  }

  create(name) {
    this.element = document.createElement(this.parameters.selector);
    if (typeof this.parameters.text === 'object') {
      this.element.textContent = name || this.parameters.text;
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
      <button class="title-bar__button">Посмотреть</button>`;
  }

  create(products) {
    if (typeof this.parameters.text === 'object') {
      this.element.textContent = this.parameters.text;
    }
    this.element.insertAdjacentHTML('beforeend', this.template);

    this.button = this.element.querySelector('.title-bar__button');

    if (typeof this.parameters.eventButtonClassAdd === 'object') {
      this.button.classList.add(this.parameters.eventButtonClassAdd);
    }
    if (typeof this.parameters.eventButton === 'object') {
      for (const event of this.parameters.eventButton) {
        this.button.addEventListener(event.type, event.callback);
      }
    }

    return super.create(this.element);
  }
}

class CreateTitleBarWithCheckboxSlide extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
    this.template = `
      <h2 class="title-bar__title title-bar__title--size--${this.parameters.titleSize}">${this.parameters.title}</h2>
      <label class="checkbox-slide checkbox-slide--type--single">
        <input class="checkbox-slide__input" type="checkbox" />
        <span class="checkbox-slide__text"></span>
      </label>`;
  }

  create() {
    if (typeof this.parameters.text === 'object') {
      this.element.textContent = this.parameters.text;
    }
    this.element.insertAdjacentHTML('beforeend', this.template);

    this.button = this.element.querySelector('.title-bar__button');
    if (typeof this.parameters.eventButton === 'object') {
      for (const event of this.parameters.eventButton) {
        this.button.addEventListener(event.type, event.callback);
      }
    }

    return super.create(this.element);
  }
}
