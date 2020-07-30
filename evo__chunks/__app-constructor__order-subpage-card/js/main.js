class ToggleSubPageProductCard extends ToggleSubPage {
  constructor(parameters) {
    super(parameters);
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
  }

  rendering(productInfo, pushRoute) {
    super.rendering(pushRoute);

    const productCard = new CreateOrderProductMainCard({
      selector: ['div'],
      style: ['main-card'],
      title: [productInfo.name],
      eventCloseIcon: [
        {
          type: 'click',
          callback: () => {
            this.closePage();
            this.deletePage();
            window.history.back();
          },
        },
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
    const nutritionContainer = this.subPage.querySelector('.text-area__content-container--type--more');
    const buttonMore = nutritionContainer.querySelector('.text-area__button--type--more');
    const mainCard = this.subPage.querySelector('.main-card');

    if (nutritionContainer.offsetHeight < 110) {
      buttonMore.remove();
      nutritionContainer.classList.remove('text-area__content-container--type--more');
    }

    if (productInfo.countCombinations !== null) {
      mainCard.append(sizeBarVolume.create(productInfo));
      const areaInfo = this.subPage.querySelector(`.text-area__info-number--${productInfo.countCombinationTitleParameter}`);
      const nameUnit = productInfo.countCombinationTitleParameter;
      const numberUnit = productInfo[productInfo.countCombinationTitleParameter];
      activeSizeBar(areaInfo, numberUnit, nameUnit);
    }
    if (buttonReset) {
      buttonReset.addEventListener('click', () => {
        delete userDataObj[productInfo.id];
        localStorage.setItem('userData', userDataObj);
        toggleSubPage.clearPage();
        this.pushRoute = false;
        this.rendering(productInfo, this.pushRoute);
      });
    }

    this.openPage();
  }
}
