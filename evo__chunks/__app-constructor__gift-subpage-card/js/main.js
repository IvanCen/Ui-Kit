class ToggleSubPageGiftCard extends ToggleSubPage {
  constructor(parameters) {
    super(parameters);
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
  }

  rendering() {
    super.rendering();

    const giftCardTopBar = new CreateTopBarWithBackButton({
      selector: ['div'],
      style: ['top-bar'],
      modifier: [`${isIos ? '--size--small--ios' : '--size--small'}`, '--indentation--bottom', '--theme--light'],
      textTitle: ['Создать подарок'],
      eventBack: [
        { type: 'click', callback: this.closePage },
        { type: 'click', callback: this.deletePage },
      ],
    });
    const giftSelectItem = new CreateSelectItem({
      selector: ['div'],
      style: ['select-item'],
    });
    const giftForm = new CreateFormGiftCard({
      selector: ['div'],
      style: ['form'],
      modifier: ['--indentation', '--size--full'],
      events: [
        { type: 'click', callback: this.closePage },
        { type: 'click', callback: this.deletePage },
      ],
    });


    this.subPage.append(giftCardTopBar.create());
    this.subPage.append(giftSelectItem.create());
    this.subPage.append(giftForm.create());

    selectItemActive();
    inputFlyLabel();
    inputVisibleTogglePass();
    validation();
    this.openPage();
  }
}
