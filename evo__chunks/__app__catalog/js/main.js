class CreateCatalogMain extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
    this.renderDrinksCategory = this.renderDrinksCategory.bind(this);
    this.renderFoodCategory = this.renderFoodCategory.bind(this);
    this.renderHitsCategory = this.renderHitsCategory.bind(this);
    this.openSearchPage = this.openSearchPage.bind(this);
  }

  create() {
    this.template = `

        <div class="catalog__header">
        <div class="catalog__title">Каталог</div>
    </div>
    <div class="swiper-container catalog__categories">
        <div class="swiper-wrapper">
            <div class="swiper-slide banners__banner">
                <div class="catalog__categories-element catalog__categories-element--active" data-id="34">
                    <div class="catalog__categories-element-image">
                        <svg width="26" height="27" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0)">
                                <path d="M23.4102 16.7976H2.58984C1.74845 16.7976 1.06641 16.1156 1.06641 15.2742C1.06641 14.4328 1.74845 13.7508 2.58984 13.7508H23.4102C24.2516 13.7508 24.9336 14.4328 24.9336 15.2742C24.9336 16.1156 24.2516 16.7976 23.4102 16.7976Z" fill="#7E7E7E"/>
                                <path d="M18.4844 6.18437L19.3911 4.97542C19.338 4.83857 19.2793 4.69887 19.2134 4.55683C18.6291 3.29726 17.3829 1.61259 14.7643 0.739713C14.5457 0.666842 14.3062 0.694721 14.1123 0.819135C13.9185 0.943498 13.7915 1.14683 13.7666 1.37585C13.7654 1.38636 13.6315 2.43819 12.8275 3.63637C11.9045 5.01204 10.5111 6.0202 8.67841 6.64232C15.823 9.58382 18.458 6.21941 18.4844 6.18437Z" fill="#7E7E7E"/>
                                <path d="M8.06508 26.7H10.3377L10.0584 18.3211H7.22719L8.06508 26.7Z" fill="#7E7E7E"/>
                                <path d="M15.6623 26.7H17.9349L18.7728 18.3211H15.9416L15.6623 26.7Z" fill="#7E7E7E"/>
                                <path d="M19.466 26.7H19.8344C20.9561 26.7 21.9041 25.8969 22.0885 24.7905L23.1668 18.3211H20.3039L19.466 26.7Z" fill="#7E7E7E"/>
                                <path d="M11.862 26.7H14.138L14.4173 18.3211H11.5827L11.862 26.7Z" fill="#7E7E7E"/>
                                <path d="M3.91148 24.7905C4.09591 25.8969 5.0439 26.7 6.16555 26.7H6.53402L5.69613 18.3211H2.83324L3.91148 24.7905Z" fill="#7E7E7E"/>
                                <path d="M19.9911 6.71442L19.7031 7.09842C19.6661 7.14783 18.7731 8.31535 16.7878 8.95346C15.9275 9.22997 14.9883 9.36906 13.9859 9.36906C13.6739 9.36906 13.3558 9.35555 13.0319 9.32858C11.3688 9.19 9.54677 8.69153 7.61653 7.84704L6.46826 7.34471C6.01971 7.53981 5.5023 7.81276 4.99439 8.18697C3.97973 8.93467 2.84934 10.2045 2.60345 12.2273H23.6233C23.6252 11.8735 23.5991 11.4845 23.5248 11.0761C23.2783 9.72006 22.4555 7.91047 19.9911 6.71442Z" fill="#7E7E7E"/>
                            </g>
                            <defs>
                                <clipPath id="clip0">
                                    <rect width="26" height="26" fill="white" transform="translate(0 0.700012)"/>
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                    <span>Еда</span>
                </div>
            </div>
            <div class="swiper-slide banners__banner">
                <div class="catalog__categories-element" data-id="33">
                    <div class="catalog__categories-element-image">
                        <svg width="20" height="26" viewBox="0 0 20 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.9409 10.4772L17.1783 7.91794H2.57931L2.81545 10.4772H16.9409Z" fill="#7E7E7E"/>
                            <path d="M6.02836 26H6.02933L13.7227 25.9967C14.7371 25.9963 15.5726 25.2343 15.6663 24.2243L15.9589 21.0685H3.79268L4.08407 24.2267C4.17736 25.2377 5.01321 26 6.02836 26V26Z" fill="#7E7E7E"/>
                            <path d="M17.1655 0.370363C17.0081 0.201407 16.7493 0 16.4106 0C16.4105 0 16.4104 0 16.4102 0L3.35259 0.00523068C3.01341 0.00538303 2.75421 0.207298 2.59637 0.37666C2.20514 0.796689 1.99998 1.45794 2.0468 2.14671L2.06066 2.29683H17.6995L17.7141 2.13945C17.7612 1.45073 17.5564 0.789884 17.1655 0.370363V0.370363Z" fill="#7E7E7E"/>
                            <path d="M18.6796 3.82034H1.32035C0.685605 3.82034 0.169189 4.33671 0.169189 4.97145V5.24335C0.169189 5.87809 0.685605 6.39445 1.32035 6.39445H18.6796C19.3144 6.39445 19.8308 5.87809 19.8308 5.24335V4.97145C19.8308 4.33671 19.3144 3.82034 18.6796 3.82034Z" fill="#7E7E7E"/>
                            <path d="M16.7997 12.0007H2.95602L3.65211 19.545H16.1001L16.7997 12.0007Z" fill="#7E7E7E"/>
                        </svg>
                    </div>
                    <span>Напитки</span>
                </div>
            </div>
            <div class="swiper-slide banners__banner">
                <div class="catalog__categories-element" data-id="hits">
                    <div class="catalog__categories-element-image">
                        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M25.9627 10.017C25.8731 9.7412 25.6348 9.5402 25.3479 9.49856L17.2878 8.3273L13.6831 1.02361C13.5548 0.763611 13.29 0.59903 13.0001 0.59903C12.7101 0.59903 12.4453 0.763611 12.317 1.02361L8.71216 8.3273L0.652192 9.49856C0.365329 9.5402 0.126912 9.7412 0.0373345 10.0169C-0.052294 10.2927 0.0224557 10.5954 0.230099 10.7978L6.0622 16.4829L4.68563 24.5106C4.63657 24.7964 4.75408 25.0851 4.98864 25.2556C5.12133 25.352 5.2785 25.401 5.43643 25.401C5.55769 25.401 5.67936 25.3721 5.79078 25.3135L13 21.5233L20.2089 25.3135C20.4656 25.4484 20.7766 25.4259 21.0111 25.2555C21.2457 25.0851 21.3632 24.7963 21.3142 24.5105L19.9372 16.4829L25.77 10.7977C25.9776 10.5954 26.0524 10.2927 25.9627 10.017Z" fill="#7E7E7E"/>
                        </svg>
                    </div>
                    <span>Хиты</span>
                </div>
            </div>
            <div class="swiper-slide banners__banner">
                <div class="catalog__categories-element catalog__categories-element--favorite" data-id="favorite">
                    <div class="catalog__categories-element-image">
                        <svg width="46" height="46" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.1835 17.9999L7.18335 18.2275L7.39258 18.1379L12.0002 16.1632L16.6077 18.1379L16.8168 18.2275V18V7.33333C16.8168 6.51716 16.1497 5.85 15.3335 5.85H8.66683C7.84971 5.85 7.19021 6.51809 7.19016 7.33324C7.19016 7.33327 7.19016 7.3333 7.19016 7.33333L7.1835 17.9999ZM11.9402 14.4092L8.81683 15.771V7.48333H15.1835V15.771L12.0601 14.4092L12.0002 14.383L11.9402 14.4092Z" fill="#7E7E7E" stroke="#7E7E7E" stroke-width="0.1"/>
                        </svg>
                    </div>
                    <span>Избранное</span>
                </div>
            </div>
            
            <div class="swiper-slide banners__banner">
                <div class="catalog__categories-element--search">
                    <div class="catalog__categories-element-image">
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.40824 18.8155C11.5792 18.8155 13.5749 18.0687 15.1673 16.8304L20.3371 22L22 20.3372L16.8302 15.1676C18.0697 13.5742 18.8165 11.5786 18.8165 9.40774C18.8165 4.22055 14.5957 0 9.40824 0C4.22077 0 0 4.22055 0 9.40774C0 14.5949 4.22077 18.8155 9.40824 18.8155ZM9.40824 2.35193C13.2997 2.35193 16.4644 5.51646 16.4644 9.40774C16.4644 13.299 13.2997 16.4635 9.40824 16.4635C5.51676 16.4635 2.35206 13.299 2.35206 9.40774C2.35206 5.51646 5.51676 2.35193 9.40824 2.35193Z" fill="white"/>
                        </svg>
                    </div>
                    <span></span>
                </div>
            </div>
        </div>
    </div>
    <div class="catalog__tags catalog__tags--show" data-id="34">
        <div class="swiper-container catalog__tags-container catalog__tags-container-foods">
            <div class="swiper-wrapper">
                <div class="swiper-slide banners__banner">
                    <button class="catalog__tags-element catalog__tags-element--selected" data-id="34">Все</button>
                </div>
                <div class="swiper-slide banners__banner">
                    <button class="catalog__tags-element" data-id="93">Кулинария</button>
                </div>
                <div class="swiper-slide banners__banner">
                    <button class="catalog__tags-element" data-id="146">Слойка</button>
                </div>
                <div class="swiper-slide banners__banner">
                    <button class="catalog__tags-element" data-id="196">Печенье</button>
                </div>
                <div class="swiper-slide banners__banner">
                    <button class="catalog__tags-element" data-id="201">Пирожные</button>
                </div>
                <div class="swiper-slide banners__banner">
                    <button class="catalog__tags-element" data-id="234">Сэндвич</button>
                </div>
                <div class="swiper-slide banners__banner">
                    <button class="catalog__tags-element" data-id="256">Торты</button>
                </div>
                <div class="swiper-slide banners__banner">
                    <button class="catalog__tags-element" data-id="286">Хлеб</button>
                </div>
                <div class="swiper-slide banners__banner">
                    <button class="catalog__tags-element" data-id="586">Выпечка</button>
                </div>
            </div>
         </div>
    </div>
    <div class="catalog__tags" data-id="33">
        <div class="swiper-container catalog__tags-container catalog__tags-container-drinks">
            <div class="swiper-wrapper">
                <div class="swiper-slide banners__banner">
                    <button class="catalog__tags-element catalog__tags-element--selected" data-id="33">Все</button>
                </div>
                <div class="swiper-slide banners__banner">
                    <button class="catalog__tags-element" data-id="41">Горячие напитки</button>
                </div>
                <div class="swiper-slide banners__banner">
                    <button class="catalog__tags-element" data-id="324">Холодные напитки</button>
                </div>
            </div>
         </div>
    </div>
    <div class="catalog__content">
        <div class="catalog__list catalog__list--show catalog__list-food" data-id="34"></div>
        <div class="catalog__list catalog__list-drinks" data-id="33"></div>
        <div class="catalog__list catalog__list-hit" data-id="hits"></div>
        <div class="catalog__list catalog__list-favorite" data-id="favorite"></div>
    </div>
    `;

    this.element.insertAdjacentHTML('beforeend', this.template);

    const card = new CreateCardItemProductCardNew();
    const drinksContainer = this.element.querySelector('.catalog__list-drinks');
    const foodContainer = this.element.querySelector('.catalog__list-food');
    const hitContainer = this.element.querySelector('.catalog__list-hit');
    const searchButton = this.element.querySelector('.catalog__categories-element--search');
    const favoriteContainer = this.element.querySelector('.catalog__list-favorite');
    const favoriteButton = this.element.querySelector('.catalog__categories-element--favorite');

    favoriteButton.addEventListener('click', () => {
      [...favoriteContainer.children].forEach((el) => el.remove());
      this.renderFavoriteCategory(favoriteContainer, card);
    });
    searchButton.addEventListener('click', this.openSearchPage);

    this.renderFoodCategory(foodContainer, card);
    this.renderDrinksCategory(drinksContainer, card);
    this.renderHitsCategory(hitContainer, card);

    const catalogTags = this.element.querySelector('.catalog__tags[data-id="33"]');
    const wrapper = catalogTags.querySelector('.swiper-wrapper');
    function active() {
      activeBanners(wrapper);
      wrapper.removeEventListener('touchstart', active);
    }
    wrapper.addEventListener('touchstart', active);

    return super.create(this.element);
  }

  openSearchPage() {
    toggleModalPageOrderSearch.openPage();
  }

  renderFoodCategory(container, el) {
    Object.entries(dataProductApi.successData.categoriesTree[4].children[34].children).forEach(([key, value]) => {
      this.catalogContent = this.element.querySelector('.catalog__content');
      this.catalogList = document.createElement('div');
      this.catalogList.classList.add('catalog__list');
      this.catalogList.setAttribute('data-id', key);
      this.catalogContent.append(this.catalogList);
      this.containerCat = this.element.querySelector(`.catalog__list[data-id='${key}']`);
      value.items.forEach((i) => {
        this.containerCat.append(el.create(dataProductApi.successData.items[i]));
        container.append(el.create(dataProductApi.successData.items[i]));
      });
    });
  }

  renderDrinksCategory(container, el) {
    Object.entries(dataProductApi.successData.categoriesTree[4].children[33].children).forEach(([key, value]) => {
      this.catalogContent = this.element.querySelector('.catalog__content');
      this.catalogList = document.createElement('div');
      this.catalogList.classList.add('catalog__list');
      this.catalogList.setAttribute('data-id', key);
      this.catalogContent.append(this.catalogList);
      this.containerCat = this.element.querySelector(`.catalog__list[data-id='${key}']`);
      value.items.forEach((i) => {
        this.containerCat.append(el.create(dataProductApi.successData.items[i]));
        container.append(el.create(dataProductApi.successData.items[i]));
      });
    });
  }

  renderHitsCategory(container, el) {
    Object.values(dataProductApi.successData.hits).forEach((item) => {
      container.append(el.create(dataProductApi.successData.items[item]));
    });
  }

  renderFavoriteCategory(container, el) {
    const productsItems = dataProductApi.successData.items;
    itemsArray.forEach((item) => {
      if (productsItems[item.id] !== undefined && !isEmptyObj(item) && item.id === productsItems[item.id].id) {
        container.append(el.create(dataProductApi.successData.items[item.id]));
      }
    });
  }
}
