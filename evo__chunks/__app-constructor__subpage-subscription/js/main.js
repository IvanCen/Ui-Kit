class ToggleModalPageSubscription extends ToggleModalPage {
  constructor(parameters) {
    super(parameters);

    this.className = 'subscription';

    this.body.append(createModalPage(this.className));

    this.modalPageEl = document.querySelector(`.modal-page-${this.className}`);
    this.modalPageContentEl = document.querySelector(`.modal-page-${this.className}__content`);

    this.closePage = this.closePage.bind(this);
    this.deletePage = this.deletePage.bind(this);
    this.openPage = this.openPage.bind(this);
    this.rendering = this.rendering.bind(this);
    this.clearPage = this.clearPage.bind(this);
  }

  clearPage() {
    super.clearPage(this.modalPageEl);
  }

  deletePage() {
    super.deletePage(this.modalPageEl);
  }

  closePage() {
    super.closePage(this.modalPageEl);
  }

  openPage() {
    super.openPage(this.modalPageEl);
    toggleSubscriptionTabContentActual.rendering(this.modalPageEl);

    history.pushState({ state: `#modal-page-${this.className}` }, null, `#modal-page-${this.className}`);
  }

  rendering() {
    this.topBar = new CreateTopBarSubscription({
      selector: ['div'],
      style: ['top-bar'],
      modifier: [
        `${isIos ? '--indentation--top' : ''}`,
        '--theme--dark',
      ],
      eventToggleActualSubscription: [
        {
          type: 'click',
          callback: () => {
            toggleSubscriptionTabContentMy.clearPage();
            toggleSubscriptionTabContentActual.clearPage();
            toggleSubscriptionTabContentActual.rendering(this.modalPageEl);
          },
        },
      ],
      eventToggleMySubscription: [
        {
          type: 'click',
          callback: () => {
            toggleSubscriptionTabContentActual.clearPage();
            toggleSubscriptionTabContentMy.clearPage();
            toggleSubscriptionTabContentMy.rendering(this.modalPageEl);
          },
        },
      ],
    });

    this.modalPageEl.prepend(this.topBar.create());


    this.activeTobBar();
    this.openPage();
  }

  activeTobBar() {
    switchActive(this.modalPageEl.querySelectorAll('.top-bar__tab'), 'top-bar__tab--active-light');
  }
}
