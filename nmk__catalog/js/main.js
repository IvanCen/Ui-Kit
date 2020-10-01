document.addEventListener('DOMContentLoaded', onDOMContentLoaded);

function onDOMContentLoaded(e) {
  initSliders();
  initCategories();
}

function initSliders() {
  const swiperShares = new Swiper('.shares .swiper-container', {
    slidesPerView: 'auto',
    spaceBetween: 8,
    autoHeight: true,
  });

  const texts = document.querySelectorAll('.shares__list-element-text');
  texts.forEach((text) => {
    if (text.textContent.length > 80) {
      const newString = `${text.textContent.substr(0, 80)}...`;
      text.textContent = newString;
    }
  });

  const swipCategories = new Swiper('.catalog__categories', {
    spaceBetween: 24,
    slidesPerView: 'auto',
    autoHeight: true,
  });

  const swipTags = new Swiper('.catalog__tags-container', {
    spaceBetween: 8,
    slidesPerView: 'auto',
    autoHeight: true,
  });

  swipTags.on('click', () => {
    setTimeout(() => {
      swipTags.update();
    }, 500);
  });


}

function initCategories() {
  const categories = document.querySelectorAll('.catalog .catalog__categories-element');
  const lists = document.querySelectorAll('.catalog .catalog__list');
  categories.forEach((cat) => {
    cat.addEventListener('click', (e) => {
      categories.forEach((btn) => {
        btn.classList.remove('catalog__categories-element--active');
      });
      lists.forEach((list) => {
        list.classList.remove('catalog__list--show');
      });
      const list = document.querySelector(`.catalog .catalog__list[data-id='${cat.getAttribute('data-id')}']`);
      if (list) list.classList.add('catalog__list--show');
      cat.classList.add('catalog__categories-element--active');
    });
  });
  const tags = document.querySelectorAll('.catalog__tags-element');
  tags.forEach((tag) => {
    tag.addEventListener('click', (e) => {
      tag.classList.toggle('catalog__tags-element--selected');
      tag.blur();
    }, false);
  });
}
