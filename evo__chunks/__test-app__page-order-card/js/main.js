function createPageOrderCard() {
  const element = document.createElement('div');
  const div = document.createElement('div');
  element.classList.add('page-order');
  div.classList.add('page-order__content');
  element.append(div);

  return element;
}
