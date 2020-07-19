function activeBanners(containerBanners, isSwipe) {
  let dragStart = 0;
  let dragEnd = 0;
  let offsetX = 0;
  let offsetXOnStart = 0;
  const counterTopBar = document.querySelector('.top-bar__all-counter-order');
  const counterBottomBar = document.querySelector('.bottom-bar__counter');

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
      setTimeout(() => {
        counterTopBar.textContent = Number(counterTopBar.textContent) - 1;
        counterBottomBar.textContent = Number(counterBottomBar.textContent) - 1;
        for (const [index, item] of Object.entries(basketArray)) {
          if (item.id === Number(containerBanners.getAttribute('id'))) {
            basketArray.splice(index, 1);
            break;
          }
        }
        localStorage.setItem('basket', JSON.stringify(basketArray));
        counterBasket();
        checkBasket();
        containerBanners.remove();
      }, 300);
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
      const page = this.element.closest('.page');
      if (!page.classList.contains('stop-action')) {
        toggleSubPageProductCard.rendering(productInfo);
        toggleSubPageProductCard.openPage();
        page.classList.add('stop-action');
      }
      setTimeout(() => page.classList.remove('stop-action'), 1000);
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
