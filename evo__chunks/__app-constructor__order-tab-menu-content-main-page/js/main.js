class ToggleOrderMenuContent extends ToggleOrderTabContent {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
  }

  renderedCategory(arr, container, orderCardItem, products) {
    arr.forEach((item) => {
      container.append(orderCardItem.create(item, products));
    });
  }

  rendering() {
    super.rendering();

    const orderTitleBarDrinks = new CreateTitleBar({
      selector: ['div'],
      style: ['title-bar'],
      modifier: ['--indentation--top', '--size--medium'],
      text: ['Напитки'],
    });
    const orderTitleBarFoods = new CreateTitleBar({
      selector: ['div'],
      style: ['title-bar'],
      modifier: ['--size--medium'],
      text: ['Еда'],
    });

    const orderCardItemContainerDrinks = new CreateCardItemContainer();
    const orderCardItemContainerFoods = new CreateCardItemContainer();
    const orderCardItem = new CreateCardItemOrder();


    const renderProduct = (data) => {
      if (!isEmptyObj(data)) {
        const products = data.successData;
        const drinks = [];
        const food = [];

        if (products !== undefined) {
          for (const item of Object.values(products.categories)) {
            if (item.parent === 33) {
              drinks.push(item);
            }
            if (item.parent === 34) {
              food.push(item);
            }
          }
        }


        const drinkContainer = document.querySelector('.card-item__container--drinks');
        const foodContainer = document.querySelector('.card-item__container--foods');

        this.renderedCategory(drinks, drinkContainer, orderCardItem, products);
        this.renderedCategory(food, foodContainer, orderCardItem, products);
      }
    };
    this.mainPageTabContent.append(orderTitleBarDrinks.create());
    this.mainPageTabContent.append(orderCardItemContainerDrinks.create('drinks'));
    this.mainPageTabContent.append(orderTitleBarFoods.create());
    this.mainPageTabContent.append(orderCardItemContainerFoods.create('foods'));

    this.mainPageTabContent.classList.add('main-page__tab-content--main', 'main-page__tab-content--open');
    this.mainPageContent.append(this.mainPageTabContent);
    renderProduct(dataProductApi);
  }
}
