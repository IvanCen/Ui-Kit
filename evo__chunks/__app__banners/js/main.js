function activeBanners() {
  const bannerContainers = document.querySelectorAll('.banner__container');
  let dragStart = 0;
  let dragEnd = 0;
  let offsetX = 0;
  let offsetXOnStart = 0;

  [...bannerContainers].forEach((item) => {
    const mainImages = item.querySelectorAll('.banners__banner');
    const mainImagesCount = mainImages.length;
    let firstImageWidth = mainImages[0].offsetWidth;

    window.addEventListener('resize', () => {
      firstImageWidth = mainImages[0].offsetWidth;
    });

    item.addEventListener('touchstart', (event) => {
      // event.preventDefault();
      // event.stopPropagation();
      dragStart = event.touches[0].clientX;
      item.classList.remove('banner__container--with-animation');
    }, { passive: false });

    item.addEventListener('touchmove', (event) => {
      // event.preventDefault();
      // event.stopPropagation();
      // нужно добавить проверку, которая будет проверять
      // направление смещения и если смещают вниз или вверх, то делать прокрутку,
      // после реализации надо будет включить отключение touch-action в css
      dragEnd = event.touches[0].clientX;
      offsetX = offsetXOnStart + dragEnd - dragStart;
      banners_animation('move');
    }, { passive: false });

    item.addEventListener('touchend', (event) => {
      // event.preventDefault();
      // event.stopPropagation();
      offsetX = Math.round(offsetX / firstImageWidth) * firstImageWidth;
      offsetXOnStart = offsetX;
      item.classList.add('banner__container--with-animation');
      banners_animation('end');
    }, { passive: false });

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
      item.style.transform = `translate3d(${offsetX}px,0,0)`;
    }
  });
}


class CreateBannersRectangle extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
    this.template = `
      <div class="banner__container">
        <div text="Hello" class="banners__banner banners__banner--type--rectangle banners__banner--size--${this.parameters.bannerSize}">
            <div class="banners__banner-filler banners__banner-filler--type--rectangle banners__banner-filler--size--${this.parameters.bannerSize}"></div>
        </div>
        <div text="Hello" class="banners__banner banners__banner--type--rectangle banners__banner--size--${this.parameters.bannerSize}">
            <div class="banners__banner-filler banners__banner-filler--type--rectangle banners__banner-filler--size--${this.parameters.bannerSize}"></div>
        </div>
        <div text="Hello" class="banners__banner banners__banner--type--rectangle banners__banner--size--${this.parameters.bannerSize}">
            <div class="banners__banner-filler banners__banner-filler--type--rectangle banners__banner-filler--size--${this.parameters.bannerSize}"></div>
        </div>
        <div text="Hello" class="banners__banner banners__banner--type--rectangle banners__banner--size--${this.parameters.bannerSize}">
            <div class="banners__banner-filler banners__banner-filler--type--rectangle banners__banner-filler--size--${this.parameters.bannerSize}"></div>
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
      toggleSubPageProductCard.rendering(productInfo);
      toggleSubPageProductCard.openPage();
    });

    const imgEl = this.element.querySelector('.banners__banner-filler');

    let devicePixelRatio = 0;
    devicePixelRatio = window.devicePixelRatio;
    const windowScreenWidth = window.screen.width * devicePixelRatio;
    function countScreenRatio(windowScreen) {
      const maxSize = 6000;
      if (windowScreen >= maxSize) {
        windowScreen = maxSize;
        return windowScreen;
      }
      return windowScreen;
    }

    function loadImg(timer) {
      function getCache(info) {
        if (info.success === false && info.errors[0] === 'Кеш файл еще не готов') {
          const timerSuccess = (delay) => setTimeout(() => {
            loadImg(timerSuccess);
            timerSuccess(delay * 2);
            if (delay > 32) {
              clearInterval(timer);
            }
          }, delay * 1000);
          timerSuccess(1);
        }
      }
      const screenRatio = countScreenRatio(Math.ceil(windowScreenWidth));
      const urlPhoto = productInfo.mainPhoto;
      if (urlPhoto !== null) {
        const regExp = /(assets\/images\/docs)(\/\d*\/)([\d\D]*\.)(\D+)/g;
        const productName = urlPhoto.name.replace(regExp, '$3');
        const img = document.createElement('img');
        img.src = `http://demo.xleb.ru/${urlPhoto.name}_cache/${urlPhoto.edit}/${screenRatio}x${screenRatio}/${productName}webp`;

        img.onerror = () => {
          const request = {
            method: 'image-cache-queue',
            originalFileUrl: urlPhoto.name,
            fileEditDate: urlPhoto.edit,
            extension: 'webp',
            sizeX: `${screenRatio}`,
            sizeY: `${screenRatio}`,
          };
          api.imageCacheQueueApi(request, getCache);
        };
        img.onload = () => {
          clearInterval(timer);
          imgEl.style.backgroundImage = `url(${img.src})`;
        };
      }
    }
    loadImg();

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

    this.card = this.element.querySelector('[name="Blonde Caffe Americano"]');
    if (typeof this.parameters.eventCard === 'object') {
      for (const event of this.parameters.eventCard) {
        this.card.addEventListener(event.type, event.callback);
      }
    }
    return super.create(this.element);
  }
}
