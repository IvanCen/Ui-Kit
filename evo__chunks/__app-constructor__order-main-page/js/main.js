class ToggleOrder extends ToggleMainPage {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
  }

  rendering() {
    super.rendering();
    const orderTopBar = new CreateTopBarOrder({
      selector: ['div'],
      style: ['top-bar'],
      modifier: ['--indentation--top'],
      eventToggleMenu: [
        { type: 'click', callback: toggleOrderContent.clearPage },
        { type: 'click', callback: toggleOrderContent.rendering },
      ],
    });
    const orderTitleBarDrinks = new CreateTitleBarOrder({
      selector: ['div'],
      style: ['title-bar'],
      title: ['Напитки'],
      buttonText: ['Посмотреть 26'],
    });
    const orderTitleBarFoods = new CreateTitleBarOrder({
      selector: ['div'],
      style: ['title-bar'],
      title: ['Еда'],
      buttonText: ['Посмотреть 35'],
    });
    const orderCardItemCoffee = new CreateCardItemOrder({
      selector: ['div'],
      style: ['card-item'],
      modifier: [
        '--direction--row',
        '--addition--bottom',
      ],
      title: ['Горячий кофе'],
      events: [{ type: 'click', callback: togglePageOrderCategory.rendering }],
    });
    const orderCardItemTea = new CreateCardItemOrder({
      selector: ['div'],
      style: ['card-item'],
      modifier: [
        '--direction--row',
        '--addition--bottom',
      ],
      title: ['Горячий чай'],
    });
    const orderCardItemDrinks = new CreateCardItemOrder({
      selector: ['div'],
      style: ['card-item'],
      modifier: [
        '--direction--row',
        '--addition--bottom',
      ],
      title: ['Горячий напитки'],
    });
    const orderCardItemCoffeeMilkDrink = new CreateCardItemOrder({
      selector: ['div'],
      style: ['card-item'],
      modifier: [
        '--direction--row',
        '--addition--bottom',
      ],
      title: ['Кофейные и молочные коктейли'],
    });
    const orderCardItemColdDrinks = new CreateCardItemOrder({
      selector: ['div'],
      style: ['card-item'],
      modifier: [
        '--direction--row',
        '--addition--bottom',
      ],
      title: ['Холодные напитки'],
    });
    const orderCardItemBreakfast = new CreateCardItemOrder({
      selector: ['div'],
      style: ['card-item'],
      modifier: [
        '--direction--row',
        '--addition--bottom',
      ],
      title: ['Завтраки'],
    });
    const orderCardItemBusinessLunch = new CreateCardItemOrder({
      selector: ['div'],
      style: ['card-item'],
      modifier: [
        '--direction--row',
        '--addition--bottom',
      ],
      title: ['Бизнес-ланчи'],
    });
    const orderCardItemBakery = new CreateCardItemOrder({
      selector: ['div'],
      style: ['card-item'],
      modifier: [
        '--direction--row',
        '--addition--bottom',
      ],
      title: ['Выпечка'],
    });
    const orderCardItemDesert = new CreateCardItemOrder({
      selector: ['div'],
      style: ['card-item'],
      modifier: [
        '--direction--row',
        '--addition--bottom',
      ],
      title: ['Десерты'],
    });
    const orderCardItemSnack = new CreateCardItemOrder({
      selector: ['div'],
      style: ['card-item'],
      modifier: [
        '--direction--row',
        '--addition--bottom',
      ],
      title: ['Снеки'],
    });
    const orderBottomBar = new CreateBottomBarOrder({
      selector: ['div'],
      style: ['bottom-bar'],
      modifier: ['--indentation--normal'],
      title: ['Снеки'],
    });

    this.mainPageContent.append(orderTitleBarDrinks.create());
    this.mainPageContent.append(orderCardItemCoffee.create());
    this.mainPageContent.append(orderCardItemTea.create());
    this.mainPageContent.append(orderCardItemDrinks.create());
    this.mainPageContent.append(orderCardItemCoffeeMilkDrink.create());
    this.mainPageContent.append(orderCardItemColdDrinks.create());
    this.mainPageContent.append(orderTitleBarFoods.create());
    this.mainPageContent.append(orderCardItemBreakfast.create());
    this.mainPageContent.append(orderCardItemBusinessLunch.create());
    this.mainPageContent.append(orderCardItemBakery.create());
    this.mainPageContent.append(orderCardItemDesert.create());
    this.mainPageContent.append(orderCardItemSnack.create());


    this.mainPage.prepend(orderTopBar.create());
    const footer = document.querySelector('.footer');
    footer.before(orderBottomBar.create());

    const topBarTabs = document.querySelectorAll('.top-bar__tab');
    switchActive(topBarTabs, 'top-bar__tab--active');
  }
}
