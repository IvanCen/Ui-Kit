const footerButton = document.querySelectorAll('.footer__button');

[...footerButton].forEach((item) => {
    item.addEventListener('click', function() {
        [...footerButton].forEach(item => {
            item.classList.remove('footer__button--active');
            item.firstElementChild.classList.remove('footer__icon--active');
        });
        this.classList.add('footer__button--active');
        this.firstElementChild.classList.add('footer__icon--active');
    })
});