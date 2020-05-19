function activeLike() {
  const cardItemIconTypeLike = document.querySelectorAll('.card-item__icon--type--like');
  [...cardItemIconTypeLike].forEach((item) => {
    item.addEventListener('click', () => {
      item.classList.toggle('card-item__icon--liked');
    });
  });
}


class CreateCardItemOrder extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
  }

  create(productInfo, products) {
    this.element = document.createElement('div');
    this.element.classList.add('card-item', 'card-item--direction--row');
    this.element.id = productInfo.id;
    const { id } = this.element;
    this.element.addEventListener('click', () => {
      const category = [];
      for (const item of Object.values(products.items)) {
        if (item.category === Number(id)) {
          category.push(item);
        }
      }
      togglePageOrderCategory.rendering(productInfo.name, category);
      togglePageOrderCategory.openPage();
    });
    this.template = `
      <div class="card-item__image card-item__image--size--small"></div>
      <h3 class="card-item__title card-item__title--text--bold">${productInfo.name}</h3>`;

    this.element.insertAdjacentHTML('beforeend', this.template);

    const imgEl = this.element.querySelector('.card-item__image');

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

class CreateCardItemOrderProductCard extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
  }

  create(productInfo) {
    this.element = document.createElement('div');
    this.element.classList.add('card-item', 'card-item--direction--column');
    this.element.id = productInfo.id;
    this.element.addEventListener('click', () => {
      toggleSubPageProductCard.rendering(productInfo);
      toggleSubPageProductCard.openPage();
    });
    this.template = `
      <div class="card-item__image card-item__image--size--big"></div>
      <div class="card-item__info-container">
        <h3 class="card-item__title card-item__title--text--normal card-item__title--position--center">${productInfo.name}</h3>
        <span class="card-item__available-info card-item__available-info--show">
      </div>`;
    this.element.insertAdjacentHTML('beforeend', this.template);

    const imgEl = this.element.querySelector('.card-item__image');

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

class CreateCardItemContainerProductCard extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
  }

  create(identificator, classAdd) {
    this.element = document.createElement('div');
    if (classAdd) {
      this.element.classList.add(classAdd);
    }
    this.element.classList.add(
      'card-item__container',
      'card-item__container--with--border',
      'card-item__container--direction--row',
      `card-item__container--${identificator}`,
    );

    return this.element;
  }
}

class CreateCardItemContainer extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
  }

  create(identificator) {
    this.element = document.createElement('div');
    this.element.classList.add(
      'card-item__container',
      'card-item__container--indentation-column--small',
      'card-item__container--with--border',
      'card-item__container--direction--column',
      `card-item__container--${identificator}`,
    );

    return this.element;
  }
}

