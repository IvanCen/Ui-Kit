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
      modifier: ['--size--medium', '--indentation--bottom'],
      textTitle: ['Личный кабинет'],
      eventBack: [
        { type: 'click', callback: this.closePage },
        { type: 'click', callback: this.deletePage },
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
              this.closePage();
              this.deletePage();
              setTimeout(() => {
                togglePageSignIn.rendering();
              }, 300);
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
          { type: 'click', callback: api.logout },
        ],
      },
    );
    const accountButtonEditUserTangerin = new CreateButton(
      {
        selector: ['button'],
        style: ['button'],
        modifier: ['--size--small',
          '--theme--tangerin-transparent',
          '--indentation--left',
          '--indentation--bottom',
        ],
        text: ['Профиль'],
        events: [
          { type: 'click', callback: toggleSubPageAccountEditUser.rendering },
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
              this.closePage();
              this.deletePage();
              setTimeout(() => {
                togglePageSignIn.rendering();
              }, 300);
            },
          },
        ],
      },
    );

    const accountTextArea = new CreateTextAreaAccount({
      selector: ['div'],
      style: ['wraper'],
    });

    this.buttonContainer = document.createElement('div');
    this.page.prepend(createTopBarIos());
    this.page.prepend(accountTopBar.create());
    if (localStorage.getItem('user-sign-in') === null) {
      this.buttonContainer.append(accountButtonJoinTangerin.create());
      this.buttonContainer.append(accountButtonJoinTangerinTransparent.create());
    } else {
      this.buttonContainer.append(accountButtonLogoutTangerin.create());
      this.buttonContainer.append(accountButtonEditUserTangerin.create());
    }
    this.page.append(this.buttonContainer);
    this.page.append(accountTextArea.create());
    activeButton();
    this.openPage();
  }
}
