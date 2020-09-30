function addEventListenerButton(item) {
  const buttonActive = 'button--active';
  item.addEventListener('click', function () {
    this.focus();
  });
  item.addEventListener('focus', function () {
    this.classList.add(buttonActive);
    this.innerText += '';
  });
  item.addEventListener('blur', function () {
    this.classList.remove(buttonActive);
  });
}

function activeFilterButton() {
  const buttonThemeTangerinTransparent = document.querySelectorAll('.button--theme--tangerin-transparent');

  [...buttonThemeTangerinTransparent].forEach((item) => {
    item.addEventListener('click', function () {
      this.classList.toggle('button--theme--tangerin-transparent');
      this.classList.toggle('button--theme--tangerin');
    });
  });
}


class CreateButton extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
    if (this.parameters.typeSubmit) {
      this.element.type = 'submit';
    }
    this.template = this.parameters.template;
  }

  create() {
    if (typeof this.parameters.text === 'object') {
      this.element.textContent = this.parameters.text;
    }
    if (typeof this.parameters.events === 'object') {
      for (const event of this.parameters.events) {
        this.element.addEventListener(event.type, event.callback);
      }
    }
    if (typeof this.parameters.eventsOpen === 'object') {
      for (const eventOpen of this.parameters.eventsOpen) {
        this.element.addEventListener(eventOpen.type, eventOpen.callback);
      }
    }
    this.addEventListenerButton(this.element);
    return super.create(this.element);
  }

  addEventListenerButton(item) {
    this.buttonActive = 'button--active';
    item.addEventListener('click', function () {
      this.focus();
    });
    item.addEventListener('focus', function () {
      this.classList.add(this.buttonActive);
      this.innerText += '';
    });
    item.addEventListener('blur', function () {
      this.classList.remove(this.buttonActive);
    });
  }
}
