class TogglePageSignIn extends TogglePage {
  constructor(parameters) {
    super(parameters);
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
  }

  rendering() {
    super.rendering();
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
