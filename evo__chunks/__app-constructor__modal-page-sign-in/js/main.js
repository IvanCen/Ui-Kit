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
    toggleModalPageSignIn.closePage();
    toggleModalPageSignIn.deletePage();
    console.log(returnPageObj);
    if (returnPageObj.returnMainPageAfterSignIn) {
      this.buttonMain = document.querySelector('.main-panel__button--type--main');
      this.buttonMain.click();
      returnPageObj.returnMainPageAfterSignIn = false;
    } else if (returnPageObj.returnBalanceAfterSignIn) {
      this.buttonBalance = document.querySelector('.main-panel__button--type--balance');
      this.buttonBalance.click();
      returnPageObj.returnBalanceAfterSignIn = false;
    } else {
      this.buttonAccount = document.querySelector('.main-panel__button--type--profile');
      this.buttonAccount.click();
    }
    history.pushState({ state: '#' }, null, '#');
  }

  /* метод отправки телефона пользователя на сервер */
  registrationNumber() {
    const inputArea = this.modalPageSignIn.querySelector('.form__input-area--type--phone-sign-in');
    inputArea.classList.add('form__input--focused');
    const phoneNumber = inputArea.value;
    api.signInCodeApi(phoneNumber, this.regCall);
  }

  sendData(setName, value) {
    const request = {
      method: 'set-client',
      set: setName,
      phone: authorizationPhone,
      code: authorizationCode,
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
    const form = this.modalPageSignIn.querySelector('.form');

    const phoneNumber = inputArea.value;

    console.log(info);

    if (info.success === true) {
      localStorage.setItem('authorizationPhone', info.successData.phone);
      authorizationPhone = info.successData.phone;
      textErrorPhone.classList.add('form__text--close', 'form__text--hide');
      textError.classList.add('form__text--hide');
      callContainer.classList.add('form__call-container--open');
      input.classList.add('form__input--close');
      accessButton.classList.add('form__button--hide');
      form.classList.remove('form--indentation');
      numberForRegistrationEl.textContent = phoneNumber;
      textError.textContent = '';

      callButton.addEventListener('click', () => {
        const codeArr = [...numbersElements].map((number) => number.value);
        const code = codeArr.join('');
        localStorage.setItem('authorizationCode', code);
        authorizationCode = code;
        api.authorizeCallInApi(this.regSuccess, code, phoneNumber);
      });

      function checkCodeIsEntered() {
        let emptyInputs = 0;
        document.querySelectorAll('.last-number-input').forEach((el) => {
          if (el.value !== '') emptyInputs++;
        });
        return emptyInputs === 4;
      }

      document.querySelectorAll('.last-number-input').forEach((el, index) => {
        el.addEventListener('focus', (e) => {
          e.target.classList.add('last-number-input--not-empty');
        });
        el.addEventListener('blur', (e) => {
          if (el.value === '') el.classList.remove('last-number-input--not-empty');
        });
        el.addEventListener('keyup', (e) => {
          if (el.getAttribute('data-pos') === 'last' && checkCodeIsEntered()) {
            // document.querySelector(".form[data-id='code']").submit();
            callButton.classList.remove('button--type--disabled');
            callButton.removeAttribute('disabled');
            console.log('submit');
          } else {
            callButton.classList.add('button--type--disabled');
            callButton.setAttribute('disabled', true);
          }
        });
      });

      linkBack.addEventListener('click', () => {
        textErrorPhone.classList.add('form__text--close', 'form__text--hide');
        textError.classList.add('form__text--hide');
        callContainer.classList.remove('form__call-container--open');
        input.classList.remove('form__input--close');
        accessButton.classList.remove('form__button--hide');
        textError.textContent = '';
        textErrorPhone.textContent = '';
        numbersElements.forEach((item) => {
          item.value = '';
          item.classList.remove('last-number-input--not-empty');
        });
        form.classList.add('form--indentation');
      });
      setTimeout(() => numbersElements[0].focus(), 200);
      [...numbersElements].forEach((el) => {
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
          if (event.keyCode === 8) {
            try {
              el.previousElementSibling.focus();
            } catch (e) {
              el.closest('.form__group').querySelector('.button').focus();
            }
          }
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
    const textErrorCode = this.modalPageSignIn.querySelector('.form__text--error-code');
    const textInfoNumber = this.modalPageSignIn.querySelector('.form__text-info-number');
    const callContainer = this.modalPageSignIn.querySelector('.form__call-container');
    const formInput = this.modalPageSignIn.querySelector('.form__input');
    const buttonSignIn = this.modalPageSignIn.querySelector('.form__button--type--sign-in');
    const againButton = this.modalPageSignIn.querySelector('.form__button--type--again');
    const callButton = this.modalPageSignIn.querySelector('.form__button--type--call');
    const numbersElements = this.modalPageSignIn.querySelectorAll('.last-number-input');

    if (infoSuccess.success) {
      textErrorPhone.classList.add('form__text--close', 'form__text--hide');
      textInfoNumber.classList.add('form__text--indentation--small');
      callContainer.remove();
      if (infoSuccess.isStartApp && infoSuccess.name === '') {
        formInput.remove();
        buttonSignIn.remove();
        api.getClientApi();
      } else {
        api.getClientApi(this.askUserInfo);
      }
    } else {
      textErrorCode.innerHTML = `*${infoSuccess.errors[0]}`;
      textErrorCode.classList.remove('form__text--close', 'form__text--hide');
      callButton.classList.add('button--type--disabled');
      callButton.disabled = true;
      againButton.classList.remove('form__button--hide');
      textInfoNumber.classList.remove('form__text--indentation--small');
    }
  }

  /* метод запроса данных о пользователе */
  askUserInfo(userInfo) {
    if (userInfo.success) {
      api.getClientApi();
      const loginHeader = document.querySelector('.login__header');
      const buttonJoin = document.querySelector('.button--join');
      if (buttonJoin) {
        buttonJoin.classList.add('button--hide');
      }
      const formInputSignInQuestions = new CreateFormInputSignInQuestions({
        selector: ['div'],
        style: ['login__container'],
      });
      loginHeader.after(formInputSignInQuestions.create(userInfo.successData));
      const loginContainerEl = document.querySelector('.login__container');
      const form = document.querySelector('.form--size--full');
      loginContainerEl.classList.add('login__container-for-swip', 'login__container--visible', 'form__inputs-container', 'form__inputs-container--hide', 'swiper-container');
      form.classList.add('form--hide');
      console.log(userInfo);
      window.swipLoginForms = new Swiper('.login__container-for-swip', {
        spaceBetween: 90,
        slidesPerView: '1',
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
        },
      });
      const loginContainer = document.querySelector('.login__container');
      const loginContainerForSwipSubmitAll = this.modalPageSignIn.querySelectorAll('.button--type--next-swiper');
      const inputs = this.modalPageSignIn.querySelectorAll('.form__input-area');

      loginContainer.classList.add('login__container--visible');
      loginContainer.classList.remove('form__inputs-container--hide');

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

      loginContainerForSwipSubmitAll.forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();

          const swiperSlide = btn.closest('.swiper-slide');

          const nameInfo = swiperSlide.getAttribute('data-id');
          const inputArea = swiperSlide.querySelector(`.form__input-area--type--${nameInfo}`);
          const textError = document.querySelector('.form__text--error');
          const input = swiperSlide.querySelector('.form__input-area');
          console.log(swiperSlide, input);
          if (input.value !== '') {
            textError.textContent = '';
            textError.classList.add('form__text--close', 'form__text--hide');
            this.sendData(nameInfo, inputArea.value);

            if (nameInfo === 'email') {
              toggleModal.renderingEmail();
              toggleModal.openPage();
              api.getClientApi();
              this.returnPage();
              (async () => {
                await rateLastOrder();
              })();
            }
            window.swipLoginForms.slideNext();
          } else {
            textError.classList.remove('form__text--close', 'form__text--hide');
            textError.textContent = objUserAskInfo[nameInfo].errorText;
          }
        });
      });
      inputs.forEach((input) => {
        const swiperSlide = input.closest('.swiper-slide');
        if (swiperSlide) {
          const bnt = swiperSlide.querySelector('.button--type--next-swiper');
          console.log(bnt, swiperSlide);
          input.addEventListener('keyup', () => {
            if (input.value === '') {
              bnt.classList.add('button--type--disabled');
              bnt.setAttribute('disabled', 'true');
            } else {
              bnt.classList.remove('button--type--disabled');
              bnt.removeAttribute('disabled');
            }
          });
          input.addEventListener('click', () => {
            const calendarAcceptButton = document.querySelector('.datepicker__calendar-accept');
            if (calendarAcceptButton) {
              calendarAcceptButton.addEventListener('click', () => {
                if (input.value === '') {
                  bnt.classList.add('button--type--disabled');
                  bnt.setAttribute('disabled', 'true');
                } else {
                  bnt.classList.remove('button--type--disabled');
                  bnt.removeAttribute('disabled');
                }
              });
            }
          });
        }
      });

      const loginContainerForSwipSkipAll = document.querySelectorAll('.login__container-for-swip .button[type=skip]');
      loginContainerForSwipSkipAll.forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          this.returnPage();
        });
      });

      inputFlyLabel();

      localStorage.setItem('user-sign-in', 'true');
      const { birthday, email, name } = userInfo.successData;

      const inputsContainer = this.modalPageSignIn.querySelector('.form__inputs-container');
      const textSuccess = this.modalPageSignIn.querySelector('.form__text--success');

      textSuccess.classList.add('form__text--close');
      if (textSuccess && inputsContainer) {
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
      textError.textContent = `*${info.errors[0]}`;
    } else {
      textError.classList.add('form__text--close', 'form__text--hide');
    }
  }

  /* универсальный метод для запроса переданных данных в параметры по соответствующим полям input */
  askUserData({ nameInfo, errorText }) {
    const inputContainer = this.modalPageSignIn.querySelector(`.form__input-container--${nameInfo}`);
    const inputArea = this.modalPageSignIn.querySelector(`.form__input-area--type--${nameInfo}`);
    const buttonAgree = this.modalPageSignIn.querySelector(`.form__button--type--next-${nameInfo}`);
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
            // this.returnPage();
            (async () => {
              await rateLastOrder();
            })();
          } else {
            api.getClientApi(/* this.askUserInfo */);
          }
        }
      });
    }
  }

  rendering() {
    super.rendering();
    /* создание компонентов страницы */
    this.signInTopBar = new CreateTopBarSignIn({
      selector: ['div'],
      style: ['login__header'],
      modifier: [`${isIos ? '--ios' : ''}`],
      eventCloseIcon: [
        { type: 'click', callback: this.closePage },
        { type: 'click', callback: this.deletePage },
      ],
    });
    this.formInputSignIn = new CreateFormInputSignIn({
      selector: ['div'],
      style: ['form'],
      modifier: [
        '--size--full',
        '--indentation',
      ],
      events: [
        {
          type: 'click',
          callback: () => {
            stopAction(() => {
              if (timeRequest > (Date.now() - 3000)) {
                console.log('nothing!');
              } else {
                this.registrationNumber(this);
                timeRequest = Date.now();
              }
            });
          },
        },
      ],
      eventSkip: [
        {
          type: 'click',
          callback: () => {
            stopAction(() => {
              api.getMessages();
              this.returnPage();
            });
          },
        },
      ],
      eventAgain: [
        {
          type: 'click',
          callback: () => {
            stopAction(() => {
              const inputsNumber = this.modalPageSignIn.querySelectorAll('.last-number-input');
              inputsNumber.forEach((item) => item.value = '');
              inputsNumber[0].focus();
              this.registrationNumber(this);
            });
          },
        },
      ],
    });

    /* добавление компонентов на страницу */
    this.modalPageSignIn.append(this.signInTopBar.create());
    this.modalPageSignIn.append(this.formInputSignIn.create());

    this.inputArea = this.modalPageSignIn.querySelector('.form__input-area--type--phone-sign-in');
    this.inputArea.addEventListener('keydown', (event) => {
      if (event.code === 'Enter' || event.code === 'Go' || event.code === 13) {
        this.registrationNumber(this);
      }
    });

    IMask(
      this.inputArea, {
        mask: '+{7}(000)000-00-00',
        lazy: false,
        placeholderChar: '_',
        autoUnmask: true,
      },
    );

    inputFlyLabel();
    setTimeout(() => {
      this.inputArea.focus();
    }, 400);
    this.openPage();
  }
}
