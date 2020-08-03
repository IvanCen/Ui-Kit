class ToggleThirdPageAddinsCard extends ToggleThirdPage {
  constructor(parameters) {
    super(parameters);
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
  }

  getModifiers(productInfo) {
    /**
     * Тут показано как получить модификаторы, которые действительно доступны у товара,
     * также получаем сохраненную модификацию и по ней строим доступные категории модификаторов с проброшенным количеством
     */
    const { modifiers } = dataProductApi.successData;

    const itemId = productInfo.id;

    const itemModifiers = productInfo.modifiers;

    /*
    Составляем список действительно доступных модификаторов
     */
    const itemModifiersObj = [];
    for (const modifierKey of itemModifiers) {
      if (typeof modifiers[modifierKey] === 'object') {
        itemModifiersObj.push(modifiers[modifierKey]);
      }
    }

    /*
    Проходим все действительно доступные модификаторы и строим список с категориями
     */
    const itemModifierWithTitles = {};
    for (const itemModifiersObjElement of itemModifiersObj) {
      if (typeof itemModifierWithTitles[itemModifiersObjElement.category] !== 'object') {
        itemModifierWithTitles[itemModifiersObjElement.category] = {};
      }
      itemModifierWithTitles[itemModifiersObjElement.category][itemModifiersObjElement.id] = { ...itemModifiersObjElement };
    }
    return itemModifierWithTitles;
  }

  scrollToModifier(modifierName) {
    this.titlesModifiers = this.thirdPage.querySelectorAll('.text-area__title--type--uppercase');
    [...this.titlesModifiers].forEach((title) => {
      if (title.textContent === modifierName) {
        title.closest('.text-area__wraper').scrollIntoView({ block: 'start', inline: 'start', behavior: 'smooth' });
      }
    });
  }

  rendering(productInfo, modifierName, pushRoute = true) {
    super.rendering(pushRoute);

    const addinsTopBar = new CreateTopBarDarkWithCloseIcon({
      selector: ['div'],
      style: ['top-bar'],
      modifier: [`${isIos ? '--size--small--ios' : '--size--small'}`, '--theme--dark'],
      textTitle: ['Добавки'],
      eventCloseIcon: [
        { type: 'click', callback: this.closePage },
        { type: 'click', callback: this.deletePage },
      ],
    });
    const addinsTextArea = new CreateTextAreaAddins({
      selector: ['div'],
      style: ['text-area-wraper'],
      modifier: ['--indentation--bottom'],
    });
    const addinTextArea = new CreateTextAreaAddin();
    const addinsButton = new CreateButton({
      selector: ['button'],
      style: ['button'],
      modifier: ['--size--big',
        '--theme--tangerin',
        '--type--fixed-with-bottom-bar',
        '--theme--shadow-big',
        '--type--add-adds',
      ],
      text: ['В корзину'],
      events: [
        { type: 'click', callback: counterBasket },
      ],
    });
    this.containersModifiersEl = document.createElement('div');
    this.containersModifiersEl.classList.add(
      'text-area__content-container',
      'text-area__content-container--type--addins',
      `text-area__content-container--type--addins${isIos ? '--ios' : ''}`,
    );
    this.thirdPage.append(createTopBarIos());
    this.thirdPage.append(addinsTopBar.create(productInfo));
    this.thirdPage.append(this.containersModifiersEl);
    this.thirdPage.append(addinsButton.create());

    this.topBar = this.thirdPage.querySelector('.top-bar');
    this.buttonAdd = this.thirdPage.querySelector('.button--type--add-adds');

    this.modifierObjWithTitle = this.getModifiers(productInfo);
    this.modifierArrWithTitle = Object.entries(this.modifierObjWithTitle);
    this.modifierArrWithTitle.forEach((item) => {
      // this.topBar.after(addinTextArea.create(item, productInfo));
      this.containersModifiersEl.prepend(addinTextArea.create(item, productInfo));
    });
    this.containersModifiersEl.append(addinsTextArea.create(productInfo));

    this.buttonReset = this.thirdPage.querySelector('.text-area__button--type--reset');
    this.buttonReset.addEventListener('click', () => {
      delete userDataObj[productInfo.id];
      localStorage.setItem('userData', userDataObj);
      toggleThirdPage.clearPage();
      this.pushRoute = false;
      this.rendering(productInfo, modifierName, this.pushRoute);
    });

    this.buttonAdd.addEventListener('click', () => {
      addProductToBasket(productInfo);
    });

    switchAdd(productInfo);

    this.textAreaWraper = this.thirdPage.querySelectorAll('.text-area__wraper');
    [...this.textAreaWraper].forEach((el) => {
      this.containersModifiers = el.querySelectorAll('.text-area__container--type--modifier');

      if (this.containersModifiers.length !== 0) {
        [...this.containersModifiers].pop().classList.add('text-area__container--no-border');
      }
    });

    this.topBar.classList.add(`top-bar--sticky${isIos ? '--ios' : ''}`);

    this.openPage();
    if (pushRoute) {
      this.scrollToModifier(modifierName, this.thirdPage);
    }
  }
}
