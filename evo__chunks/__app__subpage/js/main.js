function createSubPage() {
  const element = document.createElement('div');
  const div = document.createElement('div');
  element.classList.add('subpage');
  div.classList.add('subpage__content');
  element.append(div);

  return element;
}
