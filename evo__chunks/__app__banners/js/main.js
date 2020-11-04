function activeBanners(containerBanners, isSwipe, funcCheckBasket = () => {}) {
  let dragStart = 0;
  let dragEnd = 0;
  let offsetX = 0;
  let offsetXOnStart = 0;


  function bannersAnimation(action) {
    if (offsetX > 0) {
      // тут действия, если тянется влево дальше минимума
      if (action === 'end') {
        offsetX = 0;
        dragStart = 0;
        dragEnd = 0;
        offsetXOnStart = 0;
      } else if (action === 'move') {
        offsetX /= 2; // уменьшапем скорость смещения в 2 раза
      }
    }
    const maxOffsetWidth = -1 * ((mainImagesCount - 1) * firstImageWidth);
    if (offsetX < maxOffsetWidth) {
      // тут действия, если тянется вправо дальше максимума
      if (action === 'end') {
        offsetX = maxOffsetWidth;
        dragStart = 0;
        dragEnd = 0;
        offsetXOnStart = maxOffsetWidth;
      } else if (action === 'move') {
        offsetX = (offsetX + maxOffsetWidth) / 2; // уменьшапем скорость смещения в 2 раза
      }
    } else if (maxOffsetWidth / 2 > offsetX && action === 'end' && isSwipe) {
      (() => {
        if (!containerBanners.classList.contains('stop-action')) {
          setTimeout(() => {
            for (const [index, item] of Object.entries(basketArray)) {
              console.log(item.id, Number(containerBanners.getAttribute('id')), item.id === Number(containerBanners.getAttribute('id')));
              if (item.id === Number(containerBanners.getAttribute('id'))) {
                basketArray.splice(index, 1);
                break;
              }
            }

            localStorage.setItem('basket', JSON.stringify(basketArray));


            checkEmptyBasket();
            containerBanners.remove();
            checkBasketCounter();
            countResultPriceAndAllProductCounter();
          }, 300);
          containerBanners.classList.add('stop-action');
        }
        setTimeout(() => containerBanners.classList.remove('stop-action'), 1000);
      })();
    }
    containerBanners.style.transform = `translate3d(${offsetX}px,0,0)`;
  }

  const mainImages = containerBanners.querySelectorAll('.banners__banner');
  const mainImagesCount = mainImages.length;
  let firstImageWidth = mainImages[0].offsetWidth;

  window.addEventListener('resize', () => {
    firstImageWidth = mainImages[0].offsetWidth;
  });

  containerBanners.addEventListener('touchstart', (event) => {
    // event.preventDefault();
    // event.stopPropagation();
    dragStart = event.touches[0].clientX;
    containerBanners.classList.remove('banner__container--with-animation');
  }, { passive: false });

  containerBanners.addEventListener('touchmove', (event) => {
    // event.preventDefault();
    // event.stopPropagation();
    dragEnd = event.touches[0].clientX;
    offsetX = offsetXOnStart + dragEnd - dragStart;
    bannersAnimation('move');
  }, { passive: false });

  containerBanners.addEventListener('touchend', (event) => {
    // event.preventDefault();
    // event.stopPropagation();
    offsetX = Math.round(offsetX / firstImageWidth) * firstImageWidth;
    offsetXOnStart = offsetX;
    containerBanners.classList.add('banner__container--with-animation');
    bannersAnimation('end');
  }, { passive: false });
}


class CreateBannerRectangle extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
  }

  create() {
    this.element = document.createElement('div');
    this.element.classList.add('banners__banner', 'banners__banner---type--rectangle', `banners__banner--size--${this.parameters.bannerSize}`);
    this.template = `
            <div style="background-image: url('[+chunkWebPath+]/img/img__card-item--reward.jpg')" class="banners__banner-filler banners__banner-filler--type--rectangle banners__banner-filler--size--${this.parameters.bannerSize}"></div>
        `;
    this.element.insertAdjacentHTML('beforeend', this.template);

    return super.create(this.element);
  }
}

class CreateBannersOrder extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
  }

  create(productInfo) {
    console.log(productInfo);
    this.element = document.createElement('div');
    this.element.classList.add('banners__banner', 'banners__banner---type--circle');
    this.template = `
          <div class="banners__banner-filler banners__banner-filler---type--circle"></div>
          <span class="banners__text">${productInfo.name}</span>
          `;
    this.element.insertAdjacentHTML('beforeend', this.template);
    this.element.addEventListener('click', () => {
      stopAction(() => {
        toggleModalPageCard.rendering(productInfo);
        toggleModalPageCard.openPage();
      });
    });

    const imgEl = this.element.querySelector('.banners__banner-filler');
    if (!canUseWebP()) {
      loadImg(productInfo, imgEl, 'jpg');
    } else {
      loadImg(productInfo, imgEl, 'webp');
    }

    return this.element;
  }
}

class CreateBannersContainerOrder extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
  }

  create() {
    this.element = document.createElement('div');
    this.element.classList.add('banners');
    this.template = '<div class="banner__container"></div>';
    this.element.insertAdjacentHTML('beforeend', this.template);

    return this.element;
  }
}

class CreateBannersTabHits extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
    this.template = `
      <div class="banner__container">
        <div text="Hello" class="banners__banner banners__banner---type--circle">
            <div class="banners__banner-filler banners__banner-filler---type--circle"></div>
            <span class="banners__text"></span>
        </div>
        <div text="Hello" class="banners__banner banners__banner---type--circle">
            <div class="banners__banner-filler banners__banner-filler---type--circle"></div>
        </div>
        <div text="Hello" class="banners__banner banners__banner---type--circle">
            <div class="banners__banner-filler banners__banner-filler---type--circle"></div>
        </div>
        <div text="Hello" class="banners__banner banners__banner---type--circle">
            <div class="banners__banner-filler banners__banner-filler---type--circle"></div>
        </div>
    </div>`;
  }

  create() {
    this.element.insertAdjacentHTML('beforeend', this.template);

    return super.create(this.element);
  }
}

class CreateBannersMain extends CreateItem {
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
}
