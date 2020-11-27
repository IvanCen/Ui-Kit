class ToggleSubscriptionTabContentActual extends ToggleTabContent {
  constructor(parameters) {
    super(parameters);

    this.rendering = this.rendering.bind(this);
  }

  rendering(el) {
    super.rendering();

    this.mainCardSubsription = new CreateSubscriptionsMainCard({
      selector: ['div'],
      style: ['main-card'],
      modifier: [
        '--theme--shadow',
        '--type--border',
        '--indentation--top',
        '--indentation--bottom',
      ],
    });
    el.append(this.tabContent);

    if (!isEmptyObj(dataSeasons)) {
      Object.values(dataSeasons.successData).forEach((item) => {
        this.tabContent.append(this.mainCardSubsription.create(item));
      });
    }
  }
}
