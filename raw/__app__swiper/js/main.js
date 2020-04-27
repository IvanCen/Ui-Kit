class CreateSwiper extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
    this.template = `
      <div class="swiper-wrapper">
        <div class="swiper-slide swiper-slide--size--normal"></div>
        <div class="swiper-slide swiper-slide--size--normal"></div>
        <div class="swiper-slide swiper-slide--size--normal"></div>
        <div class="swiper-slide swiper-slide--size--normal"></div>
    </div>`;
  }

  create() {
    if (typeof this.parameters.text === 'object') {
      this.element.textContent = this.parameters.text;
    }

    this.element.insertAdjacentHTML('beforeend', this.template);

    return super.create(this.element);
  }
}

/* const swiper = new Swiper('.swiper', {
    slidesPerView: 'auto',
    spaceBetween: 16,
}); */

/* const swiperSmall = new Swiper('.swiper-small', {
    slidesPerView: '2',
    spaceBetween: 16,
    width: 338,
}); */


/* const swiperMedium = new Swiper('.swiper-medium', {
    slidesPerView: '2',
    spaceBetween: 16,
    width: 338,
}); */
