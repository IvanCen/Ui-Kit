function createSubPage() {
  const element = document.createElement('div');
  const section = document.createElement('section');
  element.classList.add('subpage');
  section.classList.add('subpage__content');
  element.append(section);

  return element;
}
