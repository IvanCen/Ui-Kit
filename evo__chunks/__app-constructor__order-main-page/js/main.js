class ToggleOrder extends ToggleMainPage {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
  }

  rendering() {
    super.rendering();
    this.mainPageContent.classList.add('main-page__content--with--bottom-bar');

    function switchTabHits() {
      const elements = document.querySelectorAll('.main-page__tab-content');
      [...elements].forEach((item) => item.classList.remove('main-page__tab-content--open'));
      const element = document.querySelector('.main-page__tab-content--hits');
      element.classList.add('main-page__tab-content--open');
    }
    function switchTabMain() {
      const elements = document.querySelectorAll('.main-page__tab-content');
      [...elements].forEach((item) => item.classList.remove('main-page__tab-content--open'));
      const element = document.querySelector('.main-page__tab-content--main');
      element.classList.add('main-page__tab-content--open');
    }
    function switchTabHistory() {
      const elements = document.querySelectorAll('.main-page__tab-content');
      [...elements].forEach((item) => item.classList.remove('main-page__tab-content--open'));
      const element = document.querySelector('.main-page__tab-content--history');
      element.classList.add('main-page__tab-content--open');
    }
    function switchTabFavorite() {
      const elements = document.querySelectorAll('.main-page__tab-content');
      [...elements].forEach((item) => item.classList.remove('main-page__tab-content--open'));
      const element = document.querySelector('.main-page__tab-content--favorite');
      element.classList.add('main-page__tab-content--open');
    }

    const orderTopBar = new CreateTopBarOrder({
      selector: ['div'],
      style: ['top-bar'],
      modifier: ['--indentation--top'],
      eventToggleMenu: [
        // { type: 'click', callback: toggleOrderMenuContent.clearPage },
        // { type: 'click', callback: toggleOrderMenuContent.rendering },
        { type: 'click', callback: switchTabMain },
      ],
      eventToggleHits: [
        // { type: 'click', callback: toggleOrderHitsContent.clearPage },
        // { type: 'click', callback: toggleOrderHitsContent.rendering },
        { type: 'click', callback: switchTabHits },
      ],
      eventToggleHistory: [
        { type: 'click', callback: switchTabHistory },
      ],
      eventToggleFavorite: [
        { type: 'click', callback: switchTabFavorite },
      ],
    });

    const orderBottomBar = new CreateBottomBarOrder({
      selector: ['div'],
      style: ['bottom-bar'],
      modifier: ['--indentation--normal'],
      eventBasket: [
        { type: 'click', callback: toggleFourthPageReviewOrder.clearPage },
        { type: 'click', callback: toggleFourthPageReviewOrder.rendering },
      ],
    });

    this.mainPageContent.prepend(orderTopBar.create());
    const footer = document.querySelector('.footer');
    footer.before(orderBottomBar.create());

    const topBarTabs = document.querySelectorAll('.top-bar__tab');
    switchActive(topBarTabs, 'top-bar__tab--active');
  }
}
