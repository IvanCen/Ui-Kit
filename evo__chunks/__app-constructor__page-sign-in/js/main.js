class TogglePageSignIn extends TogglePage {
  constructor(parameters) {
    super(parameters);
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
  }

  rendering() {
    super.rendering();
    const {
      signInApi, authorizeApi, getClientApi, setClientApi,
    } = this.parameters.api;

    function registration() {
      const input = document.querySelector('.form__input');
      const inputArea = document.querySelector('.form__input-area--type--phone');
      const callLink = document.querySelector('.form__link--type--call');
      const accessButton = document.querySelector('.form__button--type--sign-in');
      const callContainer = document.querySelector('.form__call-container');
      const textSuccess = document.querySelector('.form__text--success');
      const textError = document.querySelector('.form__text--error');
      const textErrorPhone = document.querySelector('.form__text--error-phone');
      const phoneNumber = inputArea.value;
      function refreshNumber(infoNumber) {
        callLink.href = `tel:${infoNumber.successData.phone}`;
      }
      function regCall(info) {
        if (info.success === true) {
          textErrorPhone.classList.add('form__text--close', 'form__text--hide');
          const { code, phone } = info.successData;
          textError.classList.add('form__text--hide');
          callContainer.classList.add('form__call-container--open');
          input.classList.add('form__input--close');
          accessButton.classList.add('form__button--hide');
          callLink.href = `tel:${phone}`;

          const refreshLink = setInterval(() => {
            signInApi(phone, refreshNumber);
          }, 240000);
          function regSuccess(infoSuccess) {
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

                function sendData(setName, value) {
                  const request = {
                    method: 'set-client',
                    set: setName,
                    name: inputAreaName.value,
                    outputFormat: 'json',
                  };
                  request[setName] = value;
                  setClientApi(request);
                }

                validation();
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
          callLink.addEventListener('click', () => {
            const timerRegSuccess = setInterval(() => {
              authorizeApi(regSuccess, code, phoneNumber, timerRegSuccess);
            }, 1000);
          });
        } else {
          textErrorPhone.innerHTML = info.errors[0];
          textErrorPhone.classList.remove('form__text--close', 'form__text--hide');
        }
      }
      signInApi(phoneNumber, regCall);
    }
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
        { type: 'click', callback: registration },
        { type: 'keydown', callback: registration },
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

    inputAreaPhone.addEventListener('keydown', (event) => {
      if (event.keyCode === 13) {
        registration();
      }
    });
    this.openPage();
  }
}
