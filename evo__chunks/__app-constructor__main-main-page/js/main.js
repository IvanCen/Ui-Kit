class MainPage {
  constructor(parameters) {
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
    this.removeLastItemLine = this.removeLastItemLine.bind(this);
    this.body = document.querySelector('body');
    this.mainPage = document.querySelector('.main-page');
    this.mainPageContent = document.querySelector('.main-page__content');
  }

  closePage() {
    this.mainPageContent.classList.remove('main-page__content--size--small');
    this.mainPageContent.classList.remove('main-page__content--opened');
  }

  openPage() {
    this.mainPageContent = document.querySelector('.main-page__content-main');
    this.headerTitle = document.querySelector('.header__status');
    setTimeout(() => {
      if (this.mainPageContent) {
        this.mainPageContent.classList.add('main-page__content--opened');
        this.headerTitle.textContent = 'Главная';
      }
    }, 100);
    history.pushState({ state: '#' }, null, '#');
  }

  rendering() {
    this.mainPageContent = document.createElement('div');
    this.mainPageContent.classList.add('main-page__content', 'main-page__content--size--small', 'main-page__content-main', `${isIos ? 'main-page__content--ios' : 'main-page__content--no-ios'}`);
    this.mainPage.prepend(this.mainPageContent);

    const shopSelector = new CreateShopSelect(
      {
        style: ['shop-selector'],
        modifier: [`${isIos ? '--ios' : ''}`],
      },
    );

    const banners = new CreateBannersMain({
      selector: ['section'],
      style: ['shares'],
    });
    const catalog = new CreateCatalogMain({
      selector: ['section'],
      style: ['catalog'],
    });

    const ourHistoryMainCard = new CreateOurHistoryMainCard({
      selector: ['div'],
      style: ['main-card'],
      modifier: ['--theme--shadow',
        '--type--border',
      ],
      title: ['О компании ХЛЕБНИК'],
      text: ['Мы - пекарня ХЛЕБНИК, и мы хотим с вами познакомиться. Для этого мы каждый день открываем двери наших пекарен, запускаем производство и встаем за прилавок. Мы делаем первый шаг навстречу к вам.'],
      buttonText: ['Читать подробнее'],
    });

    this.postContainer = document.createElement('div');
    this.promoContainer = document.createElement('div');

    this.topBar = document.querySelector('.top-bar--main');

    this.promoContainer.classList.add('main-card__container-promo');
    this.postContainer.classList.add('main-card__container-posts');
    this.mainPageContent.append(banners.create());
    this.mainPageContent.append(shopSelector.create());
    this.mainPageContent.append(catalog.create());

    if (!isEmptyObj(userInfoObj)) {
      rateLastOrder();
    }
    api.getMessages();
    initCategories();
    checkEmptyBasket();
    checkStore();
    // this.removeLastItemLine();
    /* renderPromo(dataPromo);
    renderPosts(dataPosts);
    this.promoContainer.append(ourHistoryMainCard.create()); */
  }

  removeLastItemLine() {
    document.querySelectorAll('.catalog__list').forEach((item) => {
      const lastEl = item.lastElementChild.querySelector('.catalog__list-element-detail');
      if (lastEl) {
        lastEl.classList.remove('catalog__list-element-detail--type--border');
      }
    });
  }
}
