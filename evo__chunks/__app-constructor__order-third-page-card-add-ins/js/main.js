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

  rendering(productInfo) {
    super.rendering();

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
    this.thirdPage.append(createTopBarIos());
    this.thirdPage.append(addinsTopBar.create(productInfo));
    this.thirdPage.append(addinsTextArea.create(productInfo));
    this.thirdPage.append(addinsButton.create());
    this.addinsContainer = this.thirdPage.querySelector('.text-area__counter-container');
    const modifierObjWithTitle = this.getModifiers(productInfo);
    const modifierArrWithTitle = Object.entries(modifierObjWithTitle);
    modifierArrWithTitle.forEach((item) => {
      this.addinsContainer.after(addinTextArea.create(item, productInfo));
    });

    const buttonAdd = document.querySelector('.button--type--add-adds');
    const buttonReset = this.thirdPage.querySelector('.text-area__button--type--reset');
    console.log(productInfo);
    buttonReset.addEventListener('click', () => {
      delete userDataObj[productInfo.id];
      localStorage.setItem('userData', userDataObj);
      toggleThirdPage.clearPage();
      this.rendering(productInfo);
    });

    buttonAdd.addEventListener('click', () => {
      addProductToBasket(productInfo);
    });

    switchAdd(productInfo);

    this.openPage();
  }
}
