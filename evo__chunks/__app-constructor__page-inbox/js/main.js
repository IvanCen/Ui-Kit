class InboxPage {
  constructor(parameters) {
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
    this.closePage = this.closePage.bind(this);
    this.openPage = this.openPage.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this.checkMessages = this.checkMessages.bind(this);
    this.body = document.querySelector('body');
    this.mainPage = document.querySelector('.main-page');
    this.mainPageContent = document.querySelector('.main-page__content');
  }

  checkMessages() {
    const dotMessage = document.querySelector('.main-panel__button--type--messages');
    if (dotMessage && !isEmptyObj(userMessages)) {
      userMessages.successData.messages.every((message) => {
        if (message.wasRead !== null) {
          dotMessage.classList.remove('main-panel__button--notification');
          return false;
        }
        return true;
      });
    }
  }

  closePage() {
    this.topBarTabs = document.querySelector('.header__top-tabs-inbox');
    this.mainPageContent.classList.remove('main-page__content--size--small');
    this.mainPageContent.classList.remove('main-page__content--opened-with-tabs');
    this.mainPageContent.classList.remove('main-page__content--opened');
    this.topBarTabs.classList.add('header__top-tabs--hide');
    this.checkMessages();
  }

  refreshData() {
    this.topBarTabs = document.querySelectorAll('.main-page__tab-content-inbox');
    this.topBarTabs.forEach((item) => {
      item.remove();
    });
    function render() {
      toggleInboxTabMessagesContent.rendering(1, true);
      toggleInboxTabLastOffersContent.rendering(2);
    }
    api.getMessages(render);
    this.checkMessages();
  }

  openPage() {
    this.mainPageContent = document.querySelector('.main-page__content-inbox');
    this.topBarTabs = document.querySelector('.header__top-tabs-inbox');
    this.headerTitle = document.querySelector('.header__status');
    this.textAreaContainerSignIn = this.mainPageContent.querySelector('.text-area-container--type--sign-in');

    if (isEmptyObj(userInfoObj)) {
      this.textAreaContainerSignIn.classList.remove('text-area-container--hide');
    } else {
      this.textAreaContainerSignIn.classList.add('text-area-container--hide');
    }

    setTimeout(() => {
      if (this.mainPageContent) {
        this.mainPageContent.classList.add('main-page__content--opened-with-tabs');
        this.mainPageContent.classList.add('main-page__content--opened');
        this.headerTitle.textContent = 'Сообщения';
        this.topBarTabs.classList.remove('header__top-tabs--hide');
      }
    }, 100);
    history.pushState({ state: '#' }, null, '#');
  }

  rendering() {
    this.mainPageContent = document.createElement('div');
    this.mainPageContent.classList.add('main-page__content', 'main-page__content--size--small', 'main-page__content-inbox');
    this.mainPage.append(this.mainPageContent);

    const tobBarTabs = new CreateTopBarTabsInbox({
      selector: ['div'],
      style: ['header__top-tabs'],
      modifier: ['-inbox'],
    });

    const content = new CreateTextAreaBalanceTabs({
      selector: ['div'],
      style: ['tab-content'],
    });
    const inboxTopBar = new CreateTopBarInbox({
      selector: ['div'],
      style: ['top-bar'],
      modifier: [`${isIos ? '--indentation--top' : ''}`],
      eventBack: [
        { type: 'click', callback: this.closePage },
        {
          type: 'click',
          callback: () => {
            const dotMessage = document.querySelector('.top-bar__icon-dot');
            userMessages.successData.messages.every((message) => {
              if (message.wasRead !== null) {
                dotMessage.classList.add('top-bar__icon-dot--hide');
                return false; й;
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
    const textAreaNoSignIn = new CreateTextAreaNoSignIn({
      selector: ['div'],
      style: ['text-area-container'],
      modifier: [
        '--hide',
        '--type--sign-in',
        '--indentation--big',
      ],
      eventsButton: [
        {
          type: 'click',
          callback: () => {
            this.closePage();
            toggleModalPageSignIn.rendering();
          },
        },
      ],
    });

    this.mainPageContent.append(createTopBarIos());
    this.topBar = document.querySelector('.header--main');
    this.topBar.append(tobBarTabs.create());

    this.mainPageContent.append(textAreaNoSignIn.create());

    // this.mainPageContent.append(content.create());
    function render() {
      toggleInboxTabMessagesContent.rendering(1, true);
      toggleInboxTabLastOffersContent.rendering(2);
    }
    api.getMessages(render);
    this.checkMessages();
    this.onDOMContentLoaded();
  }

  onDOMContentLoaded() {
    const tabs = document.querySelectorAll('.header__top-tabs-inbox .header__top-tabs-element');

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        tabs.forEach((tab) => {
          tab.classList.remove('header__top-tabs-element--active');
        });
        tab.classList.add('header__top-tabs-element--active');
        const id = tab.getAttribute('data-id');
        const containers = document.querySelectorAll('.main-page__tab-content-inbox');
        containers.forEach((el) => {
          el.classList.remove('main-page__tab-content--open');
        });
        const container = document.querySelector(`.main-page__tab-content-inbox[data-id='${id}']`);
        if (container) container.classList.add('main-page__tab-content--open');
      });
    });

    const elements = document.querySelectorAll('.messages__element');
    elements.forEach((element) => {
      element.addEventListener('click', () => {
        const detail = document.querySelector('.messages__detail');
        const container = document.querySelector('.messages__detail-container');
        container.style.height = `calc(100vh - ${document.querySelector('.messages__detail .header').clientHeight}px)`;
        console.log(document.querySelector('.messages__detail .header').clientHeight);
        if (detail) detail.classList.add('messages__detail--opened');
        const backBtn = document.querySelector('.messages__detail .header__back');
        backBtn.addEventListener('click', () => {
          const detail = document.querySelector('.messages__detail');
          if (detail) detail.classList.remove('messages__detail--opened');
        }, { once: true });
      });
    });
  }
}
