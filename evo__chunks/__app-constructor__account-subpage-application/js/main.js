class ToggleSubPageApplication extends ToggleSubPage {
  constructor(parameters) {
    super(parameters);
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
  }

  rendering(info) {
    super.rendering();
    const applicationTopBar = new CreateTopBarWithBackButton({
      selector: ['div'],
      style: ['top-bar'],
      modifier: ['--size--medium', '--indentation--bottom', '--theme--light'],
      textTitle: [''],
      eventBack: [
        { type: 'click', callback: this.closePage },
        { type: 'click', callback: this.deletePage },
      ],
    });
    const applicationTextArea = new CreateTextAreaApplication({
      selector: ['div'],
      style: ['text-area-wraper'],
    });


    this.subPage.append(applicationTopBar.create());
    this.subPage.append(applicationTextArea.create(info));

    this.openPage();
  }
}
