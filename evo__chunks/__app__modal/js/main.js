const modal = document.querySelector('.modal');
const overlay = modal.parentNode;
const modalButtonAccept = document.querySelector('.modal__button-accept');
document.addEventListener('click', (event) => {
    if(event.target === overlay || event.target === modalButtonAccept) {
        modal.classList.remove('modal--open');
        overlay.classList.remove('overlay--visible');
    }
});