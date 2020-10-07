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
        this.headerTitle.textContent = 'Личный кабинет';
      }
    }, 100);
    history.pushState({ state: '#' }, null, '#');
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
        style: ['button'],
        modifier: ['--size--small',
          '--theme--tangerin',
          '--indentation--left',
          '--indentation--bottom',
          '--indentation--top',
        ],
        text: ['Выйти'],
        events: [
          {
            type: 'click',
            callback: () => {
              stopAction(() => {
                api.logout();
              });
            },
          },
        ],
      },
    );
    const accountButtonJoinTangerinTransparent = new CreateButton(
      {
        selector: ['button'],
        style: ['button'],
        modifier: ['--size--small',
          '--theme--tangerin-transparent',
          '--indentation--left',
          '--indentation--bottom',
        ],
        text: ['Войти'],
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
    const textAreaName = new CreateTextArea({
      selector: ['div'],
      style: ['text-area'],
      identifier: ['name'],
      title: !isEmptyObj(userInfoObj) ? userInfoObj.successData.name : '',
      text: ['Ваше имя'],
      isButton: true,
      eventButton: [
        {
          type: 'click',
          callback: () => {
            stopAction(() => {
              toggleSubPageEditUser.rendering({
                titleTopBar: 'Редактирование имени',
                inputLabel: 'Введите новое имя',
                identifier: 'name',
                inputType: 'text',
              });
            });
          },
        },
      ],
    });
    let textAreaBirthday;
    if (!isEmptyObj(userInfoObj) && userInfoObj.successData.birthday !== '') {
      textAreaBirthday = new CreateTextArea({
        selector: ['div'],
        style: ['text-area'],
        title: !isEmptyObj(userInfoObj) ? userInfoObj.successData.birthday : '',
        text: ['Ваш день рождения'],
      });
    } else {
      textAreaBirthday = new CreateTextArea({
        selector: ['div'],
        style: ['text-area'],
        title: !isEmptyObj(userInfoObj) ? userInfoObj.successData.birthday : '',
        text: ['Ваш день рождения'],
        isButton: true,
        eventButton: [
          {
            type: 'click',
            callback: () => {
              stopAction(() => {
                toggleSubPageEditUser.rendering({
                  titleTopBar: 'Редактирование даты рождения',
                  inputLabel: '',
                  identifier: 'birthday',
                  inputType: 'date',
                });
              });
            },
          },
        ],
      });
    }

    const textAreaPhone = new CreateTextArea({
      selector: ['div'],
      style: ['text-area'],
      title: !isEmptyObj(userInfoObj) ? userInfoObj.successData.phone : '',
      text: ['Ваш телефон'],
    });
    const textAreaEmail = new CreateTextArea({
      selector: ['div'],
      style: ['text-area'],
      identifier: ['email'],
      title: !isEmptyObj(userInfoObj) ? userInfoObj.successData.email : '',
      text: ['Ваш email'],
      isButton: true,
      eventButton: [
        {
          type: 'click',
          callback: () => {
            stopAction(() => {
              toggleSubPageEditUser.rendering({
                titleTopBar: 'Редактирование email',
                inputLabel: 'Введите новый email',
                identifier: 'email',
                inputType: 'email',
                text: 'На ваш email будет отправлена ссылка, пройдите по ней, для подтверждения.',
              });
            });
          },
        },
      ],
    });

    const accountTextArea = new CreateTextAreaAccount({
      selector: ['div'],
      style: ['wraper'],
    });

    this.buttonContainer = document.createElement('div');
    this.mainPageContent.prepend(createTopBarIos());
    if (isEmptyObj(userInfoObj)) {
      this.buttonContainer.append(accountButtonJoinTangerin.create());
      this.buttonContainer.append(accountButtonJoinTangerinTransparent.create());
    } else {
      this.buttonContainer.append(accountButtonLogoutTangerin.create());
      this.mainPageContent.append(textAreaName.create());
      this.mainPageContent.append(textAreaBirthday.create());
      this.mainPageContent.append(textAreaPhone.create());
      this.mainPageContent.append(textAreaEmail.create());
    }
    this.mainPageContent.append(this.buttonContainer);
    this.mainPageContent.append(accountTextArea.create());
  }
}
