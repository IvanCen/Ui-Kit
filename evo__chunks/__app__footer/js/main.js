
function switchActiveFooter() {
  const footerButton = document.querySelectorAll('.footer__button');
  [...footerButton].forEach((item) => {
    item.addEventListener('click', function () {
      [...footerButton].forEach((item) => {
        item.classList.remove('footer__button--active');
        item.firstElementChild.classList.remove('footer__icon--active');
      });
      this.classList.add('footer__button--active');
      this.firstElementChild.classList.add('footer__icon--active');
    });
  });
}

class CreateFooter extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
    this.template = `
      <button class="footer__button footer__button--active footer__button--type--main">
            <svg class="footer__icon footer__icon--active" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg">
              <path d="M16.38 1.84009C12.36 1.84009 9.29002 5.16009 8.56002 9.19009C8.54002 9.31009 8.38002 9.33009 8.33002 9.22009C7.95002 8.33009 7.74002 7.36009 7.74002 6.34009C7.74002 4.72009 8.27002 3.22009 9.16002 2.02009C8.67002 1.90009 8.15002 1.84009 7.62002 1.84009C3.91002 1.84009 0.900024 4.85009 0.900024 8.56009C0.900024 14.4801 12 22.1601 12 22.1601C12 22.1601 23.1 14.4801 23.1 8.56009C23.1 4.85009 20.09 1.84009 16.38 1.84009ZM16.38 11.1501C14.95 11.1501 13.79 9.99009 13.79 8.56009C13.79 7.13009 14.95 5.97009 16.38 5.97009C17.81 5.97009 18.97 7.13009 18.97 8.56009C18.97 9.99009 17.81 11.1501 16.38 11.1501Z"/>
            </svg>
        Main
        </button>
        <button class="footer__button footer__button--type--cards">
            <svg class="footer__icon" viewBox="0 0 26 24"  xmlns="http://www.w3.org/2000/svg">
              <path d="M26 8.46008V19.9801C26 20.7801 25.35 21.4201 24.56 21.4201H6.08C5.28 21.4201 4.64 20.7701 4.64 19.9801V18.4301H19.93C21.52 18.4301 22.82 17.1301 22.82 15.5401V7.02008H24.57C25.35 7.02008 26 7.66008 26 8.46008ZM21.37 15.4801V4.08008C21.37 3.25008 20.7 2.58008 19.87 2.58008H1.5C0.67 2.58008 0 3.25008 0 4.08008V15.4901C0 16.3201 0.67 16.9901 1.5 16.9901H19.87C20.69 16.9801 21.37 16.3101 21.37 15.4801Z"/>
            </svg>
        Cards
        </button>
        <button class="footer__button footer__button--type--order">
            <svg class="footer__icon" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg">
              <path d="M17.71 6.07004C17.35 3.24004 14.93 1.04004 12 1.04004C9.06997 1.04004 6.65997 3.24004 6.28997 6.06004H2.40997V22.47C2.40997 22.74 2.62997 22.95 2.88997 22.95H21.11C21.38 22.95 21.59 22.73 21.59 22.47V6.07004H17.71ZM12 2.29004C14.24 2.29004 16.08 3.93004 16.44 6.06004H7.55997C7.91997 3.93004 9.76997 2.29004 12 2.29004Z"/>
            </svg>
            <img src="[+chunkWebPath+]/img/icon-dot.svg" alt="" class="footer__icon-dot">
        Order
            </button>
            <button class="footer__button footer__button--type--gift">
            <svg class="footer__icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.28 12.8701H2.07001V22.5201C2.07001 22.7901 2.29001 23.0001 2.55001 23.0001H11.28V12.8701Z"/>
                <path d="M22.41 6.11006H17.82C18.4 5.73006 18.86 5.28006 19.09 4.73006C19.33 4.15006 19.43 3.21006 18.49 2.04006C17.71 1.06006 16.87 0.950064 16.31 1.03006C14.51 1.28006 12.89 3.87006 12 5.58006C11.11 3.87006 9.47999 1.28006 7.68999 1.03006C7.12999 0.950064 6.28999 1.07006 5.50999 2.04006C4.56999 3.20006 4.65999 4.14006 4.90999 4.73006C5.13999 5.28006 5.59999 5.73006 6.17999 6.11006H1.58999C1.31999 6.11006 1.10999 6.33006 1.10999 6.59006V10.9501C1.10999 11.2201 1.32999 11.4301 1.58999 11.4301H11.28V6.11006H12.72V11.4301H22.41C22.68 11.4301 22.89 11.2101 22.89 10.9501V6.59006C22.89 6.32006 22.68 6.11006 22.41 6.11006ZM10.8 6.11006H9.42999C7.86999 5.69006 6.39999 5.06006 6.05999 4.25006C5.99999 4.10006 5.80999 3.65006 6.47999 2.81006C6.85999 2.34006 7.15999 2.25006 7.38999 2.25006C7.42999 2.25006 7.47999 2.25006 7.50999 2.26006C8.59999 2.41006 9.93999 4.35006 10.86 6.11006H10.8ZM14.57 6.11006H13.2H13.13C14.05 4.35006 15.39 2.41006 16.48 2.26006C16.52 2.25006 16.56 2.25006 16.6 2.25006C16.82 2.25006 17.13 2.34006 17.51 2.81006C18.19 3.65006 18 4.10006 17.94 4.25006C17.6 5.06006 16.13 5.69006 14.57 6.11006Z"/>
                <path d="M12.72 23.0001H21.45C21.72 23.0001 21.93 22.7801 21.93 22.5201V12.8701H12.72V23.0001Z"/>
            </svg>
        Gift
        </button>
        <button class="footer__button footer__button--type--stores">
            <svg class="footer__icon" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg">
              <path d="M20.53 9.6301C20.53 16.4901 12 22.9001 12 22.9001C12 22.9001 3.46997 16.4901 3.46997 9.6301C3.46997 4.9201 7.28997 1.1001 12 1.1001C16.71 1.1001 20.53 4.9201 20.53 9.6301ZM12 5.8901C10.02 5.8901 8.40997 7.5001 8.40997 9.4801C8.40997 11.4601 10.02 13.0701 12 13.0701C13.98 13.0701 15.59 11.4601 15.59 9.4801C15.59 7.5001 13.98 5.8901 12 5.8901Z"/>
            </svg>
        Stores
        </button>`;
  }

  create() {
    this.element.insertAdjacentHTML('beforeend', this.template);

    this.buttonMain = this.element.querySelector('.footer__button--type--main');
    this.buttonCards = this.element.querySelector('.footer__button--type--cards');

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
    /* this.buttonCards = this.element.querySelector('.footer__button--type--cards');
    if (typeof this.parameters.eventOpenCardsPage === 'object') {
      for (const event of this.parameters.eventOpenCardsPage) {
        this.buttonCards.addEventListener(event.type, event.callback);
      }
    }
    this.buttonCards = this.element.querySelector('.footer__button--type--cards');
    if (typeof this.parameters.eventOpenCardsPage === 'object') {
      for (const event of this.parameters.eventOpenCardsPage) {
        this.buttonCards.addEventListener(event.type, event.callback);
      }
    }
    this.buttonCards = this.element.querySelector('.footer__button--type--cards');
    if (typeof this.parameters.eventOpenCardsPage === 'object') {
      for (const event of this.parameters.eventOpenCardsPage) {
        this.buttonCards.addEventListener(event.type, event.callback);
      }
    } */

    return super.create(this.element);
  }
}
