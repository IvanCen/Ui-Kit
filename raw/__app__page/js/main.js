function createPage() {
  const element = document.createElement('div');
  const div = document.createElement('div');
  element.classList.add('page');
  div.classList.add('page__content');
  element.append(div);

  return element;
}
