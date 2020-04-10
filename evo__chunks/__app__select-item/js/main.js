const selectItemButtonContainer = document.querySelector('.select-item__button-container');
const selectItemButton = document.querySelector('.select-item__button');
const popupBar = document.querySelector('.popup-bar');
const popupBarButton = document.querySelectorAll('.popup-bar__button');
const overlay = document.querySelector('.overlay');

selectItemButtonContainer.addEventListener('click', function (event) {
    overlay.addEventListener('click', function (event) {
        if (event.target !== popupBar || event.target === overlay) {
            popupBar.classList.remove('popup-bar--show');
            overlay.classList.remove('overlay--visible');
        }
    })
    overlay.classList.add('overlay--visible');
    popupBar.classList.add('popup-bar--show');
});

[...popupBarButton].forEach((item) => {
    item.addEventListener('click', function () {
        [...popupBarButton].forEach((item) => {
            item.classList.remove('popup-bar__button--active');
        });
        item.classList.add('popup-bar__button--active');
        selectItemButton.textContent = item.textContent;
        popupBar.classList.remove('popup-bar--show');
    })
});
