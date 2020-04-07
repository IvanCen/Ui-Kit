const footerButton = document.querySelectorAll('.footer__button');
const footerButtonActive = 'footer__button--active';
const footerIconActive = 'footer__icon--active';

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



//switchActive(footerButton, footerButtonActive, footerIconActive);