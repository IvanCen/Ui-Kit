class CreateMainCard extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
    this.template = `
      <img src="[+chunkWebPath+]/img/main-card-noimg.jpg" alt="" class="main-card__img">
      <div class="main-card__text-area">
        <h2 class="main-card__title">Buy one, get one free</h2>
        <p class="main-card__text">Notes of smoked butterscotch intermingle with our signature espresso,
          giving your latte a
          sophisticated new twist</p>
        <div class="main-card__button-container">
          <button class="button button--size--small button--theme--tangerin main-card__button">Details</button>
        </div>
      </div>`;
  }

  create() {
    this.element.insertAdjacentHTML('beforeend', this.template);

    return super.create(this.element);
  }
}

class CreateCardsCard extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
    this.template = `
        <img src="[+chunkWebPath+]/img/main-card-noimg.jpg" alt="" class="main-card__img">
        <div class="main-card__text-area">
          <p class="main-card__text">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.</p>
        </div>`;
  }

  create() {
    this.element.insertAdjacentHTML('beforeend', this.template);

    return super.create(this.element);
  }
}

class CreateOrderProductCard extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
    this.template = `
      <div class="main-card__content">
        <img src="[+chunkWebPath+]/img/icon-close-white.svg" alt="" class="main-card__icon main-card__icon-close">
        <img src="[+chunkWebPath+]/img/main-card-noimg.jpg" alt="" class="main-card__content-img">
        <h2 class="main-card__content-title">${this.parameters.title}</h2>
      </div>`;
  }

  create() {
    this.element.insertAdjacentHTML('beforeend', this.template);

    this.iconClose = this.element.querySelector('.main-card__icon-close');
    if (typeof this.parameters.eventCloseIcon === 'object') {
      for (const event of this.parameters.eventCloseIcon) {
        this.iconClose.addEventListener(event.type, event.callback);
      }
    }

    return super.create(this.element);
  }
}
