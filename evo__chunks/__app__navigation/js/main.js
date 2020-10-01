class CreateNavigation extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement('nav');
    this.element.classList.add('navigation');
  }

  create() {
    this.template = `

        <div class="navigation-element">
            <svg version="1.1" id="Слой_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                 viewBox="0 0 207.59 186.67" style="enable-background:new 0 0 207.59 186.67;" xml:space="preserve" width="38" height="38">
                <style type="text/css">
                    .st0{fill-rule:evenodd;clip-rule:evenodd;fill:#FF6000;}
                </style>
                <path class="st0" d="M207.07,55c-6.01-46.17-35.79-56-66.11-54.63C110.64,1.74,87.15,22.5,56.83,61.29c0,0-0.68,0.96,0.27-3.96
                    c4.78-25.54,19.46-45.55,22.2-49.72c2.73-4.17,5.33-4.78,2.66-5.33C16.4-10.56,0.28,33.97,0.01,56.37s5.46,35.24,28.96,61.74
                    c23.49,26.5,74.3,68.57,74.3,68.57s34.69-28.68,62.28-55.18C193.14,104.99,210.9,82.32,207.07,55z M144.81,84.91
                    c-14.06,0-25.46-11.4-25.46-25.46c0-14.06,11.4-25.46,25.46-25.46c14.06,0,25.46,11.4,25.46,25.46
                    C170.28,73.51,158.88,84.91,144.81,84.91z"/>
                </svg>
        </div>
        <div class="navigation-element navigation-element--active">Главная</div>
        <div class="navigation-element">Магазины</div>
        <div class="navigation-element">История заказов</div>
        <div class="navigation-element">Избранное</div>
        <div class="navigation-element">Корзина</div>
        <div class="navigation-element">Баланс</div>
        <div class="navigation-element">Личный кабинет</div>
        <div class="navigation-element">Сообщения</div>
        <div class="navigation-element navigation-element--close">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle opacity="0.38" cx="24" cy="24" r="23.5" stroke="white"/>
                <path d="M31 18.41L29.59 17L24 22.59L18.41 17L17 18.41L22.59 24L17 29.59L18.41 31L24 25.41L29.59 31L31 29.59L25.41 24L31 18.41Z" fill="white"/>
            </svg>
        </div>

    `;

    this.element.insertAdjacentHTML('beforeend', this.template);

    return super.create(this.element);
  }

  toggle() {
    document.querySelector('.navigation').classList.toggle('navigation--opened');
  }
}

function initTopMenu() {
  const hamburgerAll = document.querySelectorAll('.header .header__menu');
  const header = document.querySelector('.header');
  document.body.style.paddingTop = `${header.clientHeight}px`;
  const headerNavigationClose = document.querySelector('.navigation-element--close');
  hamburgerAll.forEach((hamburger) => {
    hamburger.addEventListener('click', () => {
      const headerNavigation = document.querySelector('.navigation');
      headerNavigation.classList.toggle('navigation--opened');
      document.body.classList.toggle('overflow');
      // if (headerNavigation.style.transform == "translateY(-5%)") {
      //     headerNavigation.style.transform = "translateY(-100%)";
      //     document.body.style.overflow = "auto";
      // } else {
      //     headerNavigation.style.transform = "translateY(-5%)";
      //     document.body.style.overflow = "hidden";
      // }
    });
  });
  if (headerNavigationClose) {
    headerNavigationClose.addEventListener('click', () => {
      const headerNavigation = document.querySelector('.navigation');
      headerNavigation.classList.toggle('navigation--opened');
      document.body.classList.toggle('overflow');
      // if (headerNavigation.style.transform == "translateY(-5%)") {
      //     headerNavigation.style.transform = "translateY(-100%)";
      //     document.body.style.overflow = "auto";
      // } else {
      //     headerNavigation.style.transform = "translateY(-5%)";
      //     document.body.style.overflow = "hidden";
      // }
    });
  }



  const pages = document.querySelectorAll('.page');
  const baskets = document.querySelectorAll('.header .header__basket');
  baskets.forEach((basket) => {
    basket.addEventListener('click', (e) => {
      pages.forEach((page) => {
        page.classList.remove('page--show');
      });

      const page = document.querySelector(".page[data-page='basket']");
      if (page) page.classList.add('page--show');
    });
  });
}
