class TogglePageSignIn extends TogglePage {
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
    this.phoneNumber = this.inputArea.value;
    this.parameters.api.signInApi(this.phoneNumber, this.regCall);
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
    function refreshNumber(infoNumber) {
      callLink.href = `tel:${infoNumber.successData.phone}`;
    }
    if (info.success === true) {
      const { code, phone } = info.successData;

      textErrorPhone.classList.add('form__text--close', 'form__text--hide');
      textError.classList.add('form__text--hide');
      callContainer.classList.add('form__call-container--open');
      input.classList.add('form__input--close');
      accessButton.classList.add('form__button--hide');
      callLink.href = `tel:${phone}`;

      const refreshLink = setInterval(() => {
        this.parameters.api.signInApi(phone, refreshNumber);
      }, 240000);

      callLink.addEventListener('click', () => {
        const timerRegSuccess = setInterval(() => {
          this.parameters.api.authorizeApi(this.regSuccess, code, phoneNumber, timerRegSuccess, refreshLink);
        }, 1000);
      });
    } else {
      textErrorPhone.innerHTML = info.errors[0];
      textErrorPhone.classList.remove('form__text--close', 'form__text--hide');
    }
  }

  regSuccess(infoSuccess) {
    if (infoSuccess.success === true) {
      const callContainer = document.querySelector('.form__call-container');

      callContainer.remove();

      this.parameters.api.getClientApi(this.askUserInfo);
    }
  }

  askUserInfo(userInfo) {
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
        setTimeout(() => {
          buttonAgree.classList.add('form__button--hide');
          textSuccess.textContent = 'Добро пожаловать в Хлебник!';
          textSuccess.classList.remove('form__text--close', 'form__text--hide');
          textSuccess.classList.add('form__text--indentation');
          togglePage.closePage();
          togglePage.deletePage();
          inputsContainer.classList.remove('form__inputs-container--hide');
        }, 2500);
      }
    } else {
      this.showError(userInfo);
    }
  }

  showError(info) {
    const textError = document.querySelector('.form__text--error');
    textError.classList.remove('form__text--close', 'form__text--hide');
    if (info.errors[0] !== undefined) {
      textError.innerHTML = info.errors[0];
    }
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
        textError.classList.add('form__text--close', 'form__text--hide');
        this.sendData('name', inputAreaName.value);
        inputAreaName.value = '';
        inputNameContainer.classList.add('form__input-container--hide');
        this.parameters.api.getClientApi(this.askUserInfo);
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
      }
      if (inputAreaBirthday.value !== '') {
        textError.classList.add('form__text--close', 'form__text--hide');
        this.sendData('birthday', inputAreaBirthday.value);
        inputAreaBirthday.value = '';
        inputBirthdayContainer.classList.add('form__input-container--hide');
        this.parameters.api.getClientApi(this.askUserInfo);
      }
    });
  }

  askUserEmail() {
    const buttonAgree = document.querySelector('.form__button--type--agree');
    const textError = document.querySelector('.form__text--error');
    const inputEmailContainer = document.querySelector('.form__input-container--email');
    const inputAreaEmail = document.querySelector('.form__input-area--type--email');
    const modal = document.querySelector('.modal');

    inputEmailContainer.classList.remove('form__input-container--hide');
    validation();

    buttonAgree.addEventListener('click', () => {
      if (inputAreaEmail.value === '') {
        textError.classList.remove('form__text--close', 'form__text--hide');
        textError.textContent = 'Укажите email';
      }
      if (inputAreaEmail.value !== '') {
        this.sendData('email', inputAreaEmail.value);
        inputAreaEmail.value = '';
        inputEmailContainer.classList.add('form__input-container--hide');
        textError.textContent = ' ';
        textError.classList.add('form__text--close', 'form__text--hide');
        toggleModal.renderingEmail();
        toggleModal.openPage();
      }
      if (!modal) {
        this.parameters.api.getClientApi(this.askUserInfo);
      }
    });
  }

  rendering() {
    super.rendering();

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
        { type: 'click', callback: () => { this.registrationNumber(this); } },
        { type: 'keydown', callback: () => { this.registrationNumber(this); } },
      ],
      eventSkip: [
        { type: 'click', callback: this.closePage },
        { type: 'click', callback: this.deletePage },
        { type: 'click', callback: renderMainPage.clearPage },
        { type: 'click', callback: renderMainPage.rendering },
        { type: 'click', callback: renderMainPage.openPage },
      ],
    });

    this.page.append(signInTopBar.create());
    this.page.append(formInputSignIn.create());
    inputFlyLabel();
    activeButton();
    this.openPage();
  }
}
