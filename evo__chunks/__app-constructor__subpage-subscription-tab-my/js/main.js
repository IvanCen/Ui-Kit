class ToggleSubscriptionTabContentMy extends ToggleTabContent {
  constructor(parameters) {
    super(parameters);
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
        this.tabContent.append(this.mainCardSubsription.create(dataSeasons.successData[item.id], item));
      });
    } else {
      this.mainCardNoSubscriptions = new CreateNoSubscriptionsMainCard({
        selector: ['div'],
        style: ['main-card'],
        modifier: ['--position--space-between'],
      });
      this.tabContent.append(this.mainCardNoSubscriptions.create());
    }
  }

  rendering(el) {
    super.rendering();
    el.append(this.tabContent);
    api.getClientSeasons(this.renderSubscriptions);
  }
}
