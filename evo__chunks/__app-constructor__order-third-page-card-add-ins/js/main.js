class ToggleThirdPageAddinsCard extends ToggleThirdPage {
  constructor(parameters) {
    super(parameters);
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
  }

  rendering(modifierArr) {
    super.rendering();
    // console.log(productInfo)

    const addinsTopBar = new CreateTopBarDarkWithCloseIcon({
      selector: ['div'],
      style: ['top-bar'],
      modifier: ['--size--small', '--theme--dark'],
      textTitle: ['Добавки'],
      eventCloseIcon: [
        { type: 'click', callback: this.closePage },
        { type: 'click', callback: this.deletePage },
      ],
    });
    const addinsTextArea = new CreateTextAreaAddins({
      selector: ['div'],
      style: ['text-area-wraper'],
    });
    const addinTextArea = new CreateTextAreaAddin({
      selector: ['div'],
      style: ['text-area'],
      modifier: [
        '--theme--light',
        '--type--add-ins',
      ],
    });
    const addinsbutton = new CreateButton({
      selector: ['button'],
      style: ['button'],
      modifier: ['--size--big',
        '--theme--tangerin',
        '--type--fixed-with-bottom-bar',
        '--theme--shadow-big',
      ],
      text: ['В корзину'],
      events: [
        { type: 'click', callback: counterBasket },
      ],
    });

    this.thirdPage.append(addinsTopBar.create());
    this.thirdPage.append(addinsTextArea.create());
    this.thirdPage.append(addinsbutton.create());
    this.addinsContainer = this.thirdPage.querySelector('.text-area__counter-container');
    modifierArr.forEach((item) => {
      this.addinsContainer.after(addinTextArea.create(item));
    });
    /* for (const modif of Object.values(dataProductApi.successData.modifiers)) {
if (item.category === modif.category) {
 }
    } */
    switchAdd();
    activeButton();
    this.openPage();
  }
}
