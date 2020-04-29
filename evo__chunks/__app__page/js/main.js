function createPage() {
  const element = document.createElement('div');
  const section = document.createElement('section');
  element.classList.add('page');
  section.classList.add('page__content');
  element.append(section);

  return element;
}
