class TogglePageOurHistory extends TogglePage {
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
      modifier: [`--size--medium${isIos ? '--ios' : ''}`, '--indentation--bottom', '--theme--light'],
      textTitle: [''],
      eventBack: [
        { type: 'click', callback: this.closePage },
        { type: 'click', callback: this.deletePage },
      ],
    });
    const textArea = new CreateTextAreaApplication({
      selector: ['div'],
      style: ['text-area-wraper'],
    });


    this.page.append(createTopBarIos());
    this.page.append(topBar.create());
    this.page.append(textArea.create(applicationDataObj['our-history']));

    this.openPage();
  }
}
