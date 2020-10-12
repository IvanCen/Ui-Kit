class CreateCheckboxTextSlide extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
    this.template = `
        <input class="checkbox-textslide__input" id="checkbox-textslide" type="checkbox">
        <label class="checkbox-textslide__label" for="checkbox-textslide">
          <div class="checkbox-textslide__switch" data-checked="В кафе" data-unchecked="С собой"></div>
          <div class="checkbox-textslide__label-text"></div>
        </label>`;
  }

  create() {
    this.element.insertAdjacentHTML('beforeend', this.template);

    return super.create(this.element);
  }
}
