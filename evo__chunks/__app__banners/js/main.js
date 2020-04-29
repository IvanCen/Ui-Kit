class CreateBannersMain extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
    this.template = `
      <div class="banner__container">
        <div text="Hello" class="banners__banner banners__banner--type--rectangle">
            <div class="banners__banner-filler banners__banner-filler--type--rectangle"></div>
        </div>
        <div text="Hello" class="banners__banner banners__banner--type--rectangle">
            <div class="banners__banner-filler banners__banner-filler--type--rectangle"></div>
        </div>
        <div text="Hello" class="banners__banner banners__banner--type--rectangle">
            <div class="banners__banner-filler banners__banner-filler--type--rectangle"></div>
        </div>
        <div text="Hello" class="banners__banner banners__banner--type--rectangle">
            <div class="banners__banner-filler banners__banner-filler--type--rectangle"></div>
        </div>
    </div>`;
  }

  create() {
    this.element.insertAdjacentHTML('beforeend', this.template);

    return super.create(this.element);
  }
}

class CreateBannersOrder extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
    this.template = `
      <div class="banner__container">
        <div name="Blonde Caffe Americano" text="Hello" class="banners__banner banners__banner---type--circle">
            <div class="banners__banner-filler banners__banner-filler---type--circle"></div>
            <span class="banners__text">Starbucks Blonde Caffe Americano</span>
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

    this.card = this.element.querySelector('[name="Blonde Caffe Americano"]');
    if (typeof this.parameters.eventCard === 'object') {
      for (const event of this.parameters.eventCard) {
        this.card.addEventListener(event.type, event.callback);
      }


      return super.create(this.element);
    }
  }
}
function activeBanners() {
  const bannerContainer = document.querySelector('.banner__container');
  let dragStart = 0;
  let dragEnd = 0;
  let offsetX = 0;
  let offsetXOnStart = 0;

  const mainImages = bannerContainer.querySelectorAll('.banners__banner');
  const mainImagesCount = mainImages.length;
  let firstImageWidth = mainImages[0].offsetWidth;

  window.addEventListener('resize', () => {
    firstImageWidth = mainImages[0].offsetWidth;
  });

  bannerContainer.addEventListener('touchstart', (event) => {
    // event.preventDefault();
    // event.stopPropagation();
    dragStart = event.touches[0].clientX;
    offsetX = 0;
    bannerContainer.classList.remove('banner__container--with-animation');
  }, { passive: false });

  bannerContainer.addEventListener('touchmove', (event) => {
    // event.preventDefault();
    // event.stopPropagation();
    // нужно добавить проверку, которая будет проверять
    // направление смещения и если смещают вниз или вверх, то делать прокрутку,
    // после реализации надо будет включить отключение touch-action в css
    dragEnd = event.touches[0].clientX;
    offsetX = offsetXOnStart + dragEnd - dragStart;
    banners_animation('move');
  }, { passive: false });

  bannerContainer.addEventListener('touchend', (event) => {
    // event.preventDefault();
    // event.stopPropagation();
    offsetX = Math.round(offsetX / firstImageWidth) * firstImageWidth;
    offsetXOnStart = offsetX;
    bannerContainer.classList.add('banner__container--with-animation');
    banners_animation('end');
  }, { passive: false });

  /**
     *
     */
  function banners_animation(action) {
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
    }
    bannerContainer.style.transform = `translate3d(${offsetX}px,0,0)`;
  }
}
