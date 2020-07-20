function createModalPageOrderReview() {
  const element = document.createElement('div');
  element.classList.add('modal-page-order-review');
  const div = document.createElement('div');
  div.classList.add('modal-page-order-review__content');
  element.append(div);
  return element;
}
