document.addEventListener('DOMContentLoaded', onDOMContentLoaded);

function onDOMContentLoaded() {
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
}
