document.addEventListener('DOMContentLoaded', initTopMenu);

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
