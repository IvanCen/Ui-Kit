function createModalPageOrderHistory() {
  const element = document.createElement('div');
  element.classList.add('modal-page-order-history');
  const div = document.createElement('div');
  div.classList.add('modal-page-order-history__content');
  element.append(div);
  return element;
}
