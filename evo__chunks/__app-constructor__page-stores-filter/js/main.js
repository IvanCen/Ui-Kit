class TogglePageStoresFilter extends TogglePage {
  constructor(parameters) {
    super(parameters);
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
  }

  rendering() {
    super.rendering();
    const topBar = new CreateTopBarWithCloseIcon({
      selector: ['div'],
      style: ['top-bar'],
      modifier: [`--size--medium${isIos ? '--ios' : ''}`],
      textTitle: ['Store filters'],
      eventCloseIcon: [
        { type: 'click', callback: this.closePage },
        { type: 'click', callback: this.deletePage },
      ],
    });
    const storeHoursTitleBarSmall = new CreateTitleBar({
      selector: ['h2'],
      style: ['title-bar'],
      modifier: ['__title',
        '__title--size--small',
        '--indentation--top',
        '__title--theme--shadow'],
      text: ['Store hours'],
    });
    const openButtonTangerinTransparent = new CreateButton(
      {
        selector: ['button'],
        style: ['button'],
        modifier: ['--size--small',
          '--theme--tangerin-transparent',
          '--indentation--left',
          '--indentation--top',
        ],
        text: ['Open now'],
      },
    );
    const openAlwaysButtonTangerinTransparent = new CreateButton(
      {
        selector: ['button'],
        style: ['button'],
        modifier: ['--size--small',
          '--theme--tangerin-transparent',
          '--indentation--left',
          '--indentation--top',
        ],
        text: ['Open 24 hours per day'],
      },
    );
    const amenitiesTitleBarSmall = new CreateTitleBar({
      selector: ['h2'],
      style: ['title-bar'],
      modifier: ['__title',
        '__title--size--small',
        '--indentation--top',
        '__title--theme--shadow'],
      text: ['Amenities'],
    });
    const wifiButtonTangerinTransparent = new CreateButton(
      {
        selector: ['button'],
        style: ['button'],
        modifier: ['--size--small',
          '--theme--tangerin-transparent',
          '--indentation--left',
          '--indentation--bottom',
        ],
        text: ['Google Wi-Fi'],
      },
    );
    const mobileOrderButtonTangerinTransparent = new CreateButton(
      {
        selector: ['button'],
        style: ['button'],
        modifier: ['--size--small',
          '--theme--tangerin-transparent',
          '--indentation--left',
          '--indentation--bottom',
        ],
        text: ['Mobile Order and Pay'],
      },
    );
    const nitroButtonTangerinTransparent = new CreateButton(
      {
        selector: ['button'],
        style: ['button'],
        modifier: ['--size--small',
          '--theme--tangerin-transparent',
          '--indentation--left',
          '--indentation--bottom',
        ],
        text: ['Nitro Cold Brew'],
      },
    );
    const digitalRewardsButtonTangerinTransparent = new CreateButton(
      {
        selector: ['button'],
        style: ['button'],
        modifier: ['--size--small',
          '--theme--tangerin-transparent',
          '--indentation--left',
          '--indentation--bottom',
        ],
        text: ['Digital Rewards'],
      },
    );
    const buttonShowAllOrange = new CreateButton({
      selector: ['button'],
      style: ['button'],
      modifier: ['--size--big',
        '--theme--tangerin',
        '--indentation--bottom',
        '--indentation--right',
        '--position--right',
        '--theme--shadow-big',
        '--type--fixed',
      ],
      text: ['Показать 35'],
    });

    this.page.append(topBar.create());
    this.page.append(storeHoursTitleBarSmall.create());
    this.buttonContainer = document.createElement('div');
    this.buttonContainer.append(openButtonTangerinTransparent.create());
    this.buttonContainer.append(openAlwaysButtonTangerinTransparent.create());
    this.page.append(this.buttonContainer);
    this.page.append(amenitiesTitleBarSmall.create());
    this.buttonContainerSecond = document.createElement('div');
    this.buttonContainerSecond.append(wifiButtonTangerinTransparent.create());
    this.buttonContainerSecond.append(mobileOrderButtonTangerinTransparent.create());
    this.buttonContainerSecond.append(nitroButtonTangerinTransparent.create());
    this.buttonContainerSecond.append(digitalRewardsButtonTangerinTransparent.create());
    this.page.append(this.buttonContainerSecond);
    setTimeout(() => this.page.append(buttonShowAllOrange.create()), 350);

    activeFilterButton();
    this.openPage();
  }
}
