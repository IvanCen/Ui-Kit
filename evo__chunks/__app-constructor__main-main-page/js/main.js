class ToggleMain extends ToggleMainPage {
  constructor(parameters) {
    super(parameters);
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
  }

  rendering() {
    super.rendering('main');
    const mainPageTopBar = new CreateTopBar({
      selector: ['div'],
      style: ['header'],
      eventOpenBasket: [{
        type: 'click',
        callback: () => {
          stopAction(() => {
            if (!isEmptyObj(userStore)) {
              stopAction(() => {
                toggleModalPageReviewOrder.rendering();
              });
            } else {
              stopAction(() => {
                toggleStores.rendering(true);
                toggleStores.openPage();
              });
            }
          });
        },
      }],
      eventOpenMenu: [{
        type: 'click',
        callback: () => {
          Navigation.toggle();
        },
      }],
    });
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


    function renderPosts(dataPosts) {
      const postContainer = document.querySelector('.main-card__container-posts');
      dataPosts.successData.forEach((item) => {
        if (postContainer) {
          postContainer.prepend(mainPageMainCard.create(item));
        }
      });
    }

    function renderPromo(dataPromo) {
      const promoContainer = document.querySelector('.main-card__container-promo');
      dataPromo.successData.forEach((item) => {
        if (promoContainer) {
          promoContainer.prepend(mainPageMainCard.create(item));
        }
      });
      setTimeout(() => {
        const mainPage = document.querySelector('.main-page');
        const loader = document.querySelector('.loader');
        if (loader) {
          loader.classList.add('loader--hide');
          loader.remove();
        }
        api.getMessages();
      }, 1000);
      if (!isEmptyObj(userInfoObj)) {
        rateLastOrder();
      }
    }

    this.postContainer = document.createElement('div');
    this.promoContainer = document.createElement('div');
    this.mainPageContent.prepend(mainPageTopBar.create());
    this.mainPageContent.prepend(createTopBarIos());
    this.topBar = document.querySelector('.top-bar--main');

    this.promoContainer.classList.add('main-card__container-promo');
    this.postContainer.classList.add('main-card__container-posts');
    this.mainPageContent.append(this.promoContainer);
    this.mainPageContent.append(this.postContainer);
    this.mainPageContent.append(banners.create());
    this.mainPageContent.append(textAreaBalanceMain.create());
    this.mainPageContent.append(catalog.create());


    initCategories();
    checkEmptyBasket();
    /* renderPromo(dataPromo);
    renderPosts(dataPosts);
    this.promoContainer.append(ourHistoryMainCard.create()); */
  }
}
