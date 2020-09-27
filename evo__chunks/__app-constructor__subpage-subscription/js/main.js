class ToggleModalPageSubscription extends ToggleSubPage {
  constructor(parameters) {
    super(parameters);
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
  }

  rendering() {
    super.rendering();
    const topBar = new CreateTopBarSubscription({
      selector: ['div'],
      style: ['top-bar'],
      modifier: [
        `${isIos ? '--indentation--top' : ''}`,
        '--theme--dark-perl',
      ],
      eventBack: [
        {
          type: 'click',
          callback: () => {
            this.closePage();
            this.deletePage();
          },
        },
      ],
      eventToggleActualSubscription: [
        {
          type: 'click',
          callback: () => {
            toggleSubscriptionTabMy.clearPage();
            toggleSubscriptionTabActual.rendering();
          },
        },
      ],
      eventToggleMySubscription: [
        {
          type: 'click',
          callback: () => {
            toggleSubscriptionTabActual.clearPage();
            toggleSubscriptionTabMy.rendering();
          },
        },
      ],
    });

    this.subPage.prepend(topBar.create());
    this.subPage.prepend(createTopBarIos());

    const topBarTabs = this.subPage.querySelectorAll('.top-bar__tab');
    switchActive(topBarTabs, 'top-bar__tab--active-light');
    toggleSubscriptionTabActual.rendering();
    this.openPage();
  }
}
