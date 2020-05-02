class CreateMapStores extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
    this.template = `
        <iframe class="maps__map" src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d51236.07520483176!2d30.296052640457955!3d59.92756615964072!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sru!2sru!4v1588360018057!5m2!1sru!2sru">  <!--frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"--> </iframe>`;
  }

  create() {
    this.element.insertAdjacentHTML('beforeend', this.template);

    return super.create(this.element);
  }
}
