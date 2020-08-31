class TogglePageBalanceFill extends TogglePage {
  constructor(parameters) {
    super(parameters);
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
    this.setFillInfo = this.setFillInfo.bind(this);
    this.getPayLink = this.getPayLink.bind(this);
  }

  setFillInfo() {
    this.buttonFill = this.page.querySelector('.button--type--fill');
    this.topBar = this.page.querySelector('.top-bar');
    this.buttonSizeBar = this.page.querySelectorAll('.size-bar__button');
    this.sizeBar = this.page.querySelector('.size-bar');
    this.loader = document.createElement('img');
    this.loader.classList.add('spinner');
    this.loader.src = 'data:image/svg+xml;base64,[[run-snippet? &snippetName=`file-to-base64` &file=[+chunkWebPath+]/img/icon-spinner.svg]]';
    this.topBar.after(this.loader);

    this.buttonFill.classList.add('button--hide');
    this.sizeBar.classList.add('size-bar--hide');
    this.paymentForm = document.createElement('div');
    this.paymentForm.id = 'payment-form';
    this.page.append(this.paymentForm);

    [...this.buttonSizeBar].forEach((item) => {
      if (item.classList.contains('size-bar__button--active')) {
        this.amount = Number(item.textContent);
        this.userPhone = userInfoObj.successData.phone;
        if (this.userPhone === '+79522655566') {
          api.rechargeBalanceApi(this.userPhone, this.amount, 'appWidget', this.getPayLinkYandex);
        } else {
          api.rechargeBalanceApi(this.userPhone, this.amount, 'app', this.getPayLink);
        }
      }
    });
  }

  getPayLink(payInfo) {
    this.loader = this.page.querySelector('.spinner');
    this.loader.classList.add('spinner--hide');
    if (payInfo.success) {
      document.location.href = payInfo.successData.payUrl;
    } else {
      toggleModal.rendering(payInfo.errors[0]);
    }
  }

  getPayLinkYandex(payInfo) {
    console.log(payInfo);
    this.loader = this.page.querySelector('.spinner');
    this.loader.classList.add('spinner--hide');

    if (payInfo.success) {
      // Инициализация виджета. Все параметры обязательные.
      const checkout = new window.YandexCheckout({
        confirmation_token: payInfo.successData.confirmationToken, // Токен, который перед проведением оплаты нужно получить от Яндекс.Кассы
        return_url: 'https://xleb.ru/test-app.html', // Ссылка на страницу завершения оплаты
        embedded_3ds: true,
        error_callback(error) {
          toggleModal.rendering(error);
        },
      });

      // Отображение платежной формы в контейнере
      checkout.render('payment-form');
    } else {
      toggleModal.rendering(payInfo.errors[0]);
    }
  }

  rendering() {
    super.rendering();

    this.cardTopBar = new CreateTopBarWithBackButton({
      selector: ['div'],
      style: ['top-bar'],
      modifier: [`${isIos ? '--size--small--ios' : '--size--small'}`, '--indentation--bottom', '--theme--light'],
      textTitle: ['Пополнение баланса'],
      eventBack: [
        { type: 'click', callback: this.closePage },
        { type: 'click', callback: this.deletePage },
      ],
    });
    this.sizeBar = new CreateSizeBar({
      selector: ['div'],
      style: ['size-bar'],
      modifier: [
        '--main',
        '--open',
      ],
    });

    this.buttonFill = new CreateButton({
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
        {
          type: 'click',
          callback: this.setFillInfo,
        },
      ],
    });

    this.page.append(createTopBarIos());
    this.page.append(this.cardTopBar.create());
    this.page.append(this.sizeBar.create());
    this.page.append(this.buttonFill.create());

    activeSizeBar();
    this.openPage();
  }
}
