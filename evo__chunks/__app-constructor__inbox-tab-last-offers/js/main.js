class ToggleInboxTabLastOffersContent extends ToggleInboxTabContent {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
  }

  rendering() {
    super.rendering();
    const inboxMainCard = new CreateInboxMainCardNews({
      selector: ['div'],
      style: ['main-card'],
      modifier: ['--type--border', '--theme--shadow', '--indentation--top'],
      title: ['Buy one, get one free'],
      text: ['Есть много вариантов Lorem Ipsum, но большинство из них имеет не всегда приемлемые модификации, например, юмористические вставки или слова, которые даже отдалённо не напоминают латынь.'],
     /* eventOpenDetails: [
        { type: 'click', callback: },
        { type: 'click', callback:  },
      ],*/
    });
    const inboxMainCard2 = new CreateInboxMainCardNews({
      selector: ['div'],
      style: ['main-card'],
      modifier: ['--type--border', '--theme--shadow', '--indentation--top'],
      title: ['Buy one, get one free'],
      text: ['Есть много вариантов Lorem Ipsum, но большинство из них имеет не всегда приемлемые модификации, например, юмористические вставки или слова, которые даже отдалённо не напоминают латынь.'],
      /* eventOpenDetails: [
         { type: 'click', callback: },
         { type: 'click', callback:  },
       ],*/
    });

    this.pageTabContent.append(inboxMainCard.create());
    this.pageTabContent.append(inboxMainCard2.create());
    this.pageContent.append(this.pageTabContent);
    activeButton();
  }
}
