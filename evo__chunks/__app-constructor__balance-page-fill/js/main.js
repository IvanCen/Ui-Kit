class TogglePageBalanceFill extends TogglePage {
  constructor(parameters) {
    super(parameters);
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
  }

  rendering() {
    super.rendering();

    const cardTopBar = new CreateTopBarWithBackButton({
      selector: ['div'],
      style: ['top-bar'],
      modifier: ['--size--small', '--indentation--bottom', '--theme--light'],
      textTitle: ['Пополнение баланса'],
      eventBack: [
        { type: 'click', callback: this.closePage },
        { type: 'click', callback: this.deletePage },
      ],
    });
    const selectItem = new CreateSelectItem({
      selector: ['div'],
      style: ['select-item'],
    });
    const sizeBar = new CreateSizeBar({
      selector: ['div'],
      style: ['size-bar'],
      modifier: [
        '--main',
        '--open',
      ],
    });

    const buttonFill = new CreateButton({
      selector: ['button'],
      style: ['button'],
      modifier: [
        '--size--big',
        '--theme--tangerin',
        '--theme--shadow-big',
        '--type--fixed',
        '--type--fill',
      ],
      text: ['Оплатить'],
      eventsOpen: [
        // { type: 'click', callback: togglePageBalanceFill.rendering },
      ],
    });

    const form = new CreateFormGiftCard({
      selector: ['div'],
      style: ['form'],
      modifier: ['--indentation', '--size--full'],
      events: [
        { type: 'click', callback: this.closePage },
        { type: 'click', callback: this.deletePage },
      ],
    });

    this.page.append(createTopBarIos());
    this.page.append(cardTopBar.create());
    // this.page.append(selectItem.create());
    this.page.append(sizeBar.create());
    this.page.append(buttonFill.create());

    this.buttonFill = document.querySelector('.button--type--fill');
    this.buttonSizeBar = document.querySelectorAll('.size-bar__button');

    function getPayLink(payInfo) {
      if (payInfo.success) {
        document.location.href = payInfo.successData.payUrl;
      } else {
        toggleModal.rendering(payInfo.errors[0]);
      }
    }

    this.buttonFill.addEventListener('click', () => {
      [...this.buttonSizeBar].forEach((item) => {
        if (item.classList.contains('size-bar__button--active')) {
          const amount = Number(item.textContent);
          const userPhone = userInfoObj.successData.phone;
          api.rechargeBalanceApi(userPhone, amount, getPayLink);
        }
      });
    });


    activeSizeBar();
    /* selectItemActive();
    inputFlyLabel();
    inputVisibleTogglePass();
    validation(); */
    this.openPage();
  }
}
