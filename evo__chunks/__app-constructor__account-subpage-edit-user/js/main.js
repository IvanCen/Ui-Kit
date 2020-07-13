class ToggleSubPageAccountEditUser extends ToggleSubPage {
  constructor(parameters) {
    super(parameters);
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
  }


  rendering() {
    super.rendering();
    const topBar = new CreateTopBarWithBackButton({
      selector: ['div'],
      style: ['top-bar'],
      modifier: [`${isIos ? '--size--small--ios' : '--size--small'}`],
      textTitle: ['Ваш профиль'],
      eventBack: [
        { type: 'click', callback: this.closePage },
        { type: 'click', callback: this.deletePage },
      ],
    });
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
            toggleThirdPageEditUser.rendering({
              titleTopBar: 'Редактирование имени',
              inputLabel: 'Введите новое имя',
              identifier: 'name',
              inputType: 'text',
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
              toggleThirdPageEditUser.rendering({
                titleTopBar: 'Редактирование даты рождения',
                inputLabel: '',
                identifier: 'birthday',
                inputType: 'date',
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
      modifier: ['--indentation--bottom'],
      identifier: ['email'],
      title: userInfoObj.successData.email,
      text: ['Ваш email'],
      isButton: true,
      eventButton: [
        {
          type: 'click',
          callback: () => {
            toggleThirdPageEditUser.rendering({
              titleTopBar: 'Редактирование email',
              inputLabel: 'Введите новый email',
              identifier: 'email',
              inputType: 'email',
              text: 'На ваш email будет отправлена ссылка, пройдите по ней, для подтверждения.',
            });
          },
        },
      ],
    });
    const buttonJoinOrange = new CreateButton({
      selector: ['button'],
      style: ['button'],
      modifier: [
        '--size--big',
        '--theme--tangerin',
        '--theme--shadow-big',
        '--type--fixed',
      ],
      text: ['Редактировать'],
      eventsOpen: [
        { type: 'click', callback: togglePageSignIn.rendering },
      ],
    });
    this.subPage.append(createTopBarIos());
    this.subPage.append(topBar.create());
    this.subPage.append(textAreaName.create());
    this.subPage.append(textAreaBirthday.create());
    this.subPage.append(textAreaPhone.create());
    this.subPage.append(textAreaEmail.create());
    this.subPage.append(buttonJoinOrange.create());


    this.openPage();
  }
}
