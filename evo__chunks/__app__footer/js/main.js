function switchActiveFooter() {
  const footerButton = document.querySelectorAll('.footer__button');
  [...footerButton].forEach((item) => {
    item.addEventListener('click', function () {
      if (!this.classList.contains('footer__button--type--stores')) {
        [...footerButton].forEach((itemEl) => {
          itemEl.classList.remove('footer__button--active');
          itemEl.firstElementChild.classList.remove('footer__icon--active');
        });
        this.classList.add('footer__button--active');
        this.firstElementChild.classList.add('footer__icon--active');
      }
    });
  });
}

function initMainPanel() {
  const pages = document.querySelectorAll('.page');
  const btns = document.querySelectorAll('.main-panel .main-panel__button');
  btns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      btns.forEach((btn) => {
        btn.classList.remove('main-panel__button--active');
      });
      btn.classList.add('main-panel__button--active');

      const pageId = btn.getAttribute('data-page');
      const pageTitle = btn.getAttribute('data-page-title');

      pages.forEach((page) => {
        page.classList.remove('page--show');
      });

      const page = document.querySelector(`.page[data-page='${pageId}']`);
      if (page) {
        page.classList.add('page--show');
        const header = page.querySelector('.header');
        if (header) {
          document.body.style.paddingTop = `${header.clientHeight}px`;
        } else document.body.style.paddingTop = '0px';
      }
      window.swipArray.forEach((swip) => {
        swip.update();
      });
    });
  });
}

function activeFooter(activeEl) {
  const footerButton = document.querySelectorAll('.footer__button');
  [...footerButton].forEach((item) => {
    item.classList.remove('footer__button--active');
    item.firstElementChild.classList.remove('footer__icon--active');
  });
  activeEl.classList.add('footer__button--active');
  activeEl.firstElementChild.classList.add('footer__icon--active');
}

