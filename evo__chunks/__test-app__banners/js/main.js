function createBanners() {
  const element = document.createElement('div');
  const template = `
  <div class="shares__header">
        <div class="shares__title">Акции</div>
    </div>
    <div class="shares__list">
        <div class="swiper-container">
            <div class="swiper-wrapper">
                
            </div>
        </div>
    </div>`;
  element.classList.add('shares');
  element.insertAdjacentHTML('beforeend', template);

  if (appData.information.promos) {
    appData.information.promos.forEach((banner) => {
      const templateSlide = ` 
            <div class="swiper-slide">
                <div class="shares__list-element">
                    <div class="shares__list-element-image"></div>
                    <div class="shares__list-element-desc">
                        <div class="shares__list-element-title">${banner.title}</div>
                        <div class="shares__list-element-text">${banner.intro}</div>
                    </div>
                </div>
            </div>`;
      const wraper = element.querySelector('.swiper-wrapper');
      wraper.insertAdjacentHTML('beforeend', templateSlide);

      const swiperSlide = wraper.querySelector('.swiper-slide');
      swiperSlide.addEventListener('click', () => {
        toggleModal.renderingPost(banner);
        toggleModal.openPage();
      });

      const imgEl = element.querySelector('.shares__list-element-image');

      if (!canUseWebP()) {
        loadImgNotSquare(banner, imgEl, 'jpg');
      } else {
        loadImgNotSquare(banner, imgEl, 'webp');
      }
    });
  }

  return element;
}

/*class CreateBannersMain extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
    this.template = `
      <div class="shares__header">
            <div class="shares__title">Акции</div>
        </div>
        <div class="shares__list">
            <div class="swiper-container">
                <div class="swiper-wrapper">

                </div>
            </div>
        </div>`;
  }

  create() {
    this.element.insertAdjacentHTML('beforeend', this.template);

    if (!isEmptyObj(dataPromo)) {
      dataPromo.successData.forEach((banner) => {
        this.templateSlide = `
            <div class="swiper-slide">
                <div class="shares__list-element">
                    <div class="shares__list-element-image"></div>
                    <div class="shares__list-element-desc">
                        <div class="shares__list-element-title">${banner.title}</div>
                        <div class="shares__list-element-text">${banner.intro}</div>
                    </div>
                </div>
            </div>`;
        this.wraper = this.element.querySelector('.swiper-wrapper');
        this.wraper.insertAdjacentHTML('beforeend', this.templateSlide);

        this.el = this.wraper.querySelector('.swiper-slide');
        this.el.addEventListener('click', () => {
          toggleModal.renderingPost(banner);
          toggleModal.openPage();
        });

        const imgEl = this.element.querySelector('.shares__list-element-image');

        if (!canUseWebP()) {
          loadImgNotSquare(banner, imgEl, 'jpg');
        } else {
          loadImgNotSquare(banner, imgEl, 'webp');
        }
      });
    }


    return super.create(this.element);
  }
}*/
