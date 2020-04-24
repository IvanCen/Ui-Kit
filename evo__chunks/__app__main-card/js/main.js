/*function createMainCard() {
  const element = document.createElement('div');
  element.classList.add('main-card', 'main-card--type--border');

  const template = `
      `;

  element.insertAdjacentHTML('beforeend', template);
  return element;
}*/


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
          <button class="button button--size--small button--theme--tangerin-transparent main-card__button">Details</button>
        </div>
      </div>`;
  }

  create() {
    this.element.insertAdjacentHTML('beforeend', this.template);

    return super.create(this.element);
  }
}
