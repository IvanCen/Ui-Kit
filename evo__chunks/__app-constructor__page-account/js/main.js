class TogglePageAccount extends TogglePage {
  constructor(parameters) {
    super(parameters);
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
  }

  rendering() {
    super.rendering();
    const accountTopBar = new CreateTopBarWithBackButton({
      selector: ['div'],
      style: ['top-bar'],
      modifier: [`--size--medium${isIos ? '--ios' : ''}`, '--indentation--bottom'],
      textTitle: ['Личный кабинет'],
      eventBack: [
        {
          type: 'click',
          callback: () => {
            checkMessageInbox();
            this.closePage();
            this.deletePage();
          },
        },
      ],
    });
    const accountButtonJoinTangerin = new CreateButton(
      {
        selector: ['button'],
        style: ['button'],
        modifier: ['--size--small',
          '--theme--tangerin',
          '--indentation--left',
          '--indentation--bottom',
        ],
        text: ['Присоединиться'],
        events: [
          {
            type: 'click',
            callback: () => {
              stopAction(() => {
                this.closePage();
                this.deletePage();
                setTimeout(() => {
                  toggleModalPageSignIn.rendering();
                }, 300);
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
                this.closePage();
                this.deletePage();
                setTimeout(() => {
                  toggleModalPageSignIn.rendering();
                }, 300);
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
      title: userInfoObj.successData.name,
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
    if (userInfoObj.successData.birthday !== '') {
      textAreaBirthday = new CreateTextArea({
        selector: ['div'],
        style: ['text-area'],
        title: userInfoObj.successData.birthday,
        text: ['Ваш день рождения'],
      });
    } else {
      textAreaBirthday = new CreateTextArea({
        selector: ['div'],
        style: ['text-area'],
        title: userInfoObj.successData.birthday,
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
      title: userInfoObj.successData.phone,
      text: ['Ваш телефон'],
    });
    const textAreaEmail = new CreateTextArea({
      selector: ['div'],
      style: ['text-area'],
      identifier: ['email'],
      title: userInfoObj.successData.email,
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
    this.page.prepend(createTopBarIos());
    this.page.prepend(accountTopBar.create());
    if (isEmptyObj(userInfoObj)) {
      this.buttonContainer.append(accountButtonJoinTangerin.create());
      this.buttonContainer.append(accountButtonJoinTangerinTransparent.create());
    } else {
      this.buttonContainer.append(accountButtonLogoutTangerin.create());
    }
    this.page.append(this.buttonContainer);
    this.page.append(textAreaName.create());
    this.page.append(textAreaBirthday.create());
    this.page.append(textAreaPhone.create());
    this.page.append(textAreaEmail.create());
    this.page.append(accountTextArea.create());

    this.openPage();
  }
}
