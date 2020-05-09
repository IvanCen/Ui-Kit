class ToggleSubPageApplication extends ToggleSubPage {
  constructor(parameters) {
    super(parameters);
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
  }

  rendering() {
    super.rendering();
    const applicationTopBar = new CreateTopBarWithBackButton({
      selector: ['div'],
      style: ['top-bar'],
      modifier: ['--size--medium', '--indentation--bottom-big', '--theme--light'],
      textTitle: ['Application Terms'],
      eventBack: [
        { type: 'click', callback: this.closePage },
        { type: 'click', callback: this.deletePage },
      ],
    });
    const applicationTextArea = new CreateTextAreaApplication({
      selector: ['div'],
      style: ['text-area-wraper'],
      text: ['Contrary to popular belief, Lorem Ipsum is not simply\n          random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.\n          Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure\n          Latin words, consectetur, from a Lore'],
      eventShare: [],
    });


    this.subPage.append(applicationTopBar.create());
    this.subPage.append(applicationTextArea.create());

    this.openPage();
  }
}
