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
      ],
      textTitle: ['Отличный день для кофе ☕'],
      eventOpenSignInPage: [{ type: 'click', callback: togglePageSignIn.rendering }],
      eventOpenInboxPage: [{ type: 'click', callback: togglePageInbox.rendering }],
      eventOpenAccountPage: [{ type: 'click', callback: togglePageAccount.rendering }],
    });
    const mainPageTitleBarSmall = new CreateTitleBar({
      selector: ['h2'],
      style: ['title-bar'],
      modifier: ['__title', '__title--size--small', '--indentation--top'],
      text: ['starbucks rewards'],
    });
    const mainPageTitleBar = new CreateTitleBar({
      selector: ['h2'],
      style: ['title-bar'],
      modifier: ['__title', '__title--size--medium-low'],
      text: ['Let Starbucks Rewards add'],
    });
    const mainPageBanners = new CreateBannersRectangle({
      selector: ['div'],
      style: ['banners'],
      bannerSize: ['medium'],
    });
    const mainPageMainCard = new CreateMainCard();
    const mainPageButtonJoinDark = new CreateButton(
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
    );
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
      const buttonDark = document.querySelector('.button--theme--dark-transparent');
      const topBar = document.querySelector('.top-bar');
      if (buttonDark !== null) {
        dataPosts.successData.forEach((item) => {
          buttonDark.after(mainPageMainCard.create(item));
        });
      } else {
        dataPosts.successData.forEach((item) => {
          topBar.after(mainPageMainCard.create(item));
        });
      }
    }
    function renderPromo(dataPromo) {
      const buttonDark = document.querySelector('.button--theme--dark-transparent');
      const topBar = document.querySelector('.top-bar');
      if (buttonDark !== null) {
        dataPromo.successData.forEach((item) => {
          buttonDark.after(mainPageMainCard.create(item));
        });
      } else {
        dataPromo.successData.forEach((item) => {
          topBar.after(mainPageMainCard.create(item));
        });
      }
    }

    if (localStorage.getItem('user-sign-in') === null) {
      this.mainPageContent.prepend(mainPageButtonJoinOrange.create());
    }
    this.parameters.api.postsApi(renderPosts);
    if (localStorage.getItem('user-sign-in') === null) {
      this.mainPageContent.prepend(mainPageButtonJoinDark.create());
    }
    // this.mainPageContent.prepend(mainPageTitleBar.create());
    // this.mainPageContent.prepend(mainPageBanners.create());
    this.parameters.api.promoApi(renderPromo);
    // this.mainPageContent.prepend(mainPageTitleBarSmall.create());
    this.mainPageContent.prepend(mainPageTopBar.create());

    activeBanners();
    activeButton();
  }
}
