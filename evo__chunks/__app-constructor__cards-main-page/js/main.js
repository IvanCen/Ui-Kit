class ToggleCards extends ToggleMainPage {
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
    const cardsTopBar = new CreateTopBarDefault({
      selector: ['div'],
      style: ['top-bar'],
      modifier: ['--size--medium'],
      textTitle: ['Cards'],
    });
    const cardsCard = new CreateCardsCard({
      selector: ['div'],
      style: ['main-card'],
    });
    const cardsButtonSignInLight = new CreateButton(
      {
        selector: ['button'],
        style: ['button'],
        modifier: ['--size--medium',
          '--theme--light',
          '--theme--shadow-big',
          '--position--right',
          '--indentation--bottom',
          '--indentation--right',
        ],
        text: ['Sign in'],
        /* events: [
          { type: 'click', callback: this.closePage },
          { type: 'click', callback: this.deletePage },
        ], */
        eventsOpen: [
          { type: 'click', callback: togglePageSignIn.rendering }],
      },
    );

    const cardsButtonJoinOrange = new CreateButton({
      selector: ['button'],
      style: ['button'],
      modifier: [
        '--size--big',
        '--theme--tangerin',
        '--indentation--bottom',
        '--indentation--right',
        '--position--right',
        '--theme--shadow-big',
      ],
      text: ['Add item'],
    });
    this.mainPageContent.prepend(cardsButtonJoinOrange.create());
    this.mainPageContent.prepend(cardsButtonSignInLight.create());
    this.mainPageContent.prepend(cardsCard.create());
    this.mainPageContent.prepend(cardsTopBar.create());
  }
}
