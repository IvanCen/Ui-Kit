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
      modifier: ['--size--small'],
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
    const mainPageMainCard = new CreateMainCard({
      selector: ['div'],
      style: ['main-card'],
      modifier: ['--type--border', '--theme--shadow'],
    });
    const mainPageButtonJoinDark = new CreateButton(
      {
        selector: ['button'],
        style: ['button'],
        modifier: ['--size--small',
          '--theme--dark-transparent',
          '--indentation--left',
          '--indentation--bottom',
        ],
        text: ['Join Now'],
      },
    );
    const mainPageButtonJoinOrange = new CreateButton({
      selector: ['button'],
      style: ['button'],
      modifier: ['--size--big',
        '--theme--tangerin',
        '--indentation--bottom',
        '--indentation--right',
        '--position--right',
        '--theme--shadow-big',
      ],
      text: ['Join Now'],
      events: [{ type: 'click', callback: togglePageSignIn.rendering }],
    });

    this.mainPageContent.prepend(mainPageButtonJoinOrange.create());
    this.mainPageContent.prepend(mainPageMainCard.create());
    this.mainPageContent.prepend(mainPageButtonJoinDark.create());
    this.mainPageContent.prepend(mainPageTitleBar.create());
    this.mainPageContent.prepend(mainPageBanners.create());
    this.mainPageContent.prepend(mainPageTitleBarSmall.create());
    this.mainPageContent.prepend(mainPageTopBar.create());

    activeBanners();
    activeButton();
  }
}
