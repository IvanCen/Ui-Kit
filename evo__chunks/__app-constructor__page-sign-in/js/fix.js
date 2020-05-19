class TogglePageSignIn extends TogglePage {
  constructor(parameters) {
    super(parameters);
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
  }

  refreshNumber(infoNumber) {
    callLink.href = `tel:${infoNumber.successData.phone}`;
  }

  sendData(setName, value) {
    const request = {
      method: 'set-client',
      set: setName,
      name: inputAreaName.value,
      outputFormat: 'json',
    };
    request[setName] = value;
    setClientApi(request);
  }

  askUserInfo() {
    /**
         * тут мы проверяем есть ли заполненные данные
         */
    const data = {};
    if (data.name === '') {
      this.askUserName();
    } else if (data.email === '') {
      this.askUserEmail();
    } else if (data.birthday === '') {
      this.askUserBirthday();
    }
  }

  askUserName() {
    /**
         * Тут спрашиваем имя, потом его устанавливаем, в случае успеха запускаем еще раз askUserInfo
         */
  }

  askUserEmail() {
    /**
         * Тут спрашиваем email, потом его устанавливаем, в случае успеха запускаем еще раз askUserInfo
         */
  }

  askUserBirthday() {
    /**
         * Тут спрашиваем дату рождения, потом ее устанавливаем, в случае успеха возвращаем окошко с благодарностью
         */
  }

  regSuccess(infoSuccess) {
    console.log(infoSuccess);
    if (infoSuccess.success === true) {
      function render(userInfo) {
        function delay(ms) {
          return new Promise((resolve) => setTimeout(resolve, ms));
        }

        console.log(userInfo);
        callContainer.remove();
        textSuccess.classList.remove('form__text--hide');
        clearInterval(refreshLink);
        setTimeout(() => {
          textSuccess.classList.add('form__text--hide');
        }, 2000);
        const { birthday, email, name } = userInfo.successData;
        const inputsContainer = document.querySelector('.form__inputs-container');
        const inputNameContainer = document.querySelector('.form__input-container--name');
        const inputEmailContainer = document.querySelector('.form__input-container--email');
        const inputBirthdayContainer = document.querySelector('.form__input-container--birthday');
        const inputAreaName = document.querySelector('.form__input-area--type--name');
        const inputAreaEmail = document.querySelector('.form__input-area--type--email');
        const inputAreaBirthday = document.querySelector('.form__input-area--type--birthday');
        const buttonAgree = document.querySelector('.form__button--type--agree');
        const form = document.querySelector('.form');
        form.classList.add('form--indentation--bottom');


        validation();


        /**
                 * Вместо жести ниже, вызываем метод askUserInfo
                 */
        this.askUserInfo();


        if (name === '') {
          inputNameContainer.classList.remove('form__input-container--hide');
        }

        if (name !== '' && email !== '' && name !== '') {
          setTimeout(() => {
            togglePage.closePage();
            togglePage.deletePage();
            inputsContainer.classList.remove('form__inputs-container--hide');
          }, 2500);
        }
        delay(2000)
          .then(() => {
            textSuccess.classList.add('form__text--close');
            inputsContainer.classList.remove('form__inputs-container--hide');
            if (name === '') {
              buttonAgree.addEventListener('click', () => {
                if (inputAreaName.value === '') {
                  textError.classList.remove('form__text--close', 'form__text--hide');
                  textError.textContent = 'Введите имя';
                }
                if (inputAreaName.value !== '') {
                  textError.classList.add('form__text--close', 'form__text--hide');
                  sendData('name', inputAreaName.value);
                  inputAreaName.value = '';
                  inputNameContainer.classList.add('form__input-container--hide');
                  if (birthday === '') {
                    inputBirthdayContainer.classList.remove('form__input-container--hide');
                    buttonAgree.addEventListener('click', () => {
                      if (inputAreaBirthday.value === '') {
                        textError.classList.remove('form__text--close', 'form__text--hide');
                        textError.textContent = 'Укажите дату своего рождения';
                      }
                      if (inputAreaBirthday.value !== '') {
                        textError.classList.add('form__text--close', 'form__text--hide');
                        sendData('birthday', inputAreaBirthday.value);
                        inputAreaBirthday.value = '';
                        inputBirthdayContainer.classList.add('form__input-container--hide');
                        if (email === '') {
                          inputEmailContainer.classList.remove('form__input-container--hide');
                          buttonAgree.addEventListener('click', () => {
                            if (inputAreaEmail.value === '') {
                              textError.classList.remove('form__text--close', 'form__text--hide');
                              textError.textContent = 'Укажите email';
                            }
                            if (inputAreaEmail.value !== '') {
                              textError.classList.add('form__text--close', 'form__text--hide');
                              sendData('email', inputAreaEmail.value);
                              inputAreaEmail.value = '';
                              inputEmailContainer.classList.add('form__input-container--hide');
                              textSuccess.textContent = `Добро пожаловать в Хлебник ${inputAreaName.value}!`;
                              buttonAgree.classList.add('form__button--hide');
                              textSuccess.classList.remove('form__text--close', 'form__text--hide');
                              textSuccess.classList.add('form__text--indentation');
                              toggleModal.renderingEmail();
                              toggleModal.openPage();
                            }
                            if (!modal) {
                              setTimeout(() => {
                                togglePage.closePage();
                                togglePage.deletePage();
                                inputsContainer.classList.remove('form__inputs-container--hide');
                              }, 2500);
                            }
                          });
                        }
                      }
                    });
                  }
                }
              });
            }
          });
      }
      getClientApi(render);
    }
  }

  regCall(info) {
    console.log(this);
    const input = document.querySelector('.form__input');
    const callLink = document.querySelector('.form__link--type--call');
    const accessButton = document.querySelector('.form__button--type--sign-in');
    const callContainer = document.querySelector('.form__call-container');
    const textSuccess = document.querySelector('.form__text--success');
    const textError = document.querySelector('.form__text--error');
    const textErrorPhone = document.querySelector('.form__text--error-phone');
    if (info.success === true) {
      textErrorPhone.classList.add('form__text--close', 'form__text--hide');
      const { code, phone } = info.successData;
      textError.classList.add('form__text--hide');
      callContainer.classList.add('form__call-container--open');
      input.classList.add('form__input--close');
      accessButton.classList.add('form__button--hide');
      callLink.href = `tel:${phone}`;

      const refreshLink = setInterval(() => {
        this.parameters.api.signInApi(phone, refreshNumber);
      }, 240000);

      const inputArea = document.querySelector('.form__input-area--type--phone');
      const phoneNumber = inputArea.value;
      callLink.addEventListener('click', () => {
        const timerRegSuccess = setInterval(() => {
          this.parameters.api.authorizeApi(this.regSuccess, code, phoneNumber, timerRegSuccess);
        }, 1000);
      });
    } else {
      textErrorPhone.innerHTML = info.errors[0];
      textErrorPhone.classList.remove('form__text--close', 'form__text--hide');
    }
  }

  registration() {
    console.log(this);
    const inputArea = document.querySelector('.form__input-area--type--phone');
    const phoneNumber = inputArea.value;
    this.parameters.api.signInApi(phoneNumber, (info) => { this.regCall(info); });
  }

  rendering() {
    super.rendering();
    const {
      signInApi, authorizeApi, getClientApi, setClientApi,
    } = this.parameters.api;

    const signInTopBar = new CreateTopBarWithCloseIcon({
      selector: ['div'],
      style: ['top-bar'],
      modifier: ['--size--small'],
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
        { type: 'click', callback: () => { this.registration(); } },
        { type: 'keydown', callback: () => { this.registration(); } },
      ],
      eventSkip: [
        { type: 'click', callback: this.closePage },
        { type: 'click', callback: this.deletePage },
      ],
    });

    this.page.append(signInTopBar.create());
    this.page.append(formInputSignIn.create());
    inputFlyLabel();
    activeButton();
    const inputAreaPhone = document.querySelector('.form__input-area--type--phone');
    this.openPage();
  }
}
