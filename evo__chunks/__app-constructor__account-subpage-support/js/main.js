class ToggleSubPageSupport extends ToggleSubPage {
  constructor(parameters) {
    super(parameters);
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
  }

  showModal(info) {
    if (info.success) {
      toggleModal.rendering({ subject: 'Ваше сообщение принято', text: 'Служба поддержки свяжется с Вами после рассмотрения заявки.' });
      toggleSubPageSupport.closePage();
      toggleSubPageSupport.deletePage();
    } else {
      toggleModal.rendering({ subject: 'Ошибка', text: info.errors[0] });
    }
  }

  rendering() {
    super.rendering();
    const topBar = new CreateTopBarWithBackButton({
      selector: ['div'],
      style: ['top-bar'],
      modifier: [
        `--size--medium${isIos ? '--ios' : ''}`,
        `--fixed${isIos ? '--ios-small' : ''}`,
        '--indentation--bottom',
        '--theme--dark'],
      textTitle: ['Поддержка'],
      eventBack: [
        { type: 'click', callback: this.closePage },
        { type: 'click', callback: this.deletePage },
      ],
    });
    const formInput = new CreateFormInputSupport({
      selector: ['div'],
      style: ['form'],
    });
    const buttonSend = new CreateButton({
      selector: ['button'],
      style: ['button'],
      modifier: [
        '--theme--tangerin',
        '--size--large',
      ],
      text: ['Отправить'],
      events: [
        {
          type: 'click',
          callback: () => {
            const inputAreaSubject = document.querySelector('.form__input-area--type--subject');
            const inputAreaMessage = document.querySelector('.form__input-area--type--message');
            const subject = inputAreaSubject.value;
            const message = inputAreaMessage.value;
            api.sendMessageToSupport({ subject, message }, this.showModal);
          },
        },
      ],
    });

    this.subPageContent = this.subPage.querySelector('.subpage__content');
    this.subPageContent.classList.add('subpage__content--indentation');

    this.subPage.prepend(createTopBarIos());
    this.subPage.prepend(topBar.create());
    this.subPageContent.append(formInput.create());
    this.subPageContent.append(buttonSend.create());

    inputFlyLabel();

    this.openPage();
  }
}
