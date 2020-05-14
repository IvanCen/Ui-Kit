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
      const phoneNumber = inputArea.value;

      function regCall(info) {
        if (info.success === true) {
          const { code, phone } = info.successData;
          textError.classList.add('form__text--hide');
          callContainer.classList.add('form__call-container--open');
          input.classList.add('form__input--close');
          accessButton.classList.add('form__button--hide');
          callLink.href = `tel:${phone}`;

          function refreshNumber(infoNumber) {
            callLink.href = `tel:${infoNumber.successData.phone}`;
          }
          const refreshLink = setInterval(() => {
            signInApi(phone, refreshNumber);
          }, 240000);
          function regSuccess(infoSuccess) {
            console.log(infoSuccess);
            if (infoSuccess.success === true) {
              function render(userInfo) {
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

                if (name === '') {
                  inputNameContainer.classList.remove('form__input-container--hide');
                }
                /*if (email === '') {
                  inputEmailContainer.classList.remove('form__input-container--hide');
                }
                if (birthday === '') {
                  if (inputAreaBirthday) {
                    inputAreaBirthday.focus();
                  }
                  inputBirthdayContainer.classList.remove('form__input-container--hide');
                }*/
                if (name !== '' && email !== '' && name !== '') {
                  setTimeout(() => {
                    togglePage.closePage();
                    togglePage.deletePage();
                    inputsContainer.classList.remove('form__inputs-container--hide');
                  }, 2500);
                }
                setTimeout(() => {
                  textSuccess.classList.add('form__text--close');
                  textError.classList.add('form__text--close');
                  inputsContainer.classList.remove('form__inputs-container--hide');
                  buttonAgree.addEventListener('click', () => {
                    [inputAreaName, inputAreaEmail, inputAreaBirthday].forEach((item) => {
                      if (item.value !== '') {
                        if (item === inputAreaName) {
                          const request = {
                            method: 'set-client',
                            set: 'name',
                            name: item.value,
                            outputFormat: 'json',
                          };
                          setClientApi(request);
                        }
                        if (item === inputAreaEmail) {
                          const request = {
                            method: 'set-client',
                            set: 'email',
                            email: item.value,
                            outputFormat: 'json',
                          };
                          setClientApi(request);
                          toggleModal.renderingEmail();
                          toggleModal.openPage();
                        }
                        if (item === inputAreaBirthday) {
                          const request = {
                            method: 'set-client',
                            set: 'birthday',
                            birthday: item.value,
                            outputFormat: 'json',
                          };
                          setClientApi(request);
                        }
                        textError.classList.add('form__text--hide', 'form__text--close');
                      }
                    });
                    if (inputAreaName.value === '' && inputAreaEmail.value === '' && inputAreaBirthday.value === '') {
                      textError.textContent = 'Вы ничего не ввели в поля';
                      textError.classList.remove('form__text--hide', 'form__text--close');
                    }
                    const modal = document.querySelector('modal');
                    /*if (!modal) {
                      inputsContainer.classList.add('form__inputs-container--hide');
                      textSuccess.textContent = `Добро пожаловать в Хлебник ${inputAreaName.value}!`;
                      textSuccess.classList.remove('form__text--close', 'form__text--hide');
                      textSuccess.classList.add('form__text--indentation');
                      setTimeout(() => {
                        togglePage.closePage();
                        togglePage.deletePage();
                        inputsContainer.classList.remove('form__inputs-container--hide');
                      }, 2500);
                    }*/
                  });
                }, 2000);
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
          textError.innerHTML = info.errors[0];
          textError.classList.remove('form__text--hide');
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
