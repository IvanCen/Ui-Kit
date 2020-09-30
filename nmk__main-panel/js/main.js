document.addEventListener('DOMContentLoaded', initMainPanel);

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

      const title = document.querySelector('.header__status');
      if (pageTitle && title) title.innerText = pageTitle;
      const page = document.querySelector(`.page[data-page='${pageId}']`);
      if (page) {
        page.classList.add('page--show');
        const header = page.querySelector('.header');
        if (header) {
          document.body.style.paddingTop = `${header.clientHeight}px`;
        } else document.body.style.paddingTop = '0px';
      }
    });
  });
}
