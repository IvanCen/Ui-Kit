function createModalPageSignIn() {
  const element = document.createElement('div');
  element.classList.add('modal-page-sign-in');
  const div = document.createElement('div');
  div.classList.add('modal-page-sign-in__content');
  element.append(div);
  return element;
}
