class BalancePage {
  constructor(parameters) {
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
    this.body = document.querySelector('body');
    this.mainPage = document.querySelector('.main-page');
    this.mainPageContent = document.querySelector('.main-page__content');
  }

  closePage() {
    this.topBarTabs = document.querySelector('.header__top-tabs');
    this.mainPageContent.classList.remove('main-page__content--size--small');
    this.mainPageContent.classList.remove('main-page__content--opened-with-tabs');
    this.mainPageContent.classList.remove('main-page__content--opened');
    this.topBarTabs.classList.add('header__top-tabs--hide');
  }

  openPage() {
    this.mainPageContent = document.querySelector('.main-page__content-balance');
    this.topBarTabs = document.querySelector('.header__top-tabs');
    this.headerTitle = document.querySelector('.header__status');
    this.topBarTabs.classList.remove('header__top-tabs--hide');
    setTimeout(() => {
      if (this.mainPageContent) {
        this.mainPageContent.classList.add('main-page__content--opened-with-tabs');
        this.mainPageContent.classList.add('main-page__content--opened');
        this.headerTitle.textContent = 'Баланс';
      }
    }, 100);
    history.pushState({ state: '#' }, null, '#');
  }

  rendering() {
    this.mainPageContent = document.createElement('div');
    this.mainPageContent.classList.add('main-page__content', 'main-page__content--size--small', 'main-page__content-balance');
    this.mainPage.prepend(this.mainPageContent);
    api.getClientApi();
    this.mainPageContent.classList.add('main-page__content--size--small');

    const card = new CreateTextMainCard({
      selector: ['div'],
      style: ['main-card'],
      modifier: ['--indentation--top'],
      text: ['Войдите, что бы увидеть свой баланс'],
    });
    const content = new CreateTextAreaBalanceTabs({
      selector: ['div'],
      style: ['tab-content'],
    });
    const tobBarTabs = new CreateTopBarTabsBalance({
      selector: ['div'],
      style: ['header__top-tabs'],
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

    this.topBar = document.querySelector('.header');
    this.topBar.append(tobBarTabs.create());

    this.mainPageContent.append(buttonJoinOrange.create());
    this.mainPageContent.append(content.create());
    this.mainPageContent.append(buttonFill.create());

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

    const tabs = document.querySelectorAll('.header__top-tabs-element');
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
