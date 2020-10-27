class AccountPage {
  constructor(parameters) {
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
    this.closePage = this.closePage.bind(this);
    this.openPage = this.openPage.bind(this);
    this.body = document.querySelector('body');
    this.mainPage = document.querySelector('.main-page');
    this.mainPageContent = document.querySelector('.main-page__content');
  }

  deletePage() {
    if (this.mainPageContent) {
      this.mainPageContent.remove();
    }
  }

  closePage() {
    this.mainPageContent.classList.remove('main-page__content--size--small');
    this.mainPageContent.classList.remove('main-page__content--opened');
  }

  openPage() {
    this.mainPageContent = document.querySelector('.main-page__content-profile');
    this.headerTitle = document.querySelector('.header__status');
    setTimeout(() => {
      if (this.mainPageContent) {
        this.mainPageContent.classList.add('main-page__content--opened');
        this.headerTitle.textContent = 'Профиль';
      }
    }, 100);
    history.pushState({ state: '#' }, null, '#');
  }

  logout(info) {
    if (info.success) {
      const userInfoSection = document.querySelector('.profile__data');
      const buttonJoin = document.querySelector('.button--join');
      const buttonLogout = document.querySelector('.profile__logout');
      userInfoSection.classList.add('profile__data--hide');
      buttonJoin.classList.remove('button--hide');
      buttonLogout.classList.add('profile__logout--hide');
    }
  }

  rendering() {
    this.mainPageContent = document.createElement('div');
    this.mainPageContent.classList.add('main-page__content', 'main-page__content--size--small', 'main-page__content-profile');
    this.mainPage.append(this.mainPageContent);
    const accountButtonJoinTangerin = new CreateButton(
      {
        selector: ['button'],
        style: ['button'],
        modifier: ['--size--small',
          '--theme--tangerin',
          '--indentation--left',
          '--indentation--bottom',
          '--indentation--top',
          '--join',
          !isEmptyObj(userInfoObj) ? '--hide' : '',
        ],
        text: ['Присоединиться'],
        events: [
          {
            type: 'click',
            callback: () => {
              stopAction(() => {
                toggleModalPageSignIn.rendering();
              });
            },
          },
        ],
      },
    );
    const accountButtonLogoutTangerin = new CreateButton(
      {
        selector: ['button'],
        style: ['profile__logout'],
        text: ['Выйти'],
        events: [
          {
            type: 'click',
            callback: () => {
              stopAction(() => {
                api.logout(this.logout);
              });
            },
          },
        ],
      },
    );

    const accountTextArea = new CreateTextAreaAccount({
      selector: ['div'],
      style: ['wraper'],
    });
    const userProfileTextArea = new CreateTextAreaProfile({
      selector: ['section'],
      style: ['profile__data'],
      modifier: [isEmptyObj(userInfoObj) ? '--hide' : ''],
    });

    this.buttonContainer = document.createElement('div');
    this.mainPageContent.prepend(createTopBarIos());
    this.buttonContainer.append(accountButtonJoinTangerin.create());
    this.mainPageContent.append(userProfileTextArea.create());
    if (!isEmptyObj(userInfoObj)) {
      this.buttonContainer.append(accountButtonLogoutTangerin.create());
    }
    this.mainPageContent.append(accountTextArea.create());
    this.mainPageContent.append(this.buttonContainer);
  }
}
