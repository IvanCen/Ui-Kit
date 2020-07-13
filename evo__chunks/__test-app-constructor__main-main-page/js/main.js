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
      style: ['top-bar'],
      modifier: [
        '--indentation--bottom',
        '--main',
      ],
      textTitle: ['Отличный день для кофе ☕'],
      eventOpenSignInPage: [{ type: 'click', callback: togglePageSignIn.rendering }],
      eventOpenInboxPage: [{ type: 'click', callback: togglePageInbox.rendering }],
      eventOpenAccountPage: [{ type: 'click', callback: togglePageAccount.rendering }],
      eventOpenBalanceFill: [{ type: 'click', callback: togglePageBalanceFill.rendering }],
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
      events: [{ type: 'click', callback: togglePageSignIn.rendering }],
    });


    function renderPosts(dataPosts) {
      console.log(dataPosts);
      const mainPageContent = document.querySelector('.main-page__content-main');
      const postContainer = document.createElement('div');
      postContainer.classList.add('main-card__container-posts');

      mainPageContent.append(postContainer);
      dataPosts.successData.forEach((item) => {
        postContainer.prepend(mainPageMainCard.create(item));
      });
    }

    function renderPromo(dataPromo) {
      const promoContainer = document.createElement('div');
      promoContainer.classList.add('main-card__container-promo');
      const topBar = document.querySelector('.top-bar--main');
      topBar.after(promoContainer);
      dataPromo.successData.forEach((item) => {
        promoContainer.prepend(mainPageMainCard.create(item));
        setTimeout(() => {
          const mainPage = document.querySelector('.main-page');
          const loader = document.querySelector('.loader');
          mainPage.classList.remove('main-page--loaded');
          loader.classList.add('loader--hide');
        }, 1000);
      });
      if (!isEmptyObj(userDataObj)) {
        rateLastOrder();
      }
    }

    this.parameters.api.promoApi(renderPromo);
    this.parameters.api.postsApi(renderPosts);

    this.mainPageContent.prepend(mainPageTopBar.create());
    this.mainPageContent.prepend(createTopBarIos());
    this.mainPageContent.append(ourHistoryMainCard.create());

    if (isEmptyObj(userInfoObj)) {
      this.mainPageContent.append(mainPageButtonJoinOrange.create());
    }
    setTimeout(() => {
      const footerButtonMain = document.querySelector('.footer__button--type--main');
      activeFooter(footerButtonMain);
    }, 300);

    const topBarContentContainer = document.querySelector('.top-bar__content-container--theme--dark');
    const topBar = document.querySelector('.top-bar');

    this.mainPageContent.addEventListener('scroll', () => {
      if (this.mainPageContent.scrollTop < 140) {
        if (topBarContentContainer.classList.contains('top-bar__content-container--hide')) {
          const containerPromo = document.querySelector('.main-card__container-promo');
          topBarContentContainer.classList.remove('top-bar__content-container--hide');
          topBar.classList.remove(`top-bar--sticky${isIos ? '--ios' : ''}`);
          containerPromo.classList.remove('main-card__container-promo--indentation--top');
        }
      } if (this.mainPageContent.scrollTop > 140) {
        if (!topBarContentContainer.classList.contains('top-bar__content-container--hide')) {
          const containerPromo = document.querySelector('.main-card__container-promo');
          topBarContentContainer.classList.add('top-bar__content-container--hide');
          topBar.classList.add(`top-bar--sticky${isIos ? '--ios' : ''}`);
          containerPromo.classList.add('main-card__container-promo--indentation--top');
        }
      }
    });

    checkMessageInbox();
    activeButton();
  }
}
