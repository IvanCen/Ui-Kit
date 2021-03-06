function selectItemActive() {
  const selectItemButtonContainer = document.querySelector('.select-item__button-container');
  const selectItemButton = document.querySelector('.select-item__button');
  const popupBar = document.querySelector('.popup-bar');
  const popupBarButton = document.querySelectorAll('.popup-bar__button');
  const overlay = document.querySelector('.overlay');

  selectItemButtonContainer.addEventListener('click', (event) => {
    overlay.addEventListener('click', () => {
      if (event.target !== popupBar || event.target === overlay) {
        popupBar.classList.remove('popup-bar--show');
        overlay.classList.remove('overlay--visible');
      }
    });
    overlay.classList.add('overlay--visible');
    popupBar.classList.add('popup-bar--show');
  });

  [...popupBarButton].forEach((item) => {
    item.addEventListener('click', () => {
      [...popupBarButton].forEach((el) => {
        el.classList.remove('popup-bar__button--active');
      });
      item.classList.add('popup-bar__button--active');
      selectItemButton.textContent = item.textContent;
      popupBar.classList.remove('popup-bar--show');
    });
  });
}

class CreateSelectItem extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
    this.template = `
      <div class="select-item__overlay overlay"></div>
        <div class="select-item__choice-content">
          <span class="select-item__info">Сумма пополнения</span>
          <div class="select-item__button-container">
            <button class="select-item__button">500</button>
            <img src="data:image/svg+xml;base64,[[run-snippet? &snippetName='file-to-base64' &file=[+chunkWebPath+]/img/icon-expand-direction-bottom.svg]]" alt="" class="select-item__icon">
          </div>
          <div class="popup-bar">
            <button class="popup-bar__button"><span class="popup-bar__number">100</span></button>
            <button class="popup-bar__button popup-bar__button--active"><span class="popup-bar__number">500</span></button>
            <button class="popup-bar__button"><span class="popup-bar__number">1000</span></button>
            <button class="popup-bar__button"><span class="popup-bar__number">2000</span></button>
            <button class="popup-bar__button"><span class="popup-bar__number">5000</span></button>
          </div>
        </div>`;
  }

  create() {
    this.element.insertAdjacentHTML('beforeend', this.template);

    return super.create(this.element);
  }
}

class CreateShopSelect extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement('div');
    this.template = `
      <span>Для отображения цен выберите магазин</span>
      <button class="button button--theme--tangerin-border button--size--medium">Выбрать</button>
        `;
  }

  create() {
    this.element.insertAdjacentHTML('beforeend', this.template);

    this.button = this.element.querySelector('.button');
    this.button.addEventListener('click', () => {
      storesPage.openPage();
    });

    return super.create(this.element);
  }
}
