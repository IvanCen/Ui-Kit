class TogglePageOrderCategory extends TogglePage {
  constructor(parameters) {
    super(parameters);
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
  }

  openPage() {
    super.openPage();
    this.mainPage.classList.add('main-page--fixed');
  }

  closePage() {
    super.closePage();
    this.mainPage.classList.remove('main-page--fixed');
  }

  rendering(categoryName, category, categoryId) {
    super.rendering();

    const orderCardTopBar = new CreateTopBarOrderCard({
      selector: ['div'],
      style: ['top-bar'],
      modifier: ['__title--size--small', '--indentation--bottom'],
      title: [categoryName],

      eventBack: [
        { type: 'click', callback: this.closePage },
        { type: 'click', callback: this.deletePage },
      ],
      eventOpenSearch: [
        {
          type: 'click',
          callback: () => {
            toggleFifthPageOrderSearch.rendering(true, categoryId);
          },
        },
      ],
    });
    const cardItemContainer = new CreateCardItemContainerProductCard();
    const cardItemProductCard = new CreateCardItemOrderProductCard();


    this.page.append(orderCardTopBar.create());
    this.page.append(cardItemContainer.create());
    const cardItemContainerSelector = this.page.querySelector('.card-item__container');
    category.forEach((item) => {
      cardItemContainerSelector.append(cardItemProductCard.create(item));
    });

    this.openPage();
  }
}


class TogglePageOrderCategoryAll extends TogglePage {
  constructor(parameters) {
    super(parameters);
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
  }

  openPage() {
    super.openPage();
    this.mainPage.classList.add('main-page--fixed');
  }

  closePage() {
    super.closePage();
    this.mainPage.classList.remove('main-page--fixed');
  }

  rendering(productsCategory, categoryName, drinksItemsLength, productsItems, categoryId) {
    super.rendering();
    const orderCardTopBar = new CreateTopBarOrderCard({
      selector: ['div'],
      style: ['top-bar'],
      modifier: ['__title--size--small', '--indentation--bottom'],
      title: [`${categoryName} (${drinksItemsLength})`],
      eventBack: [
        { type: 'click', callback: this.closePage },
        { type: 'click', callback: this.deletePage },
      ],
      eventOpenSearch: [
        {
          type: 'click',
          callback: () => {
            toggleFifthPageOrderSearch.rendering(true, categoryId);
          },
        },
      ],
    });
    const orderCardTitle = new CreateTitleBar({
      selector: ['div'],
      style: ['title-bar'],
      modifier: ['__title--size--medium', '__title'],
      text: [''],
    });
    const orderCardBannersContainer = new CreateBannersContainerOrder();
    const orderCardBanners = new CreateBannersOrder();

    this.page.append(orderCardTopBar.create());

    function rendered(arr, container) {
      arr.forEach((item) => {
        container.append(orderCardTitle.create(item.name));
        const banner = orderCardBannersContainer.create();
        const containerBanners = banner.querySelector('.banner__container');
        container.append(containerBanners);

        for (const el of Object.values(productsItems)) {
          if (item.id === el.category) {
            containerBanners.append(orderCardBanners.create(el));
          }
        }
        activeBanners(containerBanners);
      });
    }

    rendered(productsCategory, this.page);


    this.openPage();
  }
}
