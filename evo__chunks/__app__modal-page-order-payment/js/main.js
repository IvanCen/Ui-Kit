function createModalPageOrderPayment() {
  const element = document.createElement('div');
  element.classList.add('modal-page-order-payment');
  const div = document.createElement('div');
  div.classList.add('modal-page-order-payment__content');
  element.append(div);
  return element;
}
