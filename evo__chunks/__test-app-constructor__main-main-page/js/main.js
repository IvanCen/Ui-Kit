/**
 * Функция создания элемента главной страницы с контейнером для контента
 * @return {HTMLDivElement}
 */
function createElementMainPage() {
  const mainPage = document.createElement('div');
  mainPage.classList.add('main-page');
  return mainPage;
}

/**
 * Создает контейнер для контента главной страницы
 * @returns {HTMLDivElement}
 */
function createElementMainPageContent() {
  const mainPageContent = document.createElement('div');
  mainPageContent.classList.add(
    'main-page__content',
    'main-page__content--size--small',
    'main-page__content-main',
    'main-page__content--opened',
  );
  return mainPageContent;
}

/**
 * Создает контейнер для контента главной страницы и добавляет в него компоненты
 * @returns {HTMLDivElement}
 */
function renderMainPageContent() {
  const mainPageContent = createElementMainPageContent();
  const banners = createBanners();
  mainPageContent.append(banners);
  return mainPageContent;
}

/**
 * Создает экземпляр главной страницы, добавляет в DOM вместе с контентом
 */
function renderMainPage() {
  const mainPage = createElementMainPage();
  const mainPageContent = renderMainPageContent();
  const topBar = createTopBar();

  mainPage.append(topBar);
  mainPage.append(mainPageContent);

  document.body.append(mainPage);
}

class MainPages {
  constructor(parameters) {
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
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
    this.mainPageContent.classList.add('main-page__content', 'main-page__content--size--small', 'main-page__content-main');
    this.mainPage.prepend(this.mainPageContent);

    const mainPageMainCard = new CreateMainCard();
    const textAreaBalanceMain = new CreateTextAreaBalanceMain({
      selector: ['section'],
      style: ['balance-section'],
      eventsButton: [
        {
          type: 'click',
          callback: () => {
            stopAction(() => {
              togglePageBalanceFill.rendering();
            });
          },
        },
      ],
    });
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

    const mainPageButtonJoinOrange = new CreateButton({
      selector: ['button'],
      style: ['button'],
      modifier: ['--size--big',
        '--theme--tangerin',
        '--position--right',
        '--theme--shadow-big',
        '--type--fixed',
      ],
      text: ['Войти'],
      events: [{
        type: 'click',
        callback: () => {
          stopAction(() => {
            returnPageObj.returnMainPageAfterSignIn = true;
            toggleModalPageSignIn.rendering();
          });
        },
      }],
    });


    this.postContainer = document.createElement('div');
    this.promoContainer = document.createElement('div');

    this.topBar = document.querySelector('.top-bar--main');

    this.promoContainer.classList.add('main-card__container-promo');
    this.postContainer.classList.add('main-card__container-posts');
    this.mainPageContent.append(banners.create());
    if (!isEmptyObj(userInfoObj)) {
      this.mainPageContent.append(textAreaBalanceMain.create());
    }
    this.mainPageContent.append(catalog.create());

    if (!isEmptyObj(userInfoObj)) {
      rateLastOrder();
    }
    api.getMessages();
    initCategories();
    checkEmptyBasket();
    /* renderPromo(dataPromo);
    renderPosts(dataPosts);
    this.promoContainer.append(ourHistoryMainCard.create()); */
  }
}
