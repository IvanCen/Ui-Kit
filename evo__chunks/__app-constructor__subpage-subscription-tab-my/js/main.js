class ToggleSubscriptionTabMy extends ToggleSubscriptionTabContent {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
    this.renderSubscriptions = this.renderSubscriptions.bind(this);
  }

  renderSubscriptions(activeSubscriptions) {
    if (activeSubscriptions.successData.length !== 0) {
      this.mainCardSubsription = new CreateSubscriptionsMainCard({
        selector: ['div'],
        style: ['main-card'],
        modifier: [
          '--theme--shadow',
          '--type--border',
          '--indentation--top',
          '--indentation--bottom',
        ],
        qr: true,
      });
      Object.values(activeSubscriptions.successData).forEach((item) => {
        this.subPageTabContent.append(this.mainCardSubsription.create(dataSeasons.successData[item.id], item));
      });
    } else {
      this.mainCardNoSubscriptions = new CreateNoSubscriptionsMainCard({
        selector: ['div'],
        style: ['main-card'],
        modifier: ['--position--space-between'],
      });
      this.subPageTabContent.append(this.mainCardNoSubscriptions.create());
    }
  }

  rendering() {
    super.rendering();
    this.subPageContent.append(this.subPageTabContent);
    api.getClientSeasons(this.renderSubscriptions);
  }
}
