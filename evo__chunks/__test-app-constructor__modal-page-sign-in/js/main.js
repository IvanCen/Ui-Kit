class ToggleModalPageSignIn extends ToggleModalPageSignInRoot {
  constructor(parameters) {
    super(parameters);
    this.returnPage = this.returnPage.bind(this);
    this.registrationNumber = this.registrationNumber.bind(this);
    this.expandBlock = this.expandBlock.bind(this);
    this.sendData = this.sendData.bind(this);
    this.checkCodeIsEntered = this.checkCodeIsEntered.bind(this);
    this.onlyNumbers = this.onlyNumbers.bind(this);
    this.regCall = this.regCall.bind(this);
    this.regSuccess = this.regSuccess.bind(this);
    this.askUserInfo = this.askUserInfo.bind(this);
    this.askUserData = this.askUserData.bind(this);
    this.showError = this.showError.bind(this);
    this.rendering = this.rendering.bind(this);
  }

  /* метод возврата на прошлую страницу, берет boolean из глобального объекта выставляемое перед отрисовкой страницы */
  returnPage() {
    if (returnPageObj.returnMainPageAfterSignIn) {
      renderMainPage.closePage();
      renderMainPage.clearPage();
      renderMainPage.rendering();
      renderMainPage.openPage();
      toggleModalPageSignIn.closePage();
      toggleModalPageSignIn.deletePage();
      history.pushState({ state: '#' }, null, '#');
    } else if (returnPageObj.returnBalanceAfterSignIn) {
      toggleBalance.closePage();
      toggleBalance.clearPage();
      toggleBalance.rendering();
      toggleBalance.openPage();
      toggleModalPageSignIn.closePage();
      toggleModalPageSignIn.deletePage();
      history.pushState({ state: '#' }, null, '#');
    } else {
      toggleModalPageSignIn.closePage();
      toggleModalPageSignIn.deletePage();
    }
  }

  /* метод отправки телефона пользователя на сервер */
  registrationNumber() {
    const inputArea = this.modalPageSignIn.querySelector('.form__input-area--type--phone-sign-in');
    inputArea.classList.add('form__input--focused');
    const phoneNumber = inputArea.value;
    api.signInCodeApi(phoneNumber, this.regCall);
    /* const info = {success: true};
    this.regCall(info); */
  }

  sendData(setName, value) {
    const request = {
      method: 'set-client',
      set: setName,
      outputFormat: 'json',
    };
    request[setName] = value;
    api.setClientApi(request, this.showError);
  }

  expandBlock(input) {
    if (input.style.maxHeight === 0 || input.style.maxHeight === '0px') {
      input.style.maxHeight = `${input.scrollHeight}px`;
      setTimeout(() => {
        input.style.maxHeight = '100%';
      }, 250);
    } else if (input.style.maxHeight === '100%') {
      setTimeout(() => {
        if (input.closest('.form__group').classList.contains('form__group--isInvalid')) return;
        if (input.classList.contains('form__tips--info')) return;
        input.style.maxHeight = `${input.scrollHeight}px`;
        input.style.maxHeight = 0;
      }, 250);
    }
  }

  checkCodeIsEntered() {
    let emptyInputs = 0;
    document.querySelectorAll('.form__input-wrapper--last-number-inputs input').forEach((el) => {
      if (el.value !== '') emptyInputs++;
    });
    return emptyInputs === 4;
  }

  onlyNumbers(e) {
    if (!/\d/.test(e.key)) e.preventDefault();
  }

  /* метод показа ввода полей кода и его отправка на сервер */
  regCall(info) {
    const inputArea = this.modalPageSignIn.querySelector('.form__input-area--type--phone-sign-in');
    const textErrorPhone = this.modalPageSignIn.querySelector('.form__text--error-phone');
    const textError = this.modalPageSignIn.querySelector('.form__text--error');
    const callButton = this.modalPageSignIn.querySelector('.form__button--type--call');
    const accessButton = this.modalPageSignIn.querySelector('.form__button--type--sign-in');
    const callContainer = this.modalPageSignIn.querySelector('.form__call-container');
    const numberForRegistrationEl = this.modalPageSignIn.querySelector('.number-for-registration');
    const numbersElements = this.modalPageSignIn.querySelectorAll('.last-number-input');
    const linkBack = this.modalPageSignIn.querySelector('.form__link--type--back');
    const input = this.modalPageSignIn.querySelector('.form__input');

    const phoneNumber = inputArea.value;

    console.log(info);

    if (info.success === true) {
      textErrorPhone.classList.add('form__text--close', 'form__text--hide');
      textError.classList.add('form__text--hide');
      callContainer.classList.add('form__call-container--open');
      input.classList.add('form__input--close');
      accessButton.classList.add('form__button--hide');
      numberForRegistrationEl.textContent = phoneNumber;
      textError.textContent = '';

      callButton.addEventListener('click', () => {
        const codeArr = [...numbersElements].map((number) => number.value);
        const code = codeArr.join('');
        localStorage.setItem('authorizationCode', code);
        api.authorizeCallInApi(this.regSuccess, code, phoneNumber);
      });

      linkBack.addEventListener('click', () => {
        textErrorPhone.classList.remove('form__text--close', 'form__text--hide');
        textError.classList.remove('form__text--hide');
        callContainer.classList.remove('form__call-container--open');
        input.classList.remove('form__input--close');
        accessButton.classList.remove('form__button--hide');
      });
      [...document.querySelectorAll('.form__input-wrapper--last-number-inputs input')].forEach((el, index) => {
        el.addEventListener('focus', (e) => {
          e.currentTarget.closest('.form__group').classList.add('form__group--focused');
          const tips = e.currentTarget.closest('.form__group').querySelectorAll('.form__tips');
          if (tips.length) {
            tips.forEach((el) => {
              this.expandBlock(el);
            });
          }
        });
        el.addEventListener('blur', (e) => {
          const tips = e.currentTarget.closest('.form__group').querySelectorAll('.form__tips');
          if (tips.length) {
            tips.forEach((el) => {
              this.expandBlock(el);
            });
          }
          e.currentTarget.closest('.form__group').classList.remove('form__group--focused');
        });
        el.addEventListener('beforeinput', (e) => {
          el.value = '';
        });
        el.addEventListener('keyup', (event) => {
          const re = /\d/;
          if (event.target.value.match(re)) {
            try {
              el.nextElementSibling.focus();
            } catch (e) {
              console.log(e);
            }
          }
          if (el.getAttribute('name') === 'fourth-phone' && this.checkCodeIsEntered()) {
            callButton.click();
          }
        });
        el.addEventListener('keypress', this.onlyNumbers);
      });
    } else {
      textErrorPhone.innerHTML = info.errors[0];
      textErrorPhone.classList.remove('form__text--close', 'form__text--hide');
    }
  }

  /* метод вызывающийся после успешной авторизации */
  regSuccess(infoSuccess) {
    const textErrorPhone = this.modalPageSignIn.querySelector('.form__text--error-phone');
    const callContainer = this.modalPageSignIn.querySelector('.form__call-container');
    const formInput = this.modalPageSignIn.querySelector('.form__input');
    const buttonSignIn = this.modalPageSignIn.querySelector('.form__button--type--sign-in');

    if (infoSuccess.success) {
      textErrorPhone.classList.add('form__text--close', 'form__text--hide');
      callContainer.remove();
      if (infoSuccess.isStartApp && infoSuccess.name === '') {
        formInput.remove();
        buttonSignIn.remove();
        api.getClientApi(this.askUserInfo);
      } else {
        api.getClientApi(this.returnPage);
      }
    } else {
      textErrorPhone.innerHTML = infoSuccess.errors[0];
      textErrorPhone.classList.remove('form__text--close', 'form__text--hide');
    }
  }

  /* метод запроса данных о пользователе */
  askUserInfo(userInfo) {
    console.log(userInfo);

    if (userInfo.success === true) {
      api.getClientAchievements();
      api.getMessages();
      api.getClientApi();

      localStorage.setItem('user-sign-in', 'true');
      const { birthday, email, name } = userInfo.successData;
      const objUserAskInfo = {
        name: {
          nameInfo: 'name',
          errorText: 'Введите имя',
        },
        birthday: {
          nameInfo: 'birthday',
          errorText: 'Укажите дату своего рождения',
        },
        email: {
          nameInfo: 'email',
          errorText: 'Укажите email',
        },
      };
      const inputsContainer = this.modalPageSignIn.querySelector('.form__inputs-container');
      const textSuccess = this.modalPageSignIn.querySelector('.form__text--success');

      if (textSuccess && inputsContainer) {
        textSuccess.classList.add('form__text--close');
        inputsContainer.classList.remove('form__inputs-container--hide');
      }

      if (name === '') {
        this.askUserData(objUserAskInfo.name);
      } else if (birthday === '') {
        this.askUserData(objUserAskInfo.birthday);
      } else if (email === '') {
        this.askUserData(objUserAskInfo.email);
      } else {
        this.returnPage();
        textSuccess.classList.remove('form__text--close', 'form__text--hide');
        (async () => {
          await rateLastOrder();
        })();
      }
    } else {
      this.showError(userInfo);
    }
  }

  /* метод показа ошибки от сервера */
  showError(info) {
    const textError = this.modalPageSignIn.querySelector('.form__text--error');
    textError.classList.remove('form__text--close', 'form__text--hide');
    if (info.errors[0] !== undefined) {
      textError.textContent = info.errors[0];
    } else {
      textError.classList.add('form__text--close', 'form__text--hide');
    }
  }

  /* универсальный метод для запроса переданных данных в параметры по соответствующим полям input */
  askUserData({ nameInfo, errorText }) {
    const inputContainer = this.modalPageSignIn.querySelector(`.form__input-container--${nameInfo}`);
    const inputArea = this.modalPageSignIn.querySelector(`.form__input-area--type--${nameInfo}`);
    const buttonAgree = this.modalPageSignIn.querySelector('.form__button--type--agree');
    const textError = this.modalPageSignIn.querySelector('.form__text--error');

    if (inputContainer && buttonAgree) {
      inputContainer.classList.remove('form__input-container--hide');

      validation();

      buttonAgree.addEventListener('click', () => {
        if (inputArea.value === '') {
          textError.classList.remove('form__text--close', 'form__text--hide');
          textError.textContent = errorText;
        } else {
          textError.textContent = '';
          textError.classList.add('form__text--close', 'form__text--hide');
          this.sendData(nameInfo, inputArea.value);
          inputArea.value = '';
          inputContainer.classList.add('form__input-container--hide');
          if (nameInfo === 'email') {
            toggleModal.renderingEmail();
            toggleModal.openPage();
            api.getClientApi();
            this.returnPage();
            (async () => {
              await rateLastOrder();
            })();
          } else {
            api.getClientApi(this.askUserInfo);
          }
        }
      });
    }
  }

  rendering() {
    super.rendering();
    /* создание компонентов страницы */
    this.signInTopBar = new CreateTopBarWithCloseIcon({
      selector: ['div'],
      style: ['top-bar'],
      modifier: [`--size--medium${isIos ? '--ios' : ''}`],
      textTitle: ['Вход'],
      eventCloseIcon: [
        { type: 'click', callback: this.closePage },
        { type: 'click', callback: this.deletePage },
      ],
    });
    this.formInputSignIn = new CreateFormInputSignIn({
      selector: ['div'],
      style: ['form'],
      modifier: [
        '--indentation--sign-in',
        '--indentation',
      ],
      events: [
        {
          type: 'click',
          callback: () => {
            this.registrationNumber(this);
          },
        },
      ],
      eventSkip: [
        {
          type: 'click',
          callback: () => {
            api.getMessages();
            this.returnPage();
          },
        },
      ],
    });

    /* добавление компонентов на страницу */
    this.modalPageSignIn.append(createTopBarIos());
    this.modalPageSignIn.append(this.signInTopBar.create());
    this.modalPageSignIn.append(this.formInputSignIn.create());

    this.inputArea = this.modalPageSignIn.querySelector('.form__input-area--type--phone-sign-in');
    this.notDoubleSend = true;
    this.inputArea.addEventListener('keydown', (event) => {
      if (event.code === 'Enter' || event.code === 'Go' || event.code === 13) {
        if (this.notDoubleSend) {
          this.registrationNumber(this);
        } else {
          this.notDoubleSend = !this.notDoubleSend;
          setTimeout(() => this.notDoubleSend = !this.notDoubleSend, 2000);
        }
      }
    });
    this.inputArea.addEventListener('focusout', () => {
      if (this.notDoubleSend) {
        this.registrationNumber(this);
      } else {
        this.notDoubleSend = !this.notDoubleSend;
        setTimeout(() => this.notDoubleSend = !this.notDoubleSend, 2000);
      }
    });

    this.phoneMask = IMask(
      this.modalPageSignIn.querySelector('.form__input-area--type--phone-sign-in'), {
        mask: '+{7}(000)000-00-00',
        lazy: false,
        placeholderChar: '_',
        autoUnmask: true,
      },
    );

    inputFlyLabel();

    this.openPage();
  }
}
