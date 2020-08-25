class TogglePageBalanceHistory extends TogglePage {
  constructor(parameters) {
    super(parameters);
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
  }

  rendering(option) {
    super.rendering();
    const topBar = new CreateTopBarWithBackButton({
      selector: ['div'],
      style: ['top-bar'],
      modifier: [`--size--medium${isIos ? '--ios' : ''}`],
      textTitle: [this.parameters.titleNameTopBar],
      eventBack: [
        { type: 'click', callback: this.closePage },
        { type: 'click', callback: this.deletePage },
      ],
    });
    const textAreaBonus = new CreateTextAreaBalanceHistory({
      selector: ['div'],
      style: ['text-area'],
      text: [this.parameters.text],
      number: [this.parameters.number()],
      heart: option.heart,
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
    const сardItem = new CreateCardItemBalance({
      selector: ['div'],
      style: ['card-item'],
      modifier: [
        '--border--bottom',
      ],
    });

    this.page.prepend(createTopBarIos());
    this.page.append(topBar.create());
    this.page.append(textAreaBonus.create());
    this.page.append(сardItemsContainer.create());
    this.сardItemsContainer = this.page.querySelector('.card-item__container');
    console.log(this.parameters.userLog);
    this.parameters.userLog.successData.forEach((item) => {
      this.сardItemsContainer.append(сardItem.create(item, option));
    });

    this.openPage();
  }
}
