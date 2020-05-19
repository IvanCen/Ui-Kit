class CreateBottomBarOrder extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
    this.template = `
        <div class="bottom-bar__select-container">
          <span class="bottom-bar__info">Самовывоз по адресу</span>
          <button class="bottom-bar__select-item">${localStorage.getItem('short-name-shop') || 'Адрес магазина'}
            <img src="[+chunkWebPath+]/img/icon-expand-direction-bottom-white.svg" alt="" class="bottom-bar__icon">
          </button>
        </div>
        <button class="bottom-bar__select-item bottom-bar__select-item--size--small bottom-bar__select-item--type--basket">
          <svg class="bottom-bar__icon bottom-bar__icon--type--basket" viewBox="0 0 32 32"
               xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M11.84 7.26997C12.26 5.08997 14.14 3.46997 16.38 3.46997C18.62 3.46997 20.51 5.09997 20.92 7.26997H11.84ZM10.32 7.26997C10.75 4.27997 13.3 1.96997 16.38 1.96997C19.46 1.96997 22.01 4.27997 22.44 7.26997H26C27.66 7.26997 29 8.60997 29 10.27V27.03C29 28.69 27.66 30.03 26 30.03H6C4.34 30.03 3 28.69 3 27.03V10.27C3 8.60997 4.34 7.26997 6 7.26997H10.32Z"/>
          </svg>
          <img src="[+chunkWebPath+]/img/icon-product-app.svg" alt=""
               class="bottom-bar__icon-popup">
          <span class="bottom-bar__counter">0</span>
        </button>`;
  }

  create() {
    this.element.insertAdjacentHTML('beforeend', this.template);
    this.basket = this.element.querySelector('.bottom-bar__select-item--type--basket');
    if (typeof this.parameters.eventBasket === 'object') {
      for (const event of this.parameters.eventBasket) {
        this.basket.addEventListener(event.type, event.callback);
      }
    }

    return super.create(this.element);
  }
}
