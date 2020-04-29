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

function activeButton() {
  const buttonThemeTangerinTransparent = document.querySelectorAll('.button--theme--tangerin-transparent');
  const buttonThemeLight = document.querySelectorAll('.button--theme--light');
  const buttonThemeTangerin = document.querySelectorAll('.button--theme--tangerin');
  const buttonThemeDarkTransparent = document.querySelectorAll('.button--theme--dark-transparent');
  const buttonThemeOrangesTransparent = document.querySelectorAll('.button--theme--oranges-transparent');
  const arrButton = [
    ...buttonThemeTangerinTransparent,
    ...buttonThemeLight,
    ...buttonThemeTangerin,
    ...buttonThemeDarkTransparent,
    ...buttonThemeOrangesTransparent,
  ];
  let doubleTouchStartTimestamp = 0;
  document.addEventListener('touchstart', { passive: false }, (event) => {
    const now = +(new Date());
    if (doubleTouchStartTimestamp + 500 > now) {
      event.preventDefault();
    }
    doubleTouchStartTimestamp = now;
  });

  [...arrButton].forEach((item) => {
    addEventListenerButton(item);
  });
}

class CreateButton extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
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
