class ToggleBalance extends ToggleMainPage {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
  }

  closePage() {
    super.closePage();
    this.mainPageContent.classList.remove('main-page__content--size--small');
  }

  rendering() {
    super.rendering();
    this.mainPageContent.classList.add('main-page__content--size--small');
    const topBar = new CreateTopBarDefault({
      selector: ['div'],
      style: ['top-bar'],
      modifier: [
        '--size--medium',
      ],
      textTitle: ['Баланс'],
    });
    const card = new CreateCardsBalanceMainCard({
      selector: ['div'],
      style: ['main-card'],
      modifier: ['--indentation--top'],
      text: ['Войдите, что бы увидеть свой баланс'],
    });
    const textAreaScore = new CreateTextAreaBalance({
      selector: ['div'],
      style: ['text-area'],
      buttonText: ['История'],
      themeButton: ['--theme--tangerin'],
      identifier: ['score'],
      text: ['Ваш счет'],
      number: ['0'],
      eventButton: [
        { type: 'click', callback: togglePageBalanceHistoryScore.rendering },
        { type: 'click', callback: togglePageBalanceHistoryScore.openPage },
      ],
    });
    const textAreaBonus = new CreateTextAreaBalance({
      selector: ['div'],
      style: ['text-area'],
      buttonText: ['История'],
      themeButton: ['--theme--tangerin-transparent'],
      identifier: ['score'],
      text: ['Ваши бонусы'],
      number: ['0'],
      eventButton: [
        { type: 'click', callback: togglePageBalanceHistoryBonus.rendering },
        { type: 'click', callback: togglePageBalanceHistoryBonus.openPage },
      ],
    });
    const buttonJoinOrange = new CreateButton({
      selector: ['button'],
      style: ['button'],
      modifier: [
        '--size--big',
        '--theme--tangerin',
        '--theme--shadow-big',
        '--type--fixed',
      ],
      text: ['Войти'],
      eventsOpen: [
        { type: 'click', callback: togglePageSignIn.rendering },
      ],
    });
    this.mainPageContent.append(topBar.create());
    if (localStorage.getItem('user-sign-in') === null) {
      this.mainPageContent.append(card.create());
      this.mainPageContent.append(buttonJoinOrange.create());
    } else {
      this.mainPageContent.append(textAreaScore.create());
      this.mainPageContent.append(textAreaBonus.create());
    }
  }
}
