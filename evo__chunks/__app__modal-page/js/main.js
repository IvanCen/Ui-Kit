function createModalPage(className) {
  const element = document.createElement('div');
  element.classList.add('modal-page', `modal-page-${className}`);
  const div = document.createElement('div');
  div.classList.add('modal-page__content', `modal-page-${className}__content`);
  element.append(div);
  return element;
}