class CreateFooter extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
    /* this.template = `
      <button class="footer__button footer__button--active footer__button--type--main button-route">
            <svg class="footer__icon footer__icon--active footer__icon--type--main" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg">
              <path d="M16.38 1.84009C12.36 1.84009 9.29002 5.16009 8.56002 9.19009C8.54002 9.31009 8.38002 9.33009 8.33002 9.22009C7.95002 8.33009 7.74002 7.36009 7.74002 6.34009C7.74002 4.72009 8.27002 3.22009 9.16002 2.02009C8.67002 1.90009 8.15002 1.84009 7.62002 1.84009C3.91002 1.84009 0.900024 4.85009 0.900024 8.56009C0.900024 14.4801 12 22.1601 12 22.1601C12 22.1601 23.1 14.4801 23.1 8.56009C23.1 4.85009 20.09 1.84009 16.38 1.84009ZM16.38 11.1501C14.95 11.1501 13.79 9.99009 13.79 8.56009C13.79 7.13009 14.95 5.97009 16.38 5.97009C17.81 5.97009 18.97 7.13009 18.97 8.56009C18.97 9.99009 17.81 11.1501 16.38 11.1501Z"/>
            </svg>
        Главная
        </button>
        <button class="footer__button footer__button--type--cards button-route">
          <svg class="footer__icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 24" style="enable-background:new 0 0 32 24;" xml:space="preserve">
            <style type="text/css">
            \t.st0{fill:#FEFEFE;}
            \t.st1{fill:none;stroke:#272425;stroke-linejoin:round;stroke-miterlimit:10;}
            \t
            \t\t.st2{fill-rule:evenodd;clip-rule:evenodd;fill:none;stroke:#272425;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}
            \t.st3{fill:#272425;}
            \t.st4{fill:#989898;}
            \t.st5{fill:#E45E2F;}
            \t.st6{fill:#E35E31;}
            \t.st7{fill:none;stroke:#E25E32;stroke-width:1.3;stroke-miterlimit:10;}
            \t.st8{fill:#383838;}
            \t.st9{fill:#E25E32;}
            \t.st10{fill:#7A7A7A;}
            \t.st11{fill:#000100;}
            \t.st12{fill:#787878;}
            \t.st13{fill:#D32F31;}
            \t.st14{fill:#1E9553;}
            \t.st15{fill-rule:evenodd;clip-rule:evenodd;fill:#787878;}
            \t.st16{fill-rule:evenodd;clip-rule:evenodd;fill:#6B6B6B;}
            \t.st17{fill:#F3C322;}
            \t.st18{fill:#E3562F;}
            \t.st19{fill:#8F6849;}
            \t.st20{fill-rule:evenodd;clip-rule:evenodd;fill:#8F6849;}
            \t.st21{fill:#C3C3C2;}
            \t.st22{fill:none;stroke:#787878;}
            \t.st23{fill-rule:evenodd;clip-rule:evenodd;fill:#929292;}
            \t.st24{fill-rule:evenodd;clip-rule:evenodd;fill:#E3562F;}
            \t.st25{fill:#C89948;}
            </style>
            <g id="Слой_1">
            \t<path d="M31.56,12c0,6.39-5.18,11.56-11.56,11.56c-0.55,0-1.09-0.05-1.62-0.13c4.01-2.24,6.73-6.53,6.73-11.44
            \t\tc0-4.91-2.72-9.19-6.73-11.44c0.53-0.07,1.07-0.13,1.62-0.13C26.38,0.44,31.56,5.61,31.56,12z M12.96,7.19h-1.97v4.87h1.97
            \t\tc0.86,0,1.52-0.22,1.98-0.66c0.43-0.42,0.65-1.02,0.65-1.78c0-0.76-0.22-1.35-0.65-1.77C14.49,7.41,13.83,7.19,12.96,7.19z
            \t\t M23.57,12c0,6.39-5.18,11.56-11.56,11.56S0.44,18.39,0.44,12S5.62,0.44,12,0.44S23.57,5.61,23.57,12z M17.18,9.61
            \t\tc0-1.1-0.35-2.01-1.04-2.71c-0.71-0.73-1.63-1.09-2.78-1.09H9.45v6.24H7.73v1.34h1.71v1.9H7.73v1.17h1.71v1.73h1.54v-1.73h3.56
            \t\tv-1.17h-3.56v-1.9h2.36c1.15,0,2.08-0.36,2.79-1.07C16.83,11.62,17.18,10.72,17.18,9.61z"/>
            </g>
            <g id="Слой_2">
            </g>
            <g id="Слой_3">
            </g>
          </svg>
        Баланс
        </button>
        <button class="footer__button footer__button--type--order button-route">
            <svg class="footer__icon" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg">
              <path d="M17.71 6.07004C17.35 3.24004 14.93 1.04004 12 1.04004C9.06997 1.04004 6.65997 3.24004 6.28997 6.06004H2.40997V22.47C2.40997 22.74 2.62997 22.95 2.88997 22.95H21.11C21.38 22.95 21.59 22.73 21.59 22.47V6.07004H17.71ZM12 2.29004C14.24 2.29004 16.08 3.93004 16.44 6.06004H7.55997C7.91997 3.93004 9.76997 2.29004 12 2.29004Z"/>
            </svg>
            <img src="data:image/svg+xml;base64,[[run-snippet? &snippetName='file-to-base64' &file=[+chunkWebPath+]/img/icon-dot.svg]]" alt="" class="footer__icon-dot">
        Каталог
            </button>
            <button class="footer__button footer__button--type--gift button-route">
              <svg class="footer__icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 26 24" style="enable-background:new 0 0 26 24;" xml:space="preserve">
                <style type="text/css">
                \t.st0{fill:#FEFEFE;}
                \t.st1{fill:none;stroke:#000000;stroke-linejoin:round;stroke-miterlimit:10;}
                \t
                \t\t.st2{fill-rule:evenodd;clip-rule:evenodd;fill:none;stroke:#000000;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}
                \t.st3{fill:#989898;}
                \t.st4{fill:#E45E2F;}
                \t.st5{fill:#E35E31;}
                \t.st6{fill:none;stroke:#E25E32;stroke-width:1.3;stroke-miterlimit:10;}
                \t.st7{fill:#383838;}
                \t.st8{fill:#E25E32;}
                \t.st9{fill:#7A7A7A;}
                \t.st10{fill:#000100;}
                \t.st11{fill:#787878;}
                \t.st12{fill:#D32F31;}
                \t.st13{fill:#1E9553;}
                \t.st14{fill-rule:evenodd;clip-rule:evenodd;fill:#787878;}
                \t.st15{fill-rule:evenodd;clip-rule:evenodd;fill:#6B6B6B;}
                \t.st16{fill:#F3C322;}
                \t.st17{fill:#E3562F;}
                \t.st18{fill:#8F6849;}
                \t.st19{fill-rule:evenodd;clip-rule:evenodd;fill:#8F6849;}
                \t.st20{fill:#C3C3C2;}
                \t.st21{fill:none;stroke:#787878;}
                \t.st22{fill-rule:evenodd;clip-rule:evenodd;fill:#929292;}
                \t.st23{fill-rule:evenodd;clip-rule:evenodd;fill:#E3562F;}
                \t.st24{fill:#C89948;}
                </style>
                <g id="Слой_1">
                \t<path d="M13.35,0.23l3.21,8.1l8.69,0.55c0.34,0.02,0.47,0.44,0.21,0.66l-6.71,5.56l2.16,8.44c0.08,0.33-0.27,0.59-0.56,0.41
                \t\tL13,19.28l-7.36,4.66C5.36,24.12,5,23.86,5.08,23.53l2.16-8.44L0.54,9.54C0.28,9.33,0.41,8.9,0.75,8.88l8.69-0.55l3.21-8.1
                \t\tC12.78-0.08,13.22-0.08,13.35,0.23z"/>
                </g>
                <g id="Слой_2">
                </g>
                <g id="Слой_3">
                </g>
            </svg>
        Достижения
        </button>
        <button class="footer__button footer__button--type--stores button-route">
          <svg class="footer__icon" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg">
            <path d="M20.53 9.6301C20.53 16.4901 12 22.9001 12 22.9001C12 22.9001 3.46997 16.4901 3.46997 9.6301C3.46997 4.9201 7.28997 1.1001 12 1.1001C16.71 1.1001 20.53 4.9201 20.53 9.6301ZM12 5.8901C10.02 5.8901 8.40997 7.5001 8.40997 9.4801C8.40997 11.4601 10.02 13.0701 12 13.0701C13.98 13.0701 15.59 11.4601 15.59 9.4801C15.59 7.5001 13.98 5.8901 12 5.8901Z"/>
          </svg>
        Магазины
        </button>`; */
    this.template = `
      <div class="main-panel">
        <button class="main-panel__button main-panel__button--type--main main-panel__button--active" data-page="main" data-page-title="Отличный день для кофе ☕">
            <svg version="1.1" id="Слой_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                         viewBox="0 0 207.59 186.67" style="enable-background:new 0 0 207.59 186.67;" xml:space="preserve" width="20" height="20">
            <style type="text/css">
                .st0{fill-rule:evenodd;clip-rule:evenodd;fill:#FF6000;}
            </style>
                        <path class="st0" d="M207.07,55c-6.01-46.17-35.79-56-66.11-54.63C110.64,1.74,87.15,22.5,56.83,61.29c0,0-0.68,0.96,0.27-3.96
                c4.78-25.54,19.46-45.55,22.2-49.72c2.73-4.17,5.33-4.78,2.66-5.33C16.4-10.56,0.28,33.97,0.01,56.37s5.46,35.24,28.96,61.74
                c23.49,26.5,74.3,68.57,74.3,68.57s34.69-28.68,62.28-55.18C193.14,104.99,210.9,82.32,207.07,55z M144.81,84.91
                c-14.06,0-25.46-11.4-25.46-25.46c0-14.06,11.4-25.46,25.46-25.46c14.06,0,25.46,11.4,25.46,25.46
                C170.28,73.51,158.88,84.91,144.81,84.91z"/>
            </svg>
            <span>Главная</span>
        </button>
        <button class="main-panel__button main-panel__button--type--stores" data-page="stores">
            <svg width="15" height="20" viewBox="0 0 16 20" fill="#FF6000" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 0C3.865 0 0.5 3.38833 0.5 7.55417C0.5 13.4733 7.295 19.585 7.58417 19.8417C7.70333 19.9475 7.85167 20 8 20C8.14833 20 8.29667 19.9475 8.41583 19.8425C8.705 19.585 15.5 13.4733 15.5 7.55417C15.5 3.38833 12.135 0 8 0ZM8 11.6667C5.7025 11.6667 3.83333 9.7975 3.83333 7.5C3.83333 5.2025 5.7025 3.33333 8 3.33333C10.2975 3.33333 12.1667 5.2025 12.1667 7.5C12.1667 9.7975 10.2975 11.6667 8 11.6667Z" fill="#FF6000"/>
            </svg>
            <span>Магазины</span>
        </button>
        <button class="main-panel__button main-panel__button--type--balance" data-page="balance">
            <svg width="15" height="20" viewBox="0 0 15 17" fill="#FF6000" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 17H5V14H11V12H5V10H9.5C12.257 10 14.5 7.757 14.5 5C14.5 2.243 12.257 0 9.5 0H4C3.447 0 3 0.448 3 1V8H0V10H3V12H0V14H3V17ZM5 2H9.5C11.154 2 12.5 3.346 12.5 5C12.5 6.654 11.154 8 9.5 8H5V2Z" fill="#FF6000"/>
            </svg>
            <span>Баланс</span>
        </button>
        <button class="main-panel__button main-panel__button--type--messages main-panel__button--notification" data-page="messages">
            <svg width="18" height="20" viewBox="0 0 18 18" fill="#FF6000" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.6 0H5.4C2.4219 0 0 2.4219 0 5.4V17.1C0 17.5977 0.4023 18 0.9 18H12.6C15.5781 18 18 15.5781 18 12.6V5.4C18 2.4219 15.5781 0 12.6 0ZM10.8 11.7H4.5V9.9H10.8V11.7ZM13.5 8.1H4.5V6.3H13.5V8.1Z" fill="#FF6000"/>
            </svg>
            <span>Сообщения</span>
        </button>
        <button class="main-panel__button main-panel__button--type--profile" data-page="profile" data-page-title="Профиль">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="#FF6000" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 0C4.579 0 0 4.579 0 10C0 15.421 4.579 20 10 20C15.421 20 20 15.421 20 10C20 4.579 15.421 0 10 0ZM10 5C11.727 5 13 6.272 13 8C13 9.728 11.727 11 10 11C8.274 11 7 9.728 7 8C7 6.272 8.274 5 10 5ZM4.894 14.772C5.791 13.452 7.287 12.572 9 12.572H11C12.714 12.572 14.209 13.452 15.106 14.772C13.828 16.14 12.015 17 10 17C7.985 17 6.172 16.14 4.894 14.772Z" fill="#FF6000"/>
            </svg>
            <span>Профиль</span>
        </button>
    </div>`;
  }

  create() {
    this.element.insertAdjacentHTML('beforeend', this.template);

    this.buttonMain = this.element.querySelector('.main-panel__button--type--main');
    this.buttonBalance = this.element.querySelector('.main-panel__button--type--balance');
    this.buttonMessages = this.element.querySelector('.main-panel__button--type--messages');
    this.buttonProfile = this.element.querySelector('.main-panel__button--type--profile');
    this.buttonStores = this.element.querySelector('.main-panel__button--type--stores');

    if (typeof this.parameters.eventOpenMainPage === 'object') {
      for (const event of this.parameters.eventOpenMainPage) {
        this.buttonMain.addEventListener(event.type, event.callback);
      }
    }
    if (typeof this.parameters.eventOpenBalancePage === 'object') {
      for (const event of this.parameters.eventOpenBalancePage) {
        this.buttonBalance.addEventListener(event.type, event.callback);
      }
    }

    if (typeof this.parameters.eventOpenMessagesPage === 'object') {
      for (const event of this.parameters.eventOpenMessagesPage) {
        this.buttonMessages.addEventListener(event.type, event.callback);
      }
    }

    if (typeof this.parameters.eventOpenProfilePage === 'object') {
      for (const event of this.parameters.eventOpenProfilePage) {
        this.buttonProfile.addEventListener(event.type, event.callback);
      }
    }

    if (typeof this.parameters.eventOpenStoresPage === 'object') {
      for (const event of this.parameters.eventOpenStoresPage) {
        this.buttonStores.addEventListener(event.type, event.callback);
      }
    }

    return super.create(this.element);
  }
}
