class ToggleSubPageEditUser extends ToggleSubPage {
  constructor(parameters) {
    super(parameters);
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
    this.closePage = this.closePage.bind(this);
    this.deletePage = this.deletePage.bind(this);
  }

  sendData(setName, value) {
    function showError(info) {
      const textError = document.querySelector('.form__text--error');
      if (textError) {
        textError.classList.remove('form__text--close', 'form__text--hide');
        if (info.errors[0] !== undefined) {
          textError.textContent = info.errors[0];
        } else {
          api.getClientApi();
          const textSuccess = document.querySelector('.form__text--success');
          const textArea = document.querySelector(`.text-area__title--type--${setName}`);
          textSuccess.textContent = 'Данные изменены';
          textSuccess.classList.remove('form__text--close', 'form__text--hide');
          textSuccess.classList.add('form__text--indentation');

          if (setName === 'email') {
            toggleModal.renderingEmail();
            toggleModal.openPage();
            const modal = document.querySelector('.modal');
            if (!modal) {
              api.getClientApi();
              setTimeout(() => {
                if (textArea) {
                  textArea.textContent = userInfoObj.successData[setName];
                }
                toggleSubPage.closePage();
                toggleSubPage.deletePage();
              }, 2000);

              toggleSubPage.closePage();
              toggleSubPage.deletePage();
            }
          } else {
            setTimeout(() => {
              if (textArea) {
                textArea.textContent = userInfoObj.successData[setName];
              }
              toggleSubPage.closePage();
              toggleSubPage.deletePage();
            }, 2000);
          }
        }
      }
    }
    const request = {
      method: 'set-client',
      set: setName,
      phone: authorizationPhone,
      code: authorizationCode,
      outputFormat: 'json',
    };
    request[setName] = value;
    api.setClientApi(request, showError);
  }


  rendering(parameters) {
    super.rendering();

    const topBar = new CreateTopBarWithBackButton({
      selector: ['div'],
      style: ['top-bar'],
      modifier: [`${isIos ? '--size--small--ios' : '--size--small'}`, '--theme--dark'],
      textTitle: parameters.titleTopBar,
      eventBack: [
        { type: 'click', callback: this.closePage },
        { type: 'click', callback: this.deletePage },
      ],
    });
    const formInput = new CreateFormInput({
      selector: ['div'],
      style: ['form'],
      modifier: [
        '--indentation--sign-in',
        '__edit-user',
      ],
      identifier: parameters.identifier,
      inputLabelName: parameters.inputLabel,
      inputType: parameters.inputType,
    });
    const buttonEdit = new CreateButton({
      selector: ['button'],
      style: ['button'],
      modifier: [
        '--theme--tangerin',
        '--size--large',
        '--type--edit-user',
      ],
      text: ['Сохранить'],
      events: [
        {
          type: 'click',
          callback: () => {
            const inputArea = document.querySelector(`.form__input-area--type--${parameters.identifier}`);

            if (inputArea.value !== '') {
              this.sendData(parameters.identifier, inputArea.value);
            }
          },
        },
      ],
    });

    this.subPage.append(topBar.create());
    this.subPage.append(formInput.create(parameters.text));
    this.formEl = this.subPage.querySelector('.form');
    this.formEl.append(buttonEdit.create());

    this.buttonAgree = this.subPage.querySelector('.button--type--edit-user');
    this.buttonAgree.classList.add('form__button');

    if (parameters.inputType !== 'date') {
      validation();
      inputFlyLabel();
    } else {
      this.inputDate = document.querySelector('.form__input-area--type--birthday');
      this.inputDate.addEventListener('click', () => {
        emitter.emit('inputdate', this.inputDate);
      });
    }

    this.openPage();
  }
}
