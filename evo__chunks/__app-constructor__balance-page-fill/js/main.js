class TogglePageBalanceFill extends TogglePage {
  constructor(parameters) {
    super(parameters);
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
    this.setFillInfo = this.setFillInfo.bind(this);
    this.getPayLink = this.getPayLink.bind(this);
    this.setFillInfoApplePay = this.setFillInfoApplePay.bind(this);
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

  setFillInfoApplePay() {
    this.buttonFillApplePay = this.page.querySelector('.button--type--fill-apple-pay');
    this.topBar = this.page.querySelector('.top-bar');
    this.buttonSizeBar = this.page.querySelectorAll('.size-bar__button');
    this.sizeBar = this.page.querySelector('.size-bar');

    [...this.buttonSizeBar].forEach((item) => {
      if (item.classList.contains('size-bar__button--active')) {
        this.amount = Number(item.textContent);
        this.userPhone = userInfoObj.successData.phone;
        if (typeof ApplePay !== 'undefined' && typeof ApplePay.makePaymentRequest === 'function') {
          ApplePay.makePaymentRequest(
            {
              items: [

                {
                  label: `Balance recharge ${this.amount}`,
                  amount: this.amount,
                },
              ],
              shippingMethods: [
              ],
              supportedNetworks: ['visa', 'masterCard', 'discover'],
              merchantCapabilities: ['3ds', 'debit', 'credit'],
              merchantIdentifier: 'merchant.ru.xleb.app',
              currencyCode: 'RUB',
              countryCode: 'RU',
              billingAddressRequirement: 'none',
              shippingAddressRequirement: 'none',
              shippingType: 'shipping',
            },
          )
            .then((paymentResponse) => {
              // alert('OKDATA:'+JSON.stringify(token.paymentData));
              (async () => {
                const request = {
                  method: 'recharge_the_balance',
                  user: this.userPhone,
                  phone: authorizationPhone,
                  code: authorizationCode,
                  amount: this.amount,
                  creditCardProvider: 'AlfaApplePay',
                  paymentToken: token.paymentData,
                  outputFormat: 'json',
                };
                const rawResponse = await fetch('[~30~]', {
                  method: 'POST',
                  mode: 'no-cors',
                  headers: {
                    'Content-Type': 'text/html',
                  },
                  body: JSON.stringify(request),
                });
                const textResponse = await rawResponse.text();
                // alert(textResponse);
                const jsResponse = JSON.parse(textResponse);
                if (jsResponse.success) {
                  ApplePay.completeLastTransaction('success');
                } else {
                  ApplePay.completeLastTransaction('failure');
                }
                //   console.log(JSON.parse(await rawResponse.text()));
              })();
            })
            .catch((e) => {
              alert('Не удалось пополнить баланс с помощью apple pay');
            });
        } else {
          this.setFillInfo();
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
    if (isIos) {
      this.buttonFillApplePay = new CreateButton({
        selector: ['button'],
        style: ['button'],
        modifier: [
          '--size--medium',
          '--theme--dark-transparent',
          '--type--fixed-hight',
          '--type--fill-apple-pay',
        ],
        text: ['Оплатить через Apple Pay'],
        eventsOpen: [
          {
            type: 'click',
            callback: this.setFillInfoApplePay,
          },
        ],
      });
      this.page.append(this.buttonFillApplePay.create());
    }

    activeSizeBar();
    this.openPage();
  }
}
