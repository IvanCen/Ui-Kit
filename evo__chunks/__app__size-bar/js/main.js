function activeSizeBar(element, countCombinationTitleParameter, titleParameter) {
  const sizeBarInfo = document.querySelector('.size-bar__info');
  const sizeBarButtons = document.querySelectorAll('.size-bar__button');
  const sizeBarButtonActive = 'size-bar__button--active';
  const sizeBar = document.querySelector('.size-bar');
  const sizeBarButtonContainer = document.querySelector('.size-bar__button-container');
  const priceEl = document.querySelector('.text-area__price');
  let price;
  if (priceEl) {
    price = priceEl.textContent;
  }

  (function sizeBarOpen() {
    sizeBar.addEventListener('click', () => {
      sizeBar.classList.add('size-bar--open');
      sizeBarButtonContainer.classList.add('size-bar__button-container--open');
    });
  }());

  (function switchActiveSizeButton() {
    [...sizeBarButtons].forEach((item) => {
      item.addEventListener('click', () => {
        [...sizeBarButtons].some((el) => {
          if (el.classList.contains(sizeBarButtonActive)) {
            el.classList.remove(sizeBarButtonActive);
            return true;
          }
          return false;
        });
        item.classList.add(sizeBarButtonActive);
        sizeBarInfo.textContent = item.textContent;
        if (element && countCombinationTitleParameter) {
          const unit = titleParameter === 'netWeight' ? 'г' : 'мл';
          const multiplier = item.getAttribute('multiplier');
          const priceActual = Number(price) * Number(multiplier);
          const numberOfUnit = Number(countCombinationTitleParameter / 100) * Number(item.textContent);
          element.textContent = `${numberOfUnit} ${unit}`;
          priceEl.textContent = priceActual;
        }
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
                <button class="size-bar__button">1</button>
                <button class="size-bar__button">10</button>
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
  }

  create(productInfo) {
    this.startCount = productInfo.countCombinations[0] * productInfo[productInfo.countCombinationTitleParameter];
    this.template = `
              <div class="size-bar__content-container">
                <h2 class="size-bar__title">Масса</h2>
                <span class="size-bar__info">${this.startCount}</span>
              </div>
              <div class="size-bar__button-container"></div>`;
    this.element.insertAdjacentHTML('beforeend', this.template);

    this.buttonContainer = this.element.querySelector('.size-bar__button-container');

    productInfo.countCombinations.forEach((item, index) => {
      this.sizeBarButton = document.createElement('button');
      this.sizeBarButton.textContent = productInfo[productInfo.countCombinationTitleParameter] * item;
      this.sizeBarButton.setAttribute('multiplier', item);
      this.sizeBarButton.classList.add('size-bar__button');
      if (index === 0) {
        this.sizeBarButton.classList.add('size-bar__button--active');
      }
      this.buttonContainer.append(this.sizeBarButton);
    });

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
