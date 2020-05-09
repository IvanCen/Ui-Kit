class ToggleThirdPageAddinsCard extends ToggleThirdPage {
  constructor(parameters) {
    super(parameters);
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
  }

  rendering(productInfo) {
    super.rendering();
    //console.log(productInfo)
    const addinsTopBar = new CreateTopBarDarkWithCloseIcon({
      selector: ['div'],
      style: ['top-bar'],
      modifier: ['--size--small', '--theme--dark'],
      textTitle: ['add-ins'],
      eventCloseIcon: [
        { type: 'click', callback: this.closePage },
        { type: 'click', callback: this.deletePage },
      ],
    });
    const addinstextArea = new CreateTextAreaAddins({
      selector: ['div'],
      style: ['text-area-wraper'],
      eventShare: [],
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
    this.thirdPage.append(addinstextArea.create());
    this.thirdPage.append(addinsbutton.create());
    switchAdd();
    activeButton();
    this.openPage();
  }
}
