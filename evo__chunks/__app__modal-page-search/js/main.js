function createModalPageSearch() {
  const element = document.createElement('div');
  element.classList.add('modal-page-search');
  const div = document.createElement('div');
  div.classList.add('modal-page-search__content');
  element.append(div);
  return element;
}
