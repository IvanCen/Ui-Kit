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
    super.rendering('balance');
    api.getClientApi();
    this.mainPageContent.classList.add('main-page__content--size--small');
    const topBar = new CreateTopBarDefault({
      selector: ['div'],
      style: ['top-bar'],
      modifier: [
        `--size--medium${isIos ? '--ios' : ''}`,
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
      text: ['Ваш баланс'],
      heart: false,
      number() {
        if (!isEmptyObj(userInfoObj)) {
          return userInfoObj.successData.balance;
        }
        return '0';
      },
      eventButton: [
        {
          type: 'click',
          callback: () => {
            const option = {
              heart: false,
            };
            stopAction(() => {
              function renderScore() {
                togglePageBalanceHistoryScore.rendering(option);
                togglePageBalanceHistoryScore.openPage();
              }
              api.getClientBalanceLog(renderScore);
            });
          },
        },
      ],
    });
    const textAreaBonus = new CreateTextAreaBalance({
      selector: ['div'],
      style: ['text-area'],
      buttonText: ['История'],
      themeButton: ['--theme--tangerin-transparent'],
      identifier: ['score'],
      text: ['Ваши бонусы'],
      heart: true,
      number() {
        if (!isEmptyObj(userInfoObj)) {
          return userInfoObj.successData.bonus;
        }
        return '0';
      },
      eventButton: [
        {
          type: 'click',
          callback: () => {
            const option = {
              heart: true,
            };
            stopAction(() => {
              function renderBonus() {
                togglePageBalanceHistoryBonus.rendering(option);
                togglePageBalanceHistoryBonus.openPage();
              }
              api.getClientBonusLog(renderBonus);
            });
          },
        },
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
        '-route',
      ],
      text: ['Войти'],
      eventsOpen: [
        {
          type: 'click',
          callback: () => {
            stopAction(() => {
              returnPageObj.returnBalanceAfterSignIn = true;
              toggleModalPageSignIn.rendering();
            });
          },
        },
      ],
    });
    const buttonFill = new CreateButton({
      selector: ['button'],
      style: ['button'],
      modifier: [
        '--size--big',
        '--theme--tangerin',
        '--theme--shadow-big',
        '--type--fixed',
        '-route',
      ],
      text: ['Пополнить'],
      eventsOpen: [
        {
          type: 'click',
          callback: () => {
            stopAction(() => {
              togglePageBalanceFill.rendering();
            });
          },
        },
      ],
    });
    this.mainPageContent.append(createTopBarIos());
    this.mainPageContent.append(topBar.create());
    if (isEmptyObj(userInfoObj)) {
      this.mainPageContent.append(card.create());
      this.mainPageContent.append(buttonJoinOrange.create());
    } else {
      this.mainPageContent.append(textAreaScore.create());
      this.mainPageContent.append(textAreaBonus.create());
      this.mainPageContent.append(buttonFill.create());
    }
    const footerButtonBalance = document.querySelector('.footer__button--type--cards');
    activeFooter(footerButtonBalance);
  }
}
