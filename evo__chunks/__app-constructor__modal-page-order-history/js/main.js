class ToggleModalPageOrderHistory extends ToggleModalPage {
  constructor(parameters) {
    super(parameters);

    this.body.append(createModalPageOrderHistory());

    this.modalPageOrderHistory = document.querySelector('.modal-page-order-history');
    this.modalPageOrderHistoryContent = document.querySelector('.modal-page-order-history__content');

    this.closePage = this.closePage.bind(this);
    this.deletePage = this.deletePage.bind(this);
    this.openPage = this.openPage.bind(this);
    this.rendering = this.rendering.bind(this);
  }

  deletePage() {
    super.deletePage(this.modalPageOrderHistory);
  }

  closePage() {
    super.closePage(this.modalPageOrderHistory);
  }

  openPage() {
    super.openPage(this.modalPageOrderHistory);
    if (isIos) {
      this.modalPageOrderHistory.classList.add('modal-page-order-history--ios');
    }
    this.headerTitle = document.querySelector('.header__status');
    this.headerTitle.textContent = 'История заказов';

    history.pushState({ state: '#modal-page-order-history' }, null, '#modal-page-order-history');
  }

  rendering() {
    const cardSection = new CreateCardItemHistory();
    if (!isEmptyObj(userLastOrdersObj)) {
      for (const item of Object.values(userLastOrdersObj.successData.orders)) {
        this.modalPageOrderHistoryContent.prepend(cardSection.create(item));
      }
    }
    this.openPage();
  }
}
