class ToggleSubscriptionTabMy extends ToggleSubscriptionTabContent {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
  }

  rendering() {
    super.rendering();
    this.mainCardNoSubscriptions = new CreateNoSubscriptionsMainCard({
      selector: ['div'],
      style: ['main-card'],
      modifier: ['--position--space-between'],
    });

    this.subPageContent.append(this.subPageTabContent);
    this.subPageTabContent.append(this.mainCardNoSubscriptions.create());
  }
}
