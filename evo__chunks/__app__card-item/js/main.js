const cardItemIconTypeLike = document.querySelectorAll('.card-item__icon--type--like');

[...cardItemIconTypeLike].forEach((item) => {
  item.addEventListener('click', () => {
    item.classList.toggle('card-item__icon--liked');
  });
});

class CreateCardItemOrder extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
    this.template = `
      <img src="[+chunkWebPath+]/img/card-image.jpg" alt="" class="card-item__image card-item__image--size--small">
      <h3 class="card-item__title card-item__title--text--bold">${this.parameters.title}</h3>`;
  }

  create() {
    if (typeof this.parameters.text === 'object') {
      this.element.textContent = this.parameters.text;
    }

    this.element.insertAdjacentHTML('beforeend', this.template);
    if (typeof this.parameters.events === 'object') {
      for (const event of this.parameters.events) {
        this.element.addEventListener(event.type, event.callback);
      }
    }

    return super.create(this.element);
  }
}

/* <div class="card-item__container card-item__container--direction--column card-item__container--indentation-column--small card-item__container--with--border">
  <div class="card-item card-item--direction--row">

</div>
<div class="card-item card-item--direction--row">
  <img src="[+chunkWebPath+]/img/card-image.jpg" alt="" class="card-item__image card-item__image--size--small">
  <h3 class="card-item__title card-item__title--text--bold">Lorem ipsum dolor sit amet.</h3>
</div>
</div> */
