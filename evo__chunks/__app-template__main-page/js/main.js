const mainPage = document.querySelector('.main-page');
const mainPageContent = document.querySelector('.main-page__content');
const body = document.querySelector('body');

class TogglePageSignIn extends TogglePage {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
  }

  rendering() {
    this.body.append(createPage());
    this.page = document.querySelector('.page');
    const signInTopBar = new CreateTopBarSignIn({
      selector: ['div'],
      style: ['top-bar'],
      modifier: ['--size--small'],
      textTitle: ['Sign in to Rewards'],
      eventCloseIcon: [
        { type: 'click', callback: this.closePage },
        { type: 'click', callback: this.deletePage },
      ],
    });
    const formInputSignIn = createFormInputSignIn({
      selector: ['div'],
      modifier: ['form'],
      events: [
        { type: 'click', callback: this.closePage },
        { type: 'click', callback: this.deletePage },
      ],
    });

    this.page.append(signInTopBar.create());
    this.page.append(formInputSignIn);
    inputFlyLabel();
    inputVisibleTogglePass();
    validation();
    this.openPage();
  }
}

class TogglePageCards extends TogglePage {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
  }

  rendering() {
    this.body.append(createPage());
    this.page = document.querySelector('.page');
    const signInTopBar = new CreateTopBarSignIn({
      selector: ['div'],
      style: ['top-bar'],
      modifier: ['--size--small'],
      textTitle: ['Cards'],
      eventCloseIcon: [
        { type: 'click', callback: this.closePage },
        { type: 'click', callback: this.deletePage },
      ],
    });

    this.page.append(signInTopBar.create());

    this.openPage();
  }
}

const togglePageSignIn = new TogglePageSignIn();
const togglePageCards = new TogglePageCards();

function renderMainPage() {
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

  const mainPageSwiper = new CreateBanners({
    selector: ['div'],
    style: ['banners'],
  });
  const mainPageMainCard = new CreateMainCard({
    selector: ['div'],
    style: ['main-card'],
    modifier: ['--type--border'],
  });
  const mainPageFooter = new CreateFooter({
    selector: ['div'],
    style: ['footer'],
    eventOpenMainPage: [{ type: 'click', callback: renderMainPage }],
    eventOpenCardsPage: [{ type: 'click', callback: togglePageCards.rendering }],
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

  mainPage.prepend(mainPageSwiper.create());
  mainPage.prepend(mainPageTitleBarSmall.create());
  mainPage.prepend(mainPageTopBar.create());
  mainPageContent.append(mainPageTitleBar.create());
  mainPageContent.append(mainPageButtonJoinDark.create());
  mainPageContent.append(mainPageMainCard.create());
  mainPageContent.append(mainPageButtonJoinOrange.create());
  mainPage.append(mainPageFooter.create());

  switchActiveFooter();
  activeBanners();
  activeButton();
}
renderMainPage();
