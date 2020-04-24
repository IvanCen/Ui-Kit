const modal = document.querySelector('.modal');
const modalButtonAccept = modal.querySelector('.modal__button-accept');

document.addEventListener('click', (event) => {
    if (event.target === modal || event.target === modalButtonAccept) {
        modal.classList.remove('modal--open');
    }
});