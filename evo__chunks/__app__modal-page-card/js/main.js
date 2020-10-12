function createModalPageCard() {
  const element = document.createElement('div');
  element.classList.add('card');
  const div = document.createElement('div');
  div.classList.add('card__content');
  element.append(div);
  return element;
}
