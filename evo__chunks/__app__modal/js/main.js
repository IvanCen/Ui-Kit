const modal = document.querySelector('.modal');
const modalOverlay = modal.parentNode;
const modalButtonAccept = document.querySelector('.modal__button-accept');
document.addEventListener('click', (event) => {
    if(event.target === modalOverlay || event.target === modalButtonAccept) {
        modal.classList.remove('modal--open');
        modalOverlay.classList.remove('modal__overlay--visible');
    }
});