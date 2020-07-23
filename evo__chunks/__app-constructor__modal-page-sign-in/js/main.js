class ToggleModalPageSignIn extends ToggleModalPageSignInRoot {
  constructor(parameters) {
    super(parameters);
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
    this.regCall = this.regCall.bind(this);
    this.regSuccess = this.regSuccess.bind(this);
    this.registrationNumber = this.registrationNumber.bind(this);
    this.sendData = this.sendData.bind(this);
    this.askUserInfo = this.askUserInfo.bind(this);
  }

  registrationNumber() {
    this.inputArea = document.querySelector('.form__input-area--type--phone');
    this.inputArea.classList.add('form__input--focused');
    this.phoneNumber = this.inputArea.value;
    this.parameters.api.signInCodeApi(this.phoneNumber, this.regCall);
  }

  sendData(setName, value) {
    const request = {
      method: 'set-client',
      set: setName,
      outputFormat: 'json',
    };
    request[setName] = value;
    this.parameters.api.setClientApi(request, this.showError);
  }

  regCall(info) {
    const inputArea = document.querySelector('.form__input-area--type--phone');
    const phoneNumber = inputArea.value;
    const input = document.querySelector('.form__input');
    const callLink = document.querySelector('.form__link--type--call');
    const accessButton = document.querySelector('.form__button--type--sign-in');
    const callContainer = document.querySelector('.form__call-container');
    const textError = document.querySelector('.form__text--error');
    const textErrorPhone = document.querySelector('.form__text--error-phone');
    const numberForRegistrationEl = document.querySelector('.number-for-registration');
    const numbersElements = document.querySelectorAll('.last-number-input');
    console.log(phoneNumber);
    /* function refreshNumber(infoNumber) {
      callLink.href = `tel:${infoNumber.successData.phone}`;
    } */
    console.log(info);
    if (info.success === true) {
      const { phone } = info.successData;

      textErrorPhone.classList.add('form__text--close', 'form__text--hide');
      textError.classList.add('form__text--hide');
      callContainer.classList.add('form__call-container--open');
      input.classList.add('form__input--close');
      accessButton.classList.add('form__button--hide');
      numberForRegistrationEl.textContent = phoneNumber;

      /* if (phoneNumber === '+70000000000' || phoneNumber === '+7(000)000-00-00') {
        callLink.style.visibility = 'hidden';

        const timerRegSuccess = setInterval(() => {
          this.parameters.api.authorizeApi(this.regSuccess, code, phoneNumber, timerRegSuccess, refreshLink);
        }, 1000);
      }
      const refreshLink = setInterval(() => {
        this.parameters.api.signInApi(phone, refreshNumber);
      }, 240000);

       callLink.addEventListener('click', () => {
        const timerRegSuccess = setInterval(() => {
          this.parameters.api.authorizeApi(this.regSuccess, code, phoneNumber, timerRegSuccess, refreshLink);
        }, 1000);
      }); */
      callLink.addEventListener('click', () => {
        const codeArr = [...numbersElements].map((number) => number.value);
        const code = codeArr.join('');
        this.parameters.api.authorizeCallInApi(this.regSuccess, code, phoneNumber);
      });

      function expandBlock(input) {
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

      function checkCodeIsEntered() {
        let emptyInputs = 0;
        document.querySelectorAll('.form__input-wrapper--last-number-inputs input').forEach((el) => {
          if (el.value !== '') emptyInputs++;
        });
        return emptyInputs === 4;
      }

      function onlyNumbers(e) {
        if (!/\d/.test(e.key)) e.preventDefault();
      }

      document.querySelectorAll('.form__input-wrapper--last-number-inputs input').forEach((el, index) => {
        el.addEventListener('focus', (e) => {
          e.currentTarget.closest('.form__group').classList.add('form__group--focused');
          const tips = e.currentTarget.closest('.form__group').querySelectorAll('.form__tips');
          if (tips.length) {
            tips.forEach((el) => { expandBlock(el); });
          }
        });
        el.addEventListener('blur', (e) => {
          const tips = e.currentTarget.closest('.form__group').querySelectorAll('.form__tips');
          if (tips.length) {
            tips.forEach((el) => { expandBlock(el); });
          }
          e.currentTarget.closest('.form__group').classList.remove('form__group--focused');
        });
        el.addEventListener('beforeinput', (e) => {
          el.value = '';
        });
        el.addEventListener('keyup', function (e) {
          const re = /\d/;
          if (this.value.match(re)) {
            try { el.nextElementSibling.focus(); } catch (e) {
              console.log(e);
            }
          }
          if (el.getAttribute('name') === 'fourth-phone' && checkCodeIsEntered()) {
            callLink.click();
          }
        });
        el.addEventListener('keypress', onlyNumbers);
      });


      // запускается сразу после отправки номера
      /* const timerRegSuccess = setInterval(() => {
        this.parameters.api.authorizeApi(this.regSuccess, code, phoneNumber, timerRegSuccess, refreshLink);
      }, 1000); */
    } else {
      textErrorPhone.innerHTML = info.errors[0];
      textErrorPhone.classList.remove('form__text--close', 'form__text--hide');
    }
  }

  regSuccess(infoSuccess) {
    const textErrorPhone = document.querySelector('.form__text--error-phone');
    const callContainer = document.querySelector('.form__call-container');

    if (infoSuccess.success === true) {
      textErrorPhone.classList.add('form__text--close', 'form__text--hide');
      callContainer.remove();

      this.parameters.api.getClientApi(this.askUserInfo);
    } else {
      textErrorPhone.innerHTML = infoSuccess.errors[0];
      textErrorPhone.classList.remove('form__text--close', 'form__text--hide');
    }
  }

  askUserInfo(userInfo) {
    console.log(userInfo);
    if (userInfo.success === true) {
      localStorage.setItem('user-sign-in', 'true');
      const { birthday, email, name } = userInfo.successData;
      const inputsContainer = document.querySelector('.form__inputs-container');
      const textSuccess = document.querySelector('.form__text--success');
      const buttonAgree = document.querySelector('.form__button--type--agree');

      textSuccess.classList.add('form__text--close');
      inputsContainer.classList.remove('form__inputs-container--hide');

      if (name === '') {
        this.askUserName();
      } else if (birthday === '') {
        this.askUserBirthday();
      } else if (email === '') {
        this.askUserEmail();
      } else {
        api.getMessages();
        if (returnPageObj.returnMainPageAfterSignIn) {
          renderMainPage.closePage();
          renderMainPage.clearPage();
          renderMainPage.rendering();
          renderMainPage.openPage();
          toggleModalPageSignIn.closePage();
          toggleModalPageSignIn.deletePage();
        } else {
          toggleModalPageSignIn.closePage();
          toggleModalPageSignIn.deletePage();
        }

        textSuccess.classList.remove('form__text--close', 'form__text--hide');
        (async () => {
          await rateLastOrder();
        })();
        /* setTimeout(() => {
          buttonAgree.classList.add('form__button--hide');
          textSuccess.textContent = 'Добро пожаловать в Хлебник!';
          textSuccess.classList.remove('form__text--close', 'form__text--hide');
          textSuccess.classList.add('form__text--indentation');
          inputsContainer.classList.remove('form__inputs-container--hide');
        }, 2500); */
      }
    } else {
      this.showError(userInfo);
    }
  }

  showError(info) {
    const textError = document.querySelector('.form__text--error');
    textError.classList.remove('form__text--close', 'form__text--hide');
    if (info.errors[0] !== undefined) {
      textError.textContent = info.errors[0];
    } else {
      textError.classList.add('form__text--close', 'form__text--hide');
    }
    /* console.log('getdata', info);
    api.getClientApi(this.askUserInfo); */
  }

  askUserName() {
    const inputNameContainer = document.querySelector('.form__input-container--name');
    const inputAreaName = document.querySelector('.form__input-area--type--name');
    const buttonAgree = document.querySelector('.form__button--type--agree');
    const textError = document.querySelector('.form__text--error');

    inputNameContainer.classList.remove('form__input-container--hide');
    validation();

    buttonAgree.addEventListener('click', () => {
      if (inputAreaName.value === '') {
        textError.classList.remove('form__text--close', 'form__text--hide');
        textError.textContent = 'Введите имя';
      }
      if (inputAreaName.value !== '') {
        textError.textContent = '';
        textError.classList.add('form__text--close', 'form__text--hide');
        this.sendData('name', inputAreaName.value);
        inputAreaName.value = '';
        inputNameContainer.classList.add('form__input-container--hide');
        setTimeout(() => api.getClientApi(this.askUserInfo),
          300);
      }
    });
  }

  askUserBirthday() {
    const buttonAgree = document.querySelector('.form__button--type--agree');
    const textError = document.querySelector('.form__text--error');
    const inputBirthdayContainer = document.querySelector('.form__input-container--birthday');
    const inputAreaBirthday = document.querySelector('.form__input-area--type--birthday');

    inputBirthdayContainer.classList.remove('form__input-container--hide');

    buttonAgree.addEventListener('click', () => {
      if (inputAreaBirthday.value === '') {
        textError.classList.remove('form__text--close', 'form__text--hide');
        textError.textContent = 'Укажите дату своего рождения';
      } else if (inputAreaBirthday.value !== '') {
        textError.textContent = '';
        textError.classList.add('form__text--close', 'form__text--hide');
        this.sendData('birthday', inputAreaBirthday.value);
        inputAreaBirthday.value = '';
        inputBirthdayContainer.classList.add('form__input-container--hide');
        setTimeout(() => api.getClientApi(this.askUserInfo),
          300);
      }
    });
  }

  askUserEmail() {
    const buttonAgree = document.querySelector('.form__button--type--agree');
    const textError = document.querySelector('.form__text--error');
    const textSuccess = document.querySelector('.form__text--success');
    const inputEmailContainer = document.querySelector('.form__input-container--email');
    const inputAreaEmail = document.querySelector('.form__input-area--type--email');

    inputEmailContainer.classList.remove('form__input-container--hide');
    validation();

    buttonAgree.addEventListener('click', () => {
      if (inputAreaEmail.value === '') {
        textError.classList.remove('form__text--close', 'form__text--hide');
        textError.textContent = 'Укажите email';
      } else if (inputAreaEmail.value !== '') {
        this.sendData('email', inputAreaEmail.value);
        inputAreaEmail.value = '';
        inputEmailContainer.classList.add('form__input-container--hide');
        textError.textContent = '';
        textError.classList.add('form__text--close', 'form__text--hide');
        toggleModal.renderingEmail();
        toggleModal.openPage();
        api.getMessages();
        api.getClientApi();
        if (returnPageObj.returnMainPageAfterSignIn) {
          renderMainPage.closePage();
          renderMainPage.clearPage();
          renderMainPage.rendering();
          renderMainPage.openPage();
          toggleModalPageSignIn.closePage();
          toggleModalPageSignIn.deletePage();
        } else {
          toggleModalPageSignIn.closePage();
          toggleModalPageSignIn.deletePage();
        }


        (async () => {
          await rateLastOrder();
        })();
      }
    });
  }

  rendering() {
    super.rendering();

    const signInTopBar = new CreateTopBarWithCloseIcon({
      selector: ['div'],
      style: ['top-bar'],
      modifier: [`--size--medium${isIos ? '--ios' : ''}`],
      textTitle: ['Вход'],
      eventCloseIcon: [
        { type: 'click', callback: this.closePage },
        { type: 'click', callback: this.deletePage },
      ],
    });
    const formInputSignIn = new CreateFormInputSignIn({
      selector: ['div'],
      style: ['form'],
      modifier: [
        '--indentation--sign-in',
        '--indentation',
      ],
      events: [
        { type: 'click', callback: () => { this.registrationNumber(this); } },
      ],
      eventSkip: [
        {
          type: 'click',
          callback: () => {
            api.getMessages();
            if (returnPageObj.returnMainPageAfterSignIn) {
              renderMainPage.closePage();
              renderMainPage.clearPage();
              renderMainPage.rendering();
              renderMainPage.openPage();
              toggleModalPageSignIn.closePage();
              toggleModalPageSignIn.deletePage();
            } else {
              toggleModalPageSignIn.closePage();
              toggleModalPageSignIn.deletePage();
            }
          },
        },
      ],
    });
    this.modalPageSignIn.append(createTopBarIos());
    this.modalPageSignIn.append(signInTopBar.create());
    this.modalPageSignIn.append(formInputSignIn.create());
    const inputArea = document.querySelector('.form__input-area--type--phone');
    /* inputArea.addEventListener('focusout', () => {
      this.registrationNumber(this);
    }); */
    inputArea.addEventListener('keydown', (event) => {
      if (event.code === 'Enter' || event.code === 'Go' || event.code === 13) {
        this.registrationNumber(this);
      }
    });

    const phoneMask = IMask(
      document.querySelector('.form__input-area--type--phone-sign-in'), {
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
