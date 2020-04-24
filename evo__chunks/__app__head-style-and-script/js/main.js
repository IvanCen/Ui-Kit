function switchActive(nodeList, activeClass) {
  [...nodeList].forEach((item) => {
    item.addEventListener('click', function () {
      [...nodeList].forEach((item) => {
        item.classList.remove(activeClass);
      });
      this.classList.add(activeClass);
    });
  });
}

class CreateItem {
  constructor(parameters) {
    this.parameters = parameters;
    if (typeof this.parameters !== 'object') {
      this.parameters = {};
    }
  }

  create(element) {
    element.classList.add(this.parameters.style);

    if (typeof this.parameters.styles === 'object') {
      const { className } = element;
      for (const style of this.parameters.styles) {
        element.classList.add(className + style);
      }
    }
    return element;
  }
}
