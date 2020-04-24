const topBarTabs = document.querySelectorAll('.top-bar__tab')

switchActive(topBarTabs, 'top-bar__tab--active');

function createTopBar(parameters) {
    if (typeof parameters !== 'object') {
        parameters = {};
    }
    const element = document.createElement('div');
    element.classList.add('top-bar');

    const template = `
      <h1 class="top-bar__title top-bar__title--type--single">${parameters['textTitle']}</h1>
      <div class="top-bar__nav-container">
        <div>
          <button class="top-bar__button top-bar__button--type--sign-in">
            <img src="[+chunkWebPath+]/img/icon-sign-in.svg" alt="Кнопка входа" class="top-bar__icon">
            <span class="top-bar__icon-text">Sign in</span>
          </button>
        </div>
        <div>
          <button class="top-bar__button">
            <img src="[+chunkWebPath+]/img/icon-inbox.svg" alt="Кнопка сообщений" class="top-bar__icon">
            <img src="[+chunkWebPath+]/img/icon-dot.svg" alt="Иконка непрочитанного сообщения" class="top-bar__icon-dot">
            <span class="top-bar__icon-text">Inbox</span>
          </button>
        </div>
        <div>
          <button class="top-bar__button">
            <img src="[+chunkWebPath+]/img/icon-history.svg" alt="Кнопка истории заказов" class="top-bar__icon">
            <span class="top-bar__icon-text">History</span>
          </button>
        </div>
        <div>
          <button class="top-bar__button top-bar__button--position--right">
          </button>
        </div>
        <div class="top-bar__button--position--right">
          <button class="top-bar__button">
            <img src="[+chunkWebPath+]/img/icon-accaunt.svg" alt="Кнопка входа в личный кабинет" class="top-bar__icon">
          </button>
        </div>
      </div>`
    element.insertAdjacentHTML('beforeend', template);

    const buttonSignIn = element.querySelector('.top-bar__button--type--sign-in');

    if (typeof parameters['events'] === 'object') {
        for (let event of parameters['events']) {
            buttonSignIn.addEventListener(event['type'], event['callback']);

        }
    }

    return element;
}

function createTopBarSignIn(parameters) {
    if (typeof parameters !== 'object') {
        parameters = {};
    }
    const element = document.createElement('div');

    if (typeof parameters['styles'] === 'object') {

        for (let style of parameters['styles']) {
            element.classList.add(style);
        }

    }

    const template = `
      <div class="top-bar__content-container">
        <div class="top-bar__header">
          <button class="top-bar__button">
            <img src="[+chunkWebPath+]/img/icon-close-white.svg" alt="Кнопка закрытия" class="top-bar__icon top-bar__icon--type--close">
          </button>
        </div>
        <h1 class="top-bar__title">${parameters['textTitle']}</h1>
      </div>`

    element.insertAdjacentHTML('beforeend', template);

    const iconClose = element.querySelector('.top-bar__icon--type--close');

    if (typeof parameters['events'] === 'object') {
        for (let event of parameters['events']) {
            iconClose.addEventListener(event['type'], event['callback']);

        }
    }
    return element;
}

