class TogglePageBalanceFill extends TogglePage {
  constructor(parameters) {
    super(parameters);
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
    this.setFillInfo = this.setFillInfo.bind(this);
    this.getPayLink = this.getPayLink.bind(this);
    this.getPayLinkYandex = this.getPayLinkYandex.bind(this);
    this.setFillInfoApplePay = this.setFillInfoApplePay.bind(this);
  }

  activeButtonSumFill() {
    this.buttonSizeBar = this.page.querySelectorAll('.form__sums input');
    this.buttonFill = this.page.querySelector('.button--type--fill');
    this.buttonSizeBar.forEach((button) => {
      button.addEventListener('click', () => {
        this.buttonFill.textContent = `Пополнить (${button.value})`;
      });
    });
  }

  setFillInfo() {
    this.page = document.querySelector('.page');
    this.buttonFill = this.page.querySelector('.button--type--fill');
    this.topBar = this.page.querySelector('.top-bar');
    this.buttonSizeBar = this.page.querySelectorAll('.form__sums input');
    this.sizeBar = this.page.querySelector('.balance__detail-container');
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
      if (item.checked) {
        const amount = Number(item.value);
        const userPhone = userInfoObj.successData.phone;
        /* if (userPhone === '+79522655566' || userPhone === '+79818380415') {
            api.rechargeBalanceApi(userPhone, amount, 'appWidget', this.getPayLinkYandex);
          } else {
            api.rechargeBalanceApi(userPhone, amount, 'app', this.getPayLink);
          } */
        api.rechargeBalanceApi(userPhone, amount, 'app', this.getPayLink);
      }
    });
  }

  setFillInfoApplePay() {
    this.buttonFillApplePay = this.page.querySelector('.button--type--fill-apple-pay');
    this.topBar = this.page.querySelector('.top-bar');
    this.buttonSizeBar = this.page.querySelectorAll('.form__sums input');

    [...this.buttonSizeBar].forEach((item) => {
      if (item.checked) {
        this.amount = Number(item.value);
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
              shippingMethods: [],
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
    this.page = document.querySelector('.page');
    this.loader = this.page.querySelector('.spinner');
    this.loader.classList.add('spinner--hide');
    if (payInfo.success) {
      document.location.href = payInfo.successData.payUrl;
    } else {
      toggleModal.rendering({ subject: 'Ошибка', text: payInfo.errors[0] });
    }
  }

  getPayLinkYandex(payInfo) {
    console.log(payInfo);
      this.page = document.querySelector('.page');
      this.loader = this.page.querySelector('.spinner');
      this.loader.classList.add('spinner--hide');
      this.buttonFillApplePay = this.page.querySelector('.button--type--fill-apple-pay');

      if (payInfo.success) {
        // Инициализация виджета. Все параметры обязательные.
        const checkout = new window.YandexCheckout({
          confirmation_token: payInfo.successData.confirmationToken, // Токен, который перед проведением оплаты нужно получить от Яндекс.Кассы
          return_url: 'https://xleb.ru/test-app.html', // Ссылка на страницу завершения оплаты
          embedded_3ds: true,
          newDesign: true,
          error_callback(error) {
            toggleModal.rendering({ subject: 'Ошибка', text: error });
          },
        });

        // Отображение платежной формы в контейнере
        checkout.render('payment-form');
      } else {
        toggleModal.rendering({ subject: 'Ошибка', text: payInfo.errors[0] });
      }
  }

  rendering() {
    super.rendering();

    this.cardTopBar = new CreateTopBarWithBackButton({
      selector: ['div'],
      style: ['top-bar'],
      modifier: [`${isIos ? '--size--small--ios' : '--size--small'}`, '--theme--dark'],
      textTitle: ['Пополнение баланса'],
      eventBack: [
        { type: 'click', callback: this.closePage },
        { type: 'click', callback: this.deletePage },
      ],
    });

    this.buttonFill = new CreateButton({
      selector: ['button'],
      style: ['button'],
      modifier: [
        '--size--large',
        '--theme--tangerin',
        '--theme--shadow-big',
        '--type--fill',
      ],
      text: ['Пополнить (100)'],
      eventsOpen: [
        {
          type: 'click',
          callback: this.setFillInfo,
        },
      ],
    });
    this.textAreaFill = new CreateTextAreaBalanceFill({
      selector: ['div'],
      style: ['balance__detail-container'],
    });

    this.page.append(this.cardTopBar.create());
    this.page.append(this.textAreaFill.create());
    this.textArea = this.page.querySelector('.balance__detail-container');
    this.textArea.append(this.buttonFill.create());

    if (isIos) {
      this.buttonFillApplePay = new CreateButton({
        selector: ['button'],
        style: ['button'],
        modifier: [
          '--size--large',
          '--theme--dark-transparent',
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
      this.textArea.append(this.buttonFillApplePay.create());
    }

    this.activeButtonSumFill();
    this.openPage();
  }
}
