class TogglePageBalanceHistory extends TogglePage {
  constructor(parameters) {
    super(parameters);
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
  }

  rendering() {
    super.rendering();
    const topBar = new CreateTopBarWithBackButton({
      selector: ['div'],
      style: ['top-bar'],
      modifier: ['--size--small'],
      textTitle: [this.parameters.titleNameTopBar],
      eventBack: [
        { type: 'click', callback: this.closePage },
        { type: 'click', callback: this.deletePage },
      ],
    });
    const textAreaBonus = new CreateTextAreaBalance({
      selector: ['div'],
      style: ['text-area'],
      button: false,
      identifier: ['score'],
      text: [this.parameters.text],
      number: ['0'],
    });
    const сardItemsContainer = new CreateCardItemContainerFavAndHisOrder({
      selector: ['div'],
      style: ['card-item__container'],
      modifier: [
        '--direction--column',
        '--indentation-column--normal',
        '--indentation--top',
        '--type--balance',
      ],
    });
    const сardItemPlus = new CreateCardItemBalance({
      selector: ['div'],
      style: ['card-item'],
      modifier: [
        '--border--bottom',
      ],
      themeNumber: ['green'],
      number: ['+100'],
      state: ['Начислено'],
      data: ['19.10.2002'],
    });
    const сardItemMinus = new CreateCardItemBalance({
      selector: ['div'],
      style: ['card-item'],
      modifier: [
        '--border--bottom',
      ],
      themeNumber: ['red'],
      number: ['-100'],
      state: ['Списано'],
      data: ['19.10.2202'],
    });

    this.page.append(topBar.create());
    this.page.append(textAreaBonus.create());
    this.page.append(сardItemsContainer.create());
    this.сardItemsContainer = this.page.querySelector('.card-item__container');
    this.сardItemsContainer.append(сardItemPlus.create());
    this.сardItemsContainer.append(сardItemMinus.create());
    this.openPage();
  }
}
