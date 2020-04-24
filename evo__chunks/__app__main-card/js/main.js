function createMainCard() {
    const element = document.createElement('div');
    element.classList.add('main-card', 'main-card--type--border');

    const template = `
      <img src="[+chunkWebPath+]/img/main-card-noimg.jpg" alt="" class="main-card__img">
      <div class="main-card__text-area">
        <h2 class="main-card__title">Buy one, get one free</h2>
        <p class="main-card__text">Notes of smoked butterscotch intermingle with our signature espresso,
          giving your latte a
          sophisticated new twist</p>
        <div class="main-card__button-container">
          <button class="button button&#45;&#45;size&#45;&#45;small button&#45;&#45;theme&#45;&#45;tangerin main-card__button">Details</button>
          <button class="button button&#45;&#45;size&#45;&#45;small button&#45;&#45;theme&#45;&#45;tangerin-transparent main-card__button">Details</button>
        </div>
      </div>`

    element.insertAdjacentHTML('beforeend', template);
    return element;
}
