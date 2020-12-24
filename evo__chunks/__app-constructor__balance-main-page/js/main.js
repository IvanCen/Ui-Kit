class BalancePage {
  constructor(parameters) {
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
    this.render = this.render.bind(this);
    this.initBalance = this.initBalance.bind(this);
    this.closePage = this.closePage.bind(this);
    this.openPage = this.openPage.bind(this);
    this.body = document.querySelector('body');
    this.mainPage = document.querySelector('.main-page');
    this.mainPageContent = document.querySelector('.main-page__content');
  }

  closePage() {
    this.topBarTabs = document.querySelector('.header__top-tabs-balance');
    this.mainPageContent.classList.remove('main-page__content--size--small');
    this.mainPageContent.classList.remove('main-page__content--opened-with-tabs');
    this.mainPageContent.classList.remove('main-page__content--opened');
    this.topBarTabs.classList.add('header__top-tabs--hide');
    this.buttonFill = document.querySelector('.button--type--fill');

    if (this.buttonFill) {
      this.buttonFill.classList.add('button--hide');
    }
  }

  openPage() {
      this.mainPageContent = document.querySelector('.main-page__content-balance');
      this.mainPageContentContainerBalance = document.querySelector('.main-page__content-container-balance');
      this.textAreaContainerSignIn = document.querySelector('.text-area-container--zone--balance');
      this.topBarTabs = document.querySelector('.header__top-tabs-balance');
      this.headerTitle = document.querySelector('.header__status');
      this.topBarTabs.classList.remove('header__top-tabs--hide');
      this.balance = document.querySelector('.balance__currency-balance');
      this.bonus = document.querySelector('.balance__currency-bonus');
      this.buttonFill = document.querySelector('.button--type--fill');

      if (this.buttonFill) {
        this.buttonFill.classList.remove('button--hide');
      }

      if (isEmptyObj(userInfoObj)) {
        if (this.mainPageContentContainerBalance) {
          this.mainPageContentContainerBalance.classList.add('main-page__content-container--hide');
        }
        this.textAreaContainerSignIn.classList.remove('text-area-container--hide');
      } else {
        if (this.balance && this.bonus && userInfoObj.successData.balance && userInfoObj.successData.bonus) {
          this.balance.textContent = `${userInfoObj.successData.balance} ₽`;
          this.bonus.textContent = `${userInfoObj.successData.bonus} ❤`;
        }
        this.mainPageContentContainerBalance.classList.remove('main-page__content-container--hide');
        this.textAreaContainerSignIn.classList.add('text-area-container--hide');
      }

      setTimeout(() => {
        if (this.mainPageContent) {
          this.mainPageContent.classList.add('main-page__content--opened-with-tabs', `${isIos ? 'main-page__content--opened-with-tabs--ios' : 'main-page__content--opened-with-tabs--not--ios'}`);
          this.mainPageContent.classList.add('main-page__content--opened');
          this.headerTitle.textContent = 'Баланс';
        }
      }, 100);
      history.pushState({ state: '#' }, null, '#');
  }

  rendering() {
      this.mainPageContent = document.createElement('div');
      this.mainPageContent.classList.add('main-page__content', 'main-page__content--size--small', 'main-page__content-balance', `${isIos ? 'main-page__content--ios' : 'main-page__content--no-ios'}`);
      this.mainPage.prepend(this.mainPageContent);
      this.mainPageContent.classList.add('main-page__content--size--small');

      const tobBarTabs = new CreateTopBarTabsBalance({
        selector: ['div'],
        style: ['header__top-tabs'],
        modifier: ['-balance'],
      });

      const textAreaNoSignIn = new TextAreaNoSignIn({
        selector: ['div'],
        style: ['text-area-container'],
        modifier: [
          '--hide',
          '--type--sign-in',
          '--indentation--big',
          '--zone--balance',
        ],
        eventsButton: [
          {
            type: 'click',
            callback: () => {
              toggleModalPageSignIn.rendering();
            },
          },
        ],
      });


      this.topBar = document.querySelector('.header--main');
      this.topBar.append(tobBarTabs.create());
      this.mainPageContent.append(textAreaNoSignIn.create());

      Promise.all([
        api.getClientBonusLog(),
        api.getClientBalanceLog(),
      ])
        .then(this.render);
  }

  render() {
      this.mainPageContentContainer = document.createElement('div');
      this.mainPageContentContainer.classList.add('main-page__content-container', 'main-page__content-container-balance');

      const content = new CreateTextAreaBalanceTabs({
        selector: ['div'],
        style: ['tab-content'],
      });

      const buttonFill = new CreateButton({
        selector: ['button'],
        style: ['button'],
        modifier: [
          '--size--big',
          '--theme--tangerin',
          '--theme--shadow-big',
          '--type--fixed',
          '--type--fill',
          '--hide',
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

      this.mainPageContentContainer.append(content.create());
      this.mainPageContentContainer.append(buttonFill.create());
      this.mainPageContent.append(this.mainPageContentContainer);
      this.initBalance();
  }


  initBalance() {
    const sectionGroupTriggers = document.querySelectorAll('.balance__history-section-group');
    sectionGroupTriggers.forEach((trigger) => {
      trigger.addEventListener('click', (e) => {
        const container = trigger.parentElement.querySelector('.balance__history-section-list');
        trigger.parentElement.classList.toggle('balance__history-section--opened');
        if (container.style.maxHeight) {
          container.style.maxHeight = null;
        } else {
          container.style.maxHeight = `${container.scrollHeight}px`;
        }
      });
    });

    const tabs = document.querySelectorAll('.header__top-tabs-balance .header__top-tabs-element');
    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        tabs.forEach((tab) => {
          tab.classList.remove('header__top-tabs-element--active');
        });
        tab.classList.add('header__top-tabs-element--active');
        const id = tab.getAttribute('data-id');
        const containers = document.querySelectorAll('.balance__container');
        containers.forEach((el) => {
          el.classList.remove('balance__container--show');
        });
        const container = document.querySelector(`.balance__container[data-id='${id}']`);
        if (container) container.classList.add('balance__container--show');
      });
    });

    const sums = document.querySelectorAll('.form__sums label');
    sums.forEach((sum) => {
      sum.addEventListener('click', () => {
        const btnSpan = sum.closest('.form').querySelector('.button span');
        btnSpan.textContent = `(${document.querySelector(`input[id='${sum.getAttribute('for')}']`).value})`;
      });
    });
  }
}
