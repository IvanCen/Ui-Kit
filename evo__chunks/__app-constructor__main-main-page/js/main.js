class ToggleMain extends ToggleMainPage {
  constructor(parameters) {
    super(parameters);
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
  }

  rendering() {
    super.rendering();

    const mainPageTopBar = new CreateTopBar({
      selector: ['div'],
      style: ['top-bar'],
      modifier: [
        '--size--small',
        '--indentation--bottom',
        '--main',
      ],
      textTitle: ['Отличный день для кофе ☕'],
      eventOpenSignInPage: [{ type: 'click', callback: togglePageSignIn.rendering }],
      eventOpenInboxPage: [{ type: 'click', callback: togglePageInbox.rendering }],
      eventOpenAccountPage: [{ type: 'click', callback: togglePageAccount.rendering }],
      eventOpenHistory: [
        { type: 'click', callback: openHistory },

      ],
    });
    const mainPageMainCard = new CreateMainCard();
    /* const mainPageButtonJoinDark = new CreateButton(
      {
        selector: ['button'],
        style: ['button'],
        modifier: ['--size--small',
          '--theme--dark-transparent',
          '--indentation--left',
          '--indentation--bottom',
        ],
        text: ['Войти'],
        events: [{ type: 'click', callback: togglePageSignIn.rendering }],
      },
    ); */
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
      const mainPageContent = document.querySelector('.main-page__content');
      const postContainer = document.createElement('div');
      postContainer.classList.add('main-card__container-posts');
      /* const buttonDark = document.querySelector('.button--theme--dark-transparent');
      if (buttonDark !== null) {
        dataPosts.successData.forEach((item) => {
          buttonDark.after(mainPageMainCard.create(item));
        });
      } else {

      } */
      mainPageContent.append(postContainer);
      dataPosts.successData.forEach((item) => {
        postContainer.prepend(mainPageMainCard.create(item));
      });
    }
    function renderPromo(dataPromo) {
      const promoContainer = document.createElement('div');
      promoContainer.classList.add('main-card__container-promo');
      const topBar = document.querySelector('.top-bar--main');
      // const buttonDark = document.querySelector('.button--theme--dark-transparent');
      /*
      if (buttonDark !== null) {
        dataPromo.successData.forEach((item) => {
          buttonDark.after(mainPageMainCard.create(item));
        });
      } else {

      } */
      topBar.after(promoContainer);
      dataPromo.successData.forEach((item) => {
        promoContainer.prepend(mainPageMainCard.create(item));
      });
    }

    this.parameters.api.promoApi(renderPromo);

    /* if (localStorage.getItem('user-sign-in') === null) {
      this.mainPageContent.prepend(mainPageButtonJoinDark.create());
    } */

    setTimeout(() => this.parameters.api.postsApi(renderPosts), 1000);

    this.mainPageContent.prepend(mainPageTopBar.create());
    if (localStorage.getItem('user-sign-in') === null) {
      this.mainPageContent.append(mainPageButtonJoinOrange.create());
    }
    setTimeout(() => {
      const footerButtonMain = document.querySelector('.footer__button--type--main');
      activeFooter(footerButtonMain);
    }, 300);


    activeButton();
  }
}
