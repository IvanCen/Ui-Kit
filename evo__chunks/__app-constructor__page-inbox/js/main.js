class InboxPage {
  constructor(parameters) {
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
    this.closePage = this.closePage.bind(this);
    this.openPage = this.openPage.bind(this);
    this.body = document.querySelector('body');
    this.mainPage = document.querySelector('.main-page');
    this.mainPageContent = document.querySelector('.main-page__content');
  }

  closePage() {
    this.mainPageContent.classList.remove('main-page__content--size--small');
    this.mainPageContent.classList.remove('main-page__content--opened');
  }

  openPage() {
    this.mainPageContent = document.querySelector('.main-page__content-inbox');
    this.headerTitle = document.querySelector('.header__status');
    setTimeout(() => {
      if (this.mainPageContent) {
        this.mainPageContent.classList.add('main-page__content--opened');
        this.headerTitle.textContent = 'Сообщения';
      }
    }, 100);
    history.pushState({ state: '#' }, null, '#');
  }

  rendering() {
    this.mainPageContent = document.createElement('div');
    this.mainPageContent.classList.add('main-page__content', 'main-page__content--size--small', 'main-page__content-inbox');
    this.mainPage.append(this.mainPageContent);

    const inboxTopBar = new CreateTopBarInbox({
      selector: ['div'],
      style: ['top-bar'],
      modifier: [`${isIos ? '--indentation--top' : ''}`],
      eventBack: [
        { type: 'click', callback: this.closePage },
        { type: 'click', callback: this.deletePage },
        {
          type: 'click',
          callback: () => {
            const dotMessage = document.querySelector('.top-bar__icon-dot');
            userMessages.successData.messages.every((message) => {
              if (message.wasRead !== null) {
                dotMessage.classList.add('top-bar__icon-dot--hide');
                return false;
              }
              return true;
            });
          },
        },
      ],
      eventToggleMessages: [
        { type: 'click', callback: toggleInboxTabMessagesContent.clearPage },
        { type: 'click', callback: toggleInboxTabMessagesContent.rendering },
      ],
      eventToggleLastOffers: [
        { type: 'click', callback: toggleInboxTabLastOffersContent.clearPage },
        { type: 'click', callback: toggleInboxTabLastOffersContent.rendering },
      ],
    });


    this.mainPageContent.prepend(createTopBarIos());
    this.mainPageContent.prepend(inboxTopBar.create());

    function render() {
      toggleInboxTabMessagesContent.rendering();
    }
    api.getMessages(render);

    this.openPage();
    const topBarTabs = document.querySelectorAll('.top-bar__tab');
    switchActive(topBarTabs, 'top-bar__tab--active');
  }
}
