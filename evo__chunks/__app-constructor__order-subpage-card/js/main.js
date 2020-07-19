class ToggleSubPageProductCard extends ToggleSubPage {
  constructor(parameters) {
    super(parameters);
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
  }

  rendering(productInfo) {
    super.rendering();

    const productCard = new CreateOrderProductMainCard({
      selector: ['div'],
      style: ['main-card'],
      title: [productInfo.name],
      eventCloseIcon: [
        { type: 'click', callback: this.closePage },
        { type: 'click', callback: this.deletePage },
      ],
    });
    const textAreaProductCard = new CreateTextAreaAddinsProductCard({
      selector: ['div'],
      style: ['text-area-wraper'],
      modifier: ['--indentation--bottom'],
    });
    const sizeBarVolume = new CreateSizeBarVolume({
      selector: ['div'],
      style: ['size-bar'],
      modifier: [
        '--main',
        '--open',
      ],
    });

    this.subPage.append(productCard.create(productInfo));
    this.subPage.append(textAreaProductCard.create(productInfo));

    const buttonReset = this.subPage.querySelector('.text-area__button--type--reset');
    const mainCard = this.subPage.querySelector('.main-card');
    if (productInfo.countCombinations !== null) {
      mainCard.append(sizeBarVolume.create(productInfo));
      const areaInfo = this.subPage.querySelector(`.text-area__info-number--${productInfo.countCombinationTitleParameter}`);
      const nameUnit = productInfo.countCombinationTitleParameter;
      const numberUnit = productInfo[productInfo.countCombinationTitleParameter];
      activeSizeBar(areaInfo, numberUnit, nameUnit);
    }
    if (buttonReset) {
      buttonReset.addEventListener('click', () => {
        userDataObj[productInfo.id] = {};
        localStorage.setItem('userData', userDataObj);
        toggleSubPage.clearPage();
        this.rendering(productInfo);
      });
    }

    activeButton();
    this.openPage();
  }
}
