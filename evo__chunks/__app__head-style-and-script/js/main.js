function switchActive(nodeList, activeClass) {
  [...nodeList].forEach((item) => {
    item.addEventListener('click', function () {
      [...nodeList].forEach((el) => {
        el.classList.remove(activeClass);
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

    if (typeof this.parameters.modifier === 'object') {
      const { className } = element;
      for (const style of this.parameters.modifier) {
        element.classList.add(className + style);
      }
    }
    return element;
  }
}

class TogglePage {
  constructor(parameters) {
    this.parameters = parameters;
    this.body = document.querySelector('body');
    this.page = document.querySelector('.page');

    this.closePage = this.closePage.bind(this);
    this.deletePage = this.deletePage.bind(this);
    this.openPage = this.openPage.bind(this);

    if (typeof this.parameters !== 'object') {
      this.parameters = {};
    }
  }

  deletePage() {
    setTimeout(() => this.page.remove(), 200);
  }

  closePage() {
    this.page.classList.remove('page--opened');
    this.body.classList.remove('body');
  }

  openPage() {
    setTimeout(() => {
      this.page.classList.add('page--opened');
      this.body.classList.add('body');
    }, 100);
  }
}