class CreateCardItemFavAndHisOrder extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
    this.template = `
      <div class="card-item__container card-item__container--direction--column card-item__container--indentation-column--normal">
        <div class="card-item card-item--direction--row card-item--border--bottom">
          <img src="[+chunkWebPath+]/img/card-image.jpg" alt="" class="card-item__image card-item__image--size--small">
          <div class="card-item__content-container">
            <h3 class="card-item__title card-item__title--text--bold">Lorem ipsum dolor sit amet.</h3>
            <span class="card-item__info card-item__info--indentation--normal">Lorem ipsum dolor sit amet.</span>
            <span class="card-item__info card-item__info--theme--shadow"> sit amet.</span>
            <div class="card-item__icon-container">
              <button class="card-item__button card-item__button--type--like">
                <svg class="card-item__icon card-item__icon--type--like" viewBox="0 0 24 24"
                     xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M1.8 9.80005C1.6 9.25005 1.5 8.67005 1.5 8.05005C1.5 5.15005 3.86 2.80005 6.75 2.80005C8.84 2.80005 10.66 4.03005 11.5 5.80005C11.7 6.22005 12.29 6.22005 12.5 5.80005C13.35 4.02005 15.16 2.80005 17.25 2.80005C20.14 2.80005 22.5 5.15005 22.5 8.05005C22.5 8.67005 22.39 9.27005 22.19 9.83005C21.93 10.56 21.51 11.21 20.97 11.76L12.02 20.66L3.4 12.09L3.39 12.08L3.38 12.07C3.17 11.89 2.98 11.7 2.8 11.49C2.35 10.99 2.02 10.42 1.8 9.80005Z"/>
                </svg>
              </button>
              <button class="card-item__button">
                <img src="[+chunkWebPath+]/img/icon-add-circle-plus.svg" alt=""
                     class="card-item__icon card-item__icon--type--add">
              </button>
            </div>
          </div>
        </div>
        <div class="card-item card-item--direction--row card-item--border--bottom">
          <img src="[+chunkWebPath+]/img/card-image.jpg" alt="" class="card-item__image card-item__image--size--small">
          <div class="card-item__content-container">
            <h3 class="card-item__title card-item__title--text--bold">Lorem ipsum dolor sit amet.</h3>
            <span class="card-item__info card-item__info--indentation--normal">Lorem ipsum dolor sit amet</span>
            <span class="card-item__info card-item__info--theme--shadow"> sit amet.</span>
            <div class="card-item__icon-container">
              <button class="card-item__button card-item__button--type--like">
                <svg class="card-item__icon card-item__icon--type--like" viewBox="0 0 24 24"
                     xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M1.8 9.80005C1.6 9.25005 1.5 8.67005 1.5 8.05005C1.5 5.15005 3.86 2.80005 6.75 2.80005C8.84 2.80005 10.66 4.03005 11.5 5.80005C11.7 6.22005 12.29 6.22005 12.5 5.80005C13.35 4.02005 15.16 2.80005 17.25 2.80005C20.14 2.80005 22.5 5.15005 22.5 8.05005C22.5 8.67005 22.39 9.27005 22.19 9.83005C21.93 10.56 21.51 11.21 20.97 11.76L12.02 20.66L3.4 12.09L3.39 12.08L3.38 12.07C3.17 11.89 2.98 11.7 2.8 11.49C2.35 10.99 2.02 10.42 1.8 9.80005Z"/>
                </svg>
              </button>
              <button class="card-item__button">
                <img src="[+chunkWebPath+]/img/icon-add-circle-plus.svg" alt=""
                     class="card-item__icon card-item__icon--type--add">
              </button>
            </div>
          </div>
        </div>
      </div>`;
  }

  create() {
    this.element.insertAdjacentHTML('beforeend', this.template);
    /* if (typeof this.parameters.events === 'object') {
      for (const event of this.parameters.events) {
        this.element.addEventListener(event.type, event.callback);
      }
    } */

    return super.create(this.element);
  }
}

class CreateCardItemReviewOrder extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
    this.template = `
      <div class="card-item__container card-item__container--direction--column card-item__container--indentation-column--normal">
        <div class="card-item card-item--direction--row card-item--border--bottom card-item--type--order">
          <img src="[+chunkWebPath+]/img/card-image.jpg" alt="" class="card-item__image card-item__image--size--small">
          <div class="card-item__content-container">
            <h3 class="card-item__title card-item__title--text--bold">Lorem ipsum dolor sit amet.</h3>
            <span class="card-item__info card-item__info--indentation--normal">Lorem ipsum dolor sit amet.</span>
            <span class="card-item__info card-item__info--theme--shadow"> sit amet.</span>
            <div class="card-item__icon-container">
              <button class="card-item__button card-item__button--type--like">
               <img src="[+chunkWebPath+]/img/icon-remove-circle.svg" alt=""
                     class="card-item__icon card-item__icon--type--minus">
              </button>
              <button class="card-item__button">
                <img src="[+chunkWebPath+]/img/icon-add-circle-plus.svg" alt=""
                     class="card-item__icon card-item__icon--type--plus">
              </button>
            </div>
          </div>
        </div>
        <div class="card-item card-item--direction--row card-item--border--bottom card-item--type--order">
          <img src="[+chunkWebPath+]/img/card-image.jpg" alt="" class="card-item__image card-item__image--size--small">
          <div class="card-item__content-container">
            <h3 class="card-item__title card-item__title--text--bold">Lorem ipsum dolor sit amet.</h3>
            <span class="card-item__info card-item__info--indentation--normal">Lorem ipsum dolor sit amet</span>
            <span class="card-item__info card-item__info--theme--shadow"> sit amet.</span>
            <div class="card-item__icon-container">
              <button class="card-item__button card-item__button--type--like">
               <img src="[+chunkWebPath+]/img/icon-remove-circle.svg" alt=""
                     class="card-item__icon card-item__icon--type--minus">
              </button>
              <button class="card-item__button">
                <img src="[+chunkWebPath+]/img/icon-add-circle-plus.svg" alt=""
                     class="card-item__icon card-item__icon--type--plus">
              </button>
            </div>
          </div>
        </div>
      </div>`;
  }

  create() {
    this.element.insertAdjacentHTML('beforeend', this.template);
    /* if (typeof this.parameters.events === 'object') {
      for (const event of this.parameters.events) {
        this.element.addEventListener(event.type, event.callback);
      }
    } */

    return super.create(this.element);
  }
}
