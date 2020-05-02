class ToggleOrderMenuContent extends ToggleOrderContent {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
  }

  rendering() {
    super.rendering();

    const orderTitleBarDrinks = new CreateTitleBarWithButton({
      selector: ['div'],
      style: ['title-bar'],
      title: ['Напитки'],
      modifier: ['--indentation--top'],
      titleSize: ['medium'],
      buttonText: ['Посмотреть 26'],
    });
    const orderTitleBarFoods = new CreateTitleBarWithButton({
      selector: ['div'],
      style: ['title-bar'],
      title: ['Еда'],
      titleSize: ['medium'],
      buttonText: ['Посмотреть 35'],
    });
    const orderCardItemCoffee = new CreateCardItemOrder({
      selector: ['div'],
      style: ['card-item'],
      modifier: [
        '--direction--row',
        '--indentation--bottom',
      ],
      title: ['Горячий кофе'],
      events: [{ type: 'click', callback: togglePageOrderCategory.rendering }],
    });
    const orderCardItemTea = new CreateCardItemOrder({
      selector: ['div'],
      style: ['card-item'],
      modifier: [
        '--direction--row',
        '--indentation--bottom',
      ],
      title: ['Горячий чай'],
    });
    const orderCardItemDrinks = new CreateCardItemOrder({
      selector: ['div'],
      style: ['card-item'],
      modifier: [
        '--direction--row',
        '--indentation--bottom',
      ],
      title: ['Горячий напитки'],
    });
    const orderCardItemCoffeeMilkDrink = new CreateCardItemOrder({
      selector: ['div'],
      style: ['card-item'],
      modifier: [
        '--direction--row',
        '--indentation--bottom',
      ],
      title: ['Кофейные и молочные коктейли'],
    });
    const orderCardItemColdDrinks = new CreateCardItemOrder({
      selector: ['div'],
      style: ['card-item'],
      modifier: [
        '--direction--row',
        '--indentation--bottom',
      ],
      title: ['Холодные напитки'],
    });
    const orderCardItemBreakfast = new CreateCardItemOrder({
      selector: ['div'],
      style: ['card-item'],
      modifier: [
        '--direction--row',
        '--indentation--bottom',
      ],
      title: ['Завтраки'],
    });
    const orderCardItemBusinessLunch = new CreateCardItemOrder({
      selector: ['div'],
      style: ['card-item'],
      modifier: [
        '--direction--row',
        '--indentation--bottom',
      ],
      title: ['Бизнес-ланчи'],
    });
    const orderCardItemBakery = new CreateCardItemOrder({
      selector: ['div'],
      style: ['card-item'],
      modifier: [
        '--direction--row',
        '--indentation--bottom',
      ],
      title: ['Выпечка'],
    });
    const orderCardItemDesert = new CreateCardItemOrder({
      selector: ['div'],
      style: ['card-item'],
      modifier: [
        '--direction--row',
        '--indentation--bottom',
      ],
      title: ['Десерты'],
    });
    const orderCardItemSnack = new CreateCardItemOrder({
      selector: ['div'],
      style: ['card-item'],
      modifier: [
        '--direction--row',
        '--indentation--bottom',
      ],
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
  }
}
