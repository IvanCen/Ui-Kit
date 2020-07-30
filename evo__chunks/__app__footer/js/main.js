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
    this.template = `
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
        </button>`;
  }

  create() {
    this.element.insertAdjacentHTML('beforeend', this.template);

    this.buttonMain = this.element.querySelector('.footer__button--type--main');
    this.buttonCards = this.element.querySelector('.footer__button--type--cards');
    this.buttonOrder = this.element.querySelector('.footer__button--type--order');
    this.buttonGift = this.element.querySelector('.footer__button--type--gift');
    this.buttonStores = this.element.querySelector('.footer__button--type--stores');

    if (typeof this.parameters.eventOpenMainPage === 'object') {
      for (const event of this.parameters.eventOpenMainPage) {
        this.buttonMain.addEventListener(event.type, event.callback);
      }
    }
    if (typeof this.parameters.eventOpenCardsPage === 'object') {
      for (const event of this.parameters.eventOpenCardsPage) {
        this.buttonCards.addEventListener(event.type, event.callback);
      }
    }

    if (typeof this.parameters.eventOpenOrderPage === 'object') {
      for (const event of this.parameters.eventOpenOrderPage) {
        this.buttonOrder.addEventListener(event.type, event.callback);
      }
    }

    if (typeof this.parameters.eventOpenGiftPage === 'object') {
      for (const event of this.parameters.eventOpenGiftPage) {
        this.buttonGift.addEventListener(event.type, event.callback);
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
