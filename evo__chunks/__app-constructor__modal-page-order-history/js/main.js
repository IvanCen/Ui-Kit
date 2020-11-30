class ToggleModalPageOrderHistory extends ToggleModalPage {
  constructor(parameters) {
    super(parameters);

    this.className = 'order-history';

    this.body.append(createModalPage(this.className));

    this.modalPageEl = document.querySelector(`.modal-page-${this.className}`);
    this.modalPageContentEl = document.querySelector(`.modal-page-${this.className}__content`);

    this.closePage = this.closePage.bind(this);
    this.deletePage = this.deletePage.bind(this);
    this.openPage = this.openPage.bind(this);
    this.rendering = this.rendering.bind(this);
  }

  deletePage() {
    super.deletePage(this.modalPageEl);
  }

  closePage() {
    super.closePage(this.modalPageEl);
  }

  openPage() {
    super.openPage(this.modalPageEl);
    this.headerTitle = document.querySelector('.header__status');
    this.headerTitle.textContent = 'История заказов';

    history.pushState({ state: `#modal-page-${this.className}` }, null, `#modal-page-${this.className}`);
  }

  rendering() {
    const cardSection = new CreateCardItemHistory();
    if (!isEmptyObj(userLastOrdersObj)) {
      for (const item of Object.values(userLastOrdersObj.successData.orders)) {
        this.modalPageContentEl.prepend(cardSection.create(item));
      }
    }
    this.openPage();
  }
}
