const mainPage = document.querySelector('.main-page');
const mainPageContent = document.querySelector('.main-page__content');
const body = document.querySelector('body');

function toggleSignInPage() {
  body.append(createPage());
  const page = document.querySelector('.page');

  function deletePage() {
    setTimeout(() => page.remove(), 200);
  }

  function closePage() {
    page.classList.remove('page--opened');
    body.classList.remove('body');
  }

  function openPage() {
    setTimeout(() => {
      page.classList.add('page--opened');
      body.classList.add('body');
    }, 100);
  }

  function renderSubPage() {
    const signInTopBar = new CreateTopBarSignIn({
      selector: ['div'],
      style: ['top-bar'],
      modifier: ['--size--small'],
      textTitle: ['Sign in to Rewards'],
      eventCloseIcon: [
        { type: 'click', callback: closePage },
        { type: 'click', callback: deletePage },
      ],
    });
    const formInputSignIn = createFormInputSignIn({
      selector: ['div'],
      modifier: ['form'],
      events: [
        { type: 'click', callback: closePage },
        { type: 'click', callback: deletePage },
      ],
    });

    page.append(signInTopBar.create());
    page.append(formInputSignIn);
    inputFlyLabel();
    inputVisibleTogglePass();
    validation();
  }

  renderSubPage();
  openPage();
}

function toggleCardPage() {
  body.append(createPage());
  const page = document.querySelector('.page');

  function deletePage() {
    setTimeout(() => page.remove(), 200);
  }

  function closePage() {
    page.classList.remove('page--opened');
    body.classList.remove('body');
  }

  function openPage() {
    setTimeout(() => {
      page.classList.add('page--opened');
      body.classList.add('body');
    }, 100);
  }

  function renderSubPageCards() {
    const signInTopBar = new CreateTopBarSignIn({
      selector: ['div'],
      style: ['top-bar'],
      modifier: ['--size--small'],
      textTitle: ['Cards'],
      eventCloseIcon: [
        { type: 'click', callback: closePage },
        { type: 'click', callback: deletePage },
      ],
    });

    page.append(signInTopBar.create());
  }

  renderSubPageCards();
  openPage();
}

function renderMainPage() {
  const mainPageTopBar = new CreateTopBar({
    selector: ['div'],
    style: ['top-bar'],
    modifier: ['--size--small'],
    textTitle: ['Отличный день для кофе ☕'],
    eventOpenSignInPage: [{ type: 'click', callback: toggleSignInPage }],
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
    eventOpenCardsPage: [{ type: 'click', callback: toggleCardPage }],
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
    events: [{ type: 'click', callback: toggleSignInPage }],
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
