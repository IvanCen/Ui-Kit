class ToggleModalPageOrderHistory extends ToggleModalPageOrderHistoryRoot {
  constructor(parameters) {
    super(parameters);
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
    this.modalPageOrderHistory = document.querySelector('.modal-page-order-history');
  }

  rendering(info) {
    super.rendering();

    const cardSection = new CreateCardItemHistory();

    if (!isEmptyObj(userLastOrdersObj)) {
      for (const item of Object.values(userLastOrdersObj.successData.orders)) {
        this.modalPageOrderHistoryContent.prepend(cardSection.create(item));
      }
    }

    this.openPage();
  }
}
