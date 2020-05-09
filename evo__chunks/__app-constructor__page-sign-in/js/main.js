class TogglePageSignIn extends TogglePage {
  constructor(parameters) {
    super(parameters);
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
  }

  rendering() {
    super.rendering();
    const signInTopBar = new CreateTopBarWithCloseIcon({
      selector: ['div'],
      style: ['top-bar'],
      modifier: ['--size--small'],
      textTitle: ['Sign in to Rewards'],
      eventCloseIcon: [
        { type: 'click', callback: this.closePage },
        { type: 'click', callback: this.deletePage },
      ],
    });
    const formInputSignIn = new CreateFormInputSignIn({
      selector: ['div'],
      style: ['form'],
      modifier: ['--indentation--sign-in', '--indentation'],
      events: [
        { type: 'click', callback: this.closePage },
        { type: 'click', callback: this.deletePage },
      ],
    });

    this.page.append(signInTopBar.create());
    this.page.append(formInputSignIn.create());
    inputFlyLabel();
    inputVisibleTogglePass();
    validation();
    this.openPage();
  }
}
