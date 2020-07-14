function activeSizeBar() {
  const sizeBarInfo = document.querySelector('.size-bar__info');
  const sizeBarButtons = document.querySelectorAll('.size-bar__button');
  const sizeBarButtonActive = 'size-bar__button--active';
  const sizeBar = document.querySelector('.size-bar');
  const sizeBarButtonContainer = document.querySelector('.size-bar__button-container');

  (function sizeBarOpen() {
    sizeBar.addEventListener('click', () => {
      sizeBar.classList.add('size-bar--open');
      sizeBarButtonContainer.classList.add('size-bar__button-container--open');
    });
  }());

  (function switchActiveSizeButton() {
    [...sizeBarButtons].forEach((item) => {
      item.addEventListener('click', () => {
        [...sizeBarButtons].forEach((el) => {
          el.classList.remove(sizeBarButtonActive);
        });
        item.classList.add(sizeBarButtonActive);
        sizeBarInfo.textContent = item.textContent;
      });
    });
  }());
}


class CreateSizeBar extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
    this.template = `
              <div class="size-bar__content-container">
              <h2 class="size-bar__title">Сумма пополнения</h2>
              <span class="size-bar__info">500</span>
              </div>
              <div class="size-bar__button-container">
                <button class="size-bar__button">100</button>
                <button class="size-bar__button size-bar__button--active">500</button>
                <button class="size-bar__button">1000</button>
                <button class="size-bar__button">2000</button>
                <button class="size-bar__button">5000</button>
              </div>`;
  }

  create() {
    this.element.insertAdjacentHTML('beforeend', this.template);

    return super.create(this.element);
  }
}

class CreateSizeBarVolume extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
    this.template = `
              <div class="size-bar__content-container">
              <h2 class="size-bar__title">Объем</h2>
              <span class="size-bar__info">500</span>
              </div>
              <div class="size-bar__button-container">
                <button class="size-bar__button">100</button>
                <button class="size-bar__button size-bar__button--active">500</button>
                <button class="size-bar__button">1000</button>
                <button class="size-bar__button">2000</button>
                <button class="size-bar__button">5000</button>
              </div>`;
  }

  create() {
    this.element.insertAdjacentHTML('beforeend', this.template);

    return super.create(this.element);
  }
}


/*
    * готовый сайз бар (выбор размера)
    */
/* if (typeof this.parameters.eventAddSize === 'object') {
  for (const event of this.parameters.eventAddSize) {
    const element = document.createElement('div');
    element.classList.add('size-bar', 'size-bar--main');
    const template = `
          <div class="size-bar__content-container">
          <h2 class="size-bar__title">${event.nameCategory}</h2>
          <span class="size-bar__info">${event.sizeNameMain}</span>
          </div>
          <div class="size-bar__button-container">
            <button class="size-bar__button">Short</button>
            <button class="size-bar__button size-bar__button--active">${event.sizeNameMain}</button>
            <button class="size-bar__button">Grande</button>
            <button class="size-bar__button">Venti</button>
          </div>`;
    element.insertAdjacentHTML('beforeend', template);

    this.descriptionArea = this.element.querySelector('.text-area--type--description');
    this.descriptionArea.after(element);
  }
} */
