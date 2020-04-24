function createSwiper() {
    const element = document.createElement('div');
    element.classList.add('swiper');

    const template = `
    <div class="swiper-wrapper">
        <div class="swiper-slide swiper-slide&#45;&#45;size&#45;&#45;normal"></div>
        <div class="swiper-slide swiper-slide&#45;&#45;size&#45;&#45;normal"></div>
        <div class="swiper-slide swiper-slide&#45;&#45;size&#45;&#45;normal"></div>
        <div class="swiper-slide swiper-slide&#45;&#45;size&#45;&#45;normal"></div>
    </div>`

    element.insertAdjacentHTML('beforeend', template);

    return element;
}

/*const swiper = new Swiper('.swiper', {
    slidesPerView: 'auto',
    spaceBetween: 16,
});*/

/*const swiperSmall = new Swiper('.swiper-small', {
    slidesPerView: '2',
    spaceBetween: 16,
    width: 338,
});*/


/*const swiperMedium = new Swiper('.swiper-medium', {
    slidesPerView: '2',
    spaceBetween: 16,
    width: 338,
});*/


