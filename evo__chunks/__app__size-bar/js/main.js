function activeSizeBar() {
  const sizeBarInfo = document.querySelector('.size-bar__info');
  const sizeBarButtons = document.querySelectorAll('.size-bar__button');
  const sizeBarButtonActive = 'size-bar__button--active';
  const sizeBar = document.querySelector('.size-bar');
  const sizeBarButtonContainer = document.querySelector('.size-bar__button-container');

  (function sizeBarOpen() {
    sizeBar.addEventListener('click', () => {
      sizeBar.classList.add('size-bar--open');
      sizeBarButtonContainer.classList.add('size-bar__button-container--open');
    });
  }());

  (function switchActiveSizeButton() {
    [...sizeBarButtons].forEach((item) => {
      item.addEventListener('click', () => {
        [...sizeBarButtons].forEach((el) => {
          el.classList.remove(sizeBarButtonActive);
        });
        item.classList.add(sizeBarButtonActive);
        sizeBarInfo.textContent = item.textContent;
      });
    });
  }());
}
