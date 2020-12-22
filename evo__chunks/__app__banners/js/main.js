function activeBanners(containerBanners, { isSwipe = false, margin = 8, count = 1 } = {}) {
  if (containerBanners) {
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
      // const maxOffsetWidth = (-1 * ((mainElementsCount - 1) * (firstElementsWidth) + (mainElementsCount * 8)));
      const maxOffsetWidth = (-1 * ((mainElementsCount - count) * (firstElementsWidth) + (mainElementsCount * margin)));
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

    const mainEl = containerBanners.querySelectorAll('.banners__banner');
    const mainElementsCount = mainEl.length;
    let firstElementsWidth = mainEl[0].offsetWidth;

    if (mainEl) {
      window.addEventListener('resize', () => {
        firstElementsWidth = mainEl[0].offsetWidth;
      });
    }


    containerBanners.addEventListener('touchstart', (event) => {
      dragStart = event.touches[0].clientX;
      containerBanners.classList.remove('banner__container--with-animation');
    }, { passive: false });

    containerBanners.addEventListener('touchmove', (event) => {
      dragEnd = event.touches[0].clientX;
      offsetX = offsetXOnStart + dragEnd - dragStart;
      bannersAnimation('move');
    }, { passive: false });

    containerBanners.addEventListener('touchend', (event) => {
      offsetX = Math.round(offsetX / firstElementsWidth) * firstElementsWidth;
      offsetXOnStart = offsetX;
      containerBanners.classList.add('banner__container--with-animation');
      bannersAnimation('end');
    }, { passive: false });
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

    if (!isEmptyObj(dataPromo) && !isEmptyObj(dataPosts)) {
      [...dataPosts.successData, ...dataPromo.successData].forEach((banner) => {
        this.swiperSlide = document.createElement('div');
        this.swiperSlide.classList.add('swiper-slide');
        this.templateSlide = ` 
                <div class="shares__list-element banners__banner">
                    <div class="shares__list-element-image"></div>
                    <div class="shares__list-element-desc">
                        <div class="shares__list-element-title">${banner.title}</div>
                        <div class="shares__list-element-text">${banner.intro}</div>
                    </div>
              </div>`;
        this.swiperSlide.insertAdjacentHTML('beforeend', this.templateSlide);
        this.swiperSlide.addEventListener('click', () => {
          toggleModal.renderingPost(banner);
          toggleModal.openPage();
        });

        const imgEl = this.swiperSlide.querySelector('.shares__list-element-image');
        if (!canUseWebP()) {
          loadImgPostsAndPromos(banner, imgEl, 'jpg');
        } else {
          loadImgPostsAndPromos(banner, imgEl, 'webp');
        }
        this.wraper = this.element.querySelector('.swiper-wrapper');
        this.wraper.append(this.swiperSlide);
      });
    }


    return super.create(this.element);
  }
}
