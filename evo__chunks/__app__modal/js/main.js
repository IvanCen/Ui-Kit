let modalContainer = document.querySelector('.modal__container');
let modal = document.querySelector('.modal');
document.addEventListener('click', (event) => {
    if(event.target !== modalContainer) {
        modal.classList.remove('modal--open');
    }
});