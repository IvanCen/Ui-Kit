function createModalPageStores() {
  const element = document.createElement('div');
  element.classList.add('modal-page-stores');
  const div = document.createElement('div');
  div.classList.add('modal-page__content');
  element.append(div);
  return element;
}
