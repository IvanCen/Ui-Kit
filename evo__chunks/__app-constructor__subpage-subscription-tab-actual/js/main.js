class ToggleSubscriptionTabActual extends ToggleSubscriptionTabContent {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
  }

  rendering() {
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
    this.subPageContent.append(this.subPageTabContent);

    if (!isEmptyObj(dataSeasons)) {
      Object.values(dataSeasons.successData).forEach((item) => {
        this.subPageTabContent.append(this.mainCardSubsription.create(item));
      });
    }
  }
}
