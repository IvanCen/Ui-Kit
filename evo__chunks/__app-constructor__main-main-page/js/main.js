class ToggleMain extends ToggleMainPage {
  constructor(parameters) {
    super(parameters);
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
  }

  rendering() {
    super.rendering('main');
    if (returnPageObj) {
      returnPageObj.returnMainPageAfterSignIn = false;
    }
    const mainPageTopBar = new CreateTopBar({
      selector: ['div'],
      style: ['top-bar'],
      modifier: [
        '--indentation--bottom',
        '--main',
      ],
      textTitle: ['Отличный день для кофе ☕'],
      eventOpenSignInPage: [{
        type: 'click',
        callback: () => {
          stopAction(() => {
            returnPageObj.returnMainPageAfterSignIn = true;
            toggleModalPageSignIn.rendering();
          });
        },
      }],
      eventOpenInboxPage: [{
        type: 'click',
        callback: () => {
          stopAction(() => {
            togglePageInbox.rendering();
          });
        },
      }],
      eventOpenAccountPage: [{
        type: 'click',
        callback: () => {
          stopAction(() => {
            togglePageAccount.rendering();
          });
        },
      }],
      eventOpenBalanceFill:
        [{
          type: 'click',
          callback: () => {
            stopAction(() => {
              togglePageBalanceFill.rendering();
            });
          },
        }],
      eventOpenHistory: [
        { type: 'click', callback: openHistory },

      ],
    });
    const mainPageMainCard = new CreateMainCard();

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
          mainPage.classList.remove('main-page--loaded');
          loader.classList.add('loader--hide');
          loader.remove();
        }
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

    renderPromo(dataPromo);
    renderPosts(dataPosts);
    this.promoContainer.append(ourHistoryMainCard.create());

    if (isEmptyObj(userInfoObj)) {
      this.mainPageContent.append(mainPageButtonJoinOrange.create());
    }
    setTimeout(() => {
      this.footerButtonMain = document.querySelector('.footer__button--type--main');
      activeFooter(this.footerButtonMain);
    }, 300);


    if (!isEmptyObj(userInfoObj)) {
      this.topBarContentContainer = document.querySelector('.top-bar__content-container--theme--dark');

      this.mainPageContent.addEventListener('scroll', () => {
        if (this.mainPageContent.scrollTop < 212) {
          if (this.topBarContentContainer.classList.contains('top-bar__content-container--hide')) {
            this.topBarContentContainer.classList.remove('top-bar__content-container--hide');
            this.topBar.classList.remove(`top-bar--fixed${isIos ? '--ios' : ''}`);
            this.promoContainer.classList.remove(`main-card__container-promo--indentation--top${isIos ? '--ios' : ''}`);
          }
        } if (this.mainPageContent.scrollTop > 212) {
          if (!this.topBarContentContainer.classList.contains('top-bar__content-container--hide')) {
            this.topBarContentContainer.classList.add('top-bar__content-container--hide');
            this.topBar.classList.add(`top-bar--fixed${isIos ? '--ios' : ''}`);
            this.promoContainer.classList.add(`main-card__container-promo--indentation--top${isIos ? '--ios' : ''}`);
          }
        }
      });
    }

    checkMessageInbox();
  }
}
