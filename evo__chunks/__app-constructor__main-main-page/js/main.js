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
    });

    const mainPageTitleBarSmall = new CreateTitleBar({
      selector: ['h2'],
      style: ['title-bar'],
      modifier: ['__title', '__title--size--small'],
      text: ['starbucks rewards'],
    });

    const mainPageTitleBar = new CreateTitleBar({
      selector: ['h2'],
      style: ['title-bar'],
      modifier: ['__title', '__title--size--medium-low'],
      text: ['Let Starbucks Rewards add'],
    });

    const mainPageBanners = new CreateBannersMain({
      selector: ['div'],
      style: ['banners'],
    });
    const mainPageMainCard = new CreateMainCard({
      selector: ['div'],
      style: ['main-card'],
      modifier: ['--type--border'],
    });


    const mainPageButtonJoinDark = new CreateButton(
      {
        selector: ['button'],
        style: ['button'],
        modifier: ['--size--small',
          '--theme--dark-transparent',
          '--indentation--left',
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
