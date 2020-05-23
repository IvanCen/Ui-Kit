class ToggleOrderMenuContent extends ToggleOrderTabContent {
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
      modifier: ['--indentation--top'],
      title: ['Напитки'],
      titleSize: ['medium'],
      eventButtonClassAdd: ['title-bar__button--type--drinks'],
    });
    const orderTitleBarFoods = new CreateTitleBarWithButton({
      selector: ['div'],
      style: ['title-bar'],
      title: ['Еда'],
      titleSize: ['medium'],
      eventButtonClassAdd: ['title-bar__button--type--foods'],
    });
    const orderTitleBarProducts = new CreateTitleBarWithButton({
      selector: ['div'],
      style: ['title-bar'],
      title: ['Продукты'],
      titleSize: ['medium'],
      eventButtonClassAdd: ['title-bar__button--type--products'],
    });
    const orderTitleBarWraper = new CreateTitleBarWithButton({
      selector: ['div'],
      style: ['title-bar'],
      title: ['Упаковка'],
      titleSize: ['medium'],
      eventButtonClassAdd: ['title-bar__button--type--wraper'],
    });
    const orderCardItemContainerDrinks = new CreateCardItemContainer();
    const orderCardItemContainerFoods = new CreateCardItemContainer();
    const orderCardItemContainerProducts = new CreateCardItemContainer();
    const orderCardItemContainerWraper = new CreateCardItemContainer();
    const orderCardItem = new CreateCardItemOrder();


    function renderProduct(data) {
      const products = data.successData;
      console.log(products);
      const drinks = [];
      const food = [];
      const product = [];
      const wraper = [];

      let drinksItemsLength = 0;
      let foodItemsLength = 0;
      let productItemsLength = 0;
      let wraperItemsLength = 0;

      for (const item of Object.values(products.categories)) {
        if (item.parent === 33) {
          drinks.push(item);
          drinksItemsLength += item.items.length;
        }
        if (item.parent === 34) {
          food.push(item);
          foodItemsLength += item.items.length;
        }
        if (item.parent === 'Продукты') {
          product.push(item);
          productItemsLength += item.items.length;
        }
        if (item.parent === 'Упаковка') {
          wraper.push(item);
          wraperItemsLength += item.items.length;
        }
      }

      const drinkContainer = document.querySelector('.card-item__container--drinks');
      const foodContainer = document.querySelector('.card-item__container--foods');
      const productsContainer = document.querySelector('.card-item__container--products');
      const wraperContainer = document.querySelector('.card-item__container--wraper');

      const drinksButtonTitle = document.querySelector('.title-bar__button--type--drinks');
      const foodButtonTitle = document.querySelector('.title-bar__button--type--foods');
      const productsButtonTitle = document.querySelector('.title-bar__button--type--products');
      const wraperButtonTitle = document.querySelector('.title-bar__button--type--wraper');

      drinksButtonTitle.textContent = `Посмотреть ${drinksItemsLength}`;
      foodButtonTitle.textContent = `Посмотреть ${foodItemsLength}`;
      productsButtonTitle.textContent = `Посмотреть ${productItemsLength}`;
      wraperButtonTitle.textContent = `Посмотреть ${wraperItemsLength}`;

      drinksButtonTitle.addEventListener('click', () => {
        togglePageOrderCategoryAll.rendering(drinks, 'Напитки', drinksItemsLength, products.items);
        togglePageOrderCategoryAll.openPage;
      });

      foodButtonTitle.addEventListener('click', () => {
        togglePageOrderCategoryAll.rendering(food, 'Еда', foodItemsLength, products.items);
        togglePageOrderCategoryAll.openPage;
      });

      productsButtonTitle.addEventListener('click', () => {
        togglePageOrderCategoryAll.rendering(product, 'Продукты', productItemsLength, products.items);
        togglePageOrderCategoryAll.openPage;
      });

      wraperButtonTitle.addEventListener('click', () => {
        togglePageOrderCategoryAll.rendering(wraper, 'Упаковка', wraperItemsLength, products.items);
        togglePageOrderCategoryAll.openPage;
      });

      function rendered(arr, container) {
        arr.forEach((item) => {
          container.append(orderCardItem.create(item, products));
        });
      }
      rendered(drinks, drinkContainer);
      rendered(food, foodContainer);
      rendered(product, productsContainer);
      rendered(wraper, wraperContainer);
    }
    this.mainPageTabContent.append(orderTitleBarDrinks.create());
    this.mainPageTabContent.append(orderCardItemContainerDrinks.create('drinks'));
    this.mainPageTabContent.append(orderTitleBarFoods.create());
    this.mainPageTabContent.append(orderCardItemContainerFoods.create('foods'));
    this.mainPageTabContent.append(orderTitleBarProducts.create());
    this.mainPageTabContent.append(orderCardItemContainerProducts.create('products'));
    this.mainPageTabContent.append(orderTitleBarWraper.create());
    this.mainPageTabContent.append(orderCardItemContainerWraper.create('wraper'));
    this.mainPageTabContent.classList.add('main-page__tab-content--main', 'main-page__tab-content--open');
    this.mainPageContent.append(this.mainPageTabContent);
    renderProduct(dataProductApi);
  }
}
