class ToggleThirdPageEditUser extends ToggleThirdPage {
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
                toggleThirdPage.closePage();
                toggleThirdPage.deletePage();
              }, 2000);

              toggleThirdPage.closePage();
              toggleThirdPage.deletePage();
            }
          } else {
            setTimeout(() => {
              if (textArea) {
                textArea.textContent = userInfoObj.successData[setName];
              }
              toggleThirdPage.closePage();
              toggleThirdPage.deletePage();
            }, 2000);
          }
        }
      }
    }
    const request = {
      method: 'set-client',
      set: setName,
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
      modifier: [`${isIos ? '--size--small--ios' : '--size--small'}`, '--theme--light'],
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
        '--indentation',
      ],
      identifier: parameters.identifier,
      inputLabelName: parameters.inputLabel,
      inputType: parameters.inputType,
    });
    const buttonEdit = new CreateButton({
      selector: ['button'],
      style: ['button'],
      modifier: [
        '--size--big',
        '--theme--tangerin',
        '--type--fixed-with-bottom-bar',
        '--theme--shadow-big',
        '--type--edit-user',
      ],
      text: ['Изменить'],
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

    this.thirdPage.append(createTopBarIos());
    this.thirdPage.append(topBar.create());
    this.thirdPage.append(formInput.create(parameters.text));
    this.thirdPage.append(buttonEdit.create());

    this.buttonAgree = this.thirdPage.querySelector('.button--type--edit-user');
    this.buttonAgree.classList.add('form__button');

    if (parameters.inputType !== 'date') {
      validation();
      inputFlyLabel();
    }

    this.openPage();
  }
}
