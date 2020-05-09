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
      modifier: ['--size--medium', '--indentation--bottom-big'],
      textTitle: ['Account'],
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
          '--indentation--top',
        ],
        text: ['Join Now'],
      },
    );
    const accountButtonJoinTangerinTransparent = new CreateButton(
      {
        selector: ['button'],
        style: ['button'],
        modifier: ['--size--small',
          '--theme--tangerin-transparent',
          '--indentation--left',
          '--indentation--top',
        ],
        text: ['Sign in'],
        events: [
          { type: 'click', callback: this.closePage },
          { type: 'click', callback: this.clearPage },
          { type: 'click', callback: togglePageSignIn.rendering },
        ],
      },
    );
    const accountTitleBarPreference = new CreateTitleBar({
      selector: ['h2'],
      style: ['title-bar'],
      modifier: ['__title', '__title--size--medium-low', '--indentation--top-big'],
      text: ['Настройки уведомлений'],
    });
    const accountTitleBarWithCheckboxSlide = new CreateTitleBarWithCheckboxSlide({
      selector: ['div'],
      style: ['title-bar'],
      modifier: ['__title', '__title--size--medium-low'],
      titleSize: ['small-big'],
      title: ['Входящие сообщения'],
    });
    const accountTitleBarHelp = new CreateTitleBar({
      selector: ['h2'],
      style: ['title-bar'],
      modifier: ['__title', '__title--size--medium-low'],
      text: ['Help & policies'],
    });
    const accountTextArea = new CreateTextAreaAccount({
      selector: ['div'],
      style: ['wraper'],
      //eventHelp: [{ type: 'click', callback: togglePageSignIn.rendering }],
      eventApplication: [{ type: 'click', callback: toggleSubPageApplication.rendering }],
      //eventPrivacy: [{ type: 'click', callback: togglePageSignIn.rendering }],
      //eventAnalytics: [{ type: 'click', callback: togglePageSignIn.rendering }],
    });

    this.buttonContainer = document.createElement('div');
    this.page.prepend(accountTopBar.create());
    this.buttonContainer.append(accountButtonJoinTangerin.create());
    this.buttonContainer.append(accountButtonJoinTangerinTransparent.create());
    this.page.append(this.buttonContainer);
    this.page.append(accountTitleBarPreference.create());
    this.page.append(accountTitleBarWithCheckboxSlide.create());
    this.page.append(accountTitleBarHelp.create());
    this.page.append(accountTextArea.create());
    activeButton();
    this.openPage();
  }
}
