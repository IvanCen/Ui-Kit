class ToggleStores extends ToggleMainPage {
  constructor(parameters) {
    super(parameters);
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
  }

  rendering() {
    super.rendering();
    this.mainPage.classList.add('main-page--type--search');
    this.mainPageContent.classList.add('main-page__content--type--search');

    const storesTopBar = new CreateTopBarStores({
      selector: ['div'],
      style: ['top-bar'],
      modifier: ['--size--medium'],
    });
    const storesMapItem = new CreateMapItemStores({
      selector: ['div'],
      style: ['map'],
    });
    const storesMap = new CreateMapStores({
      selector: ['div'],
      style: ['maps'],
    });
    const storesButtonChoiceOrange = new CreateButton({
      selector: ['button'],
      style: ['button'],
      modifier: ['--size--big',
        '--theme--tangerin',
        '--type--fixed',
        '--theme--shadow-big',
      ],
      text: ['Выбрать'],
      events: [
        { type: 'click', callback: toggleModal.rendering },
        { type: 'click', callback: toggleModal.openPage },
      ],
    });


    this.mainPage.prepend(storesMap.create());
    this.mainPage.prepend(storesTopBar.create());
    this.mainPageContent.append(storesMapItem.create());
    this.mainPageContent.append(storesButtonChoiceOrange.create());
    activeButton();
  }
}
