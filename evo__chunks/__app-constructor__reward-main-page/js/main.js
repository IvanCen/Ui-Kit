class ToggleReward extends ToggleMainPage {
  constructor(parameters) {
    super(parameters);
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
  }

  rendering() {
    super.rendering('gift');
    const topBar = new CreateTopBarDefault({
      selector: ['div'],
      style: ['top-bar'],
      modifier: [`--size--medium${isIos ? '--ios' : ''}`, '--indentation--bottom'],
      textTitle: ['Достижения'],
    });

    const cardItemContainer = new CreateCardItemContainerProductCard();
    const cardItem = new CreateCardItemRewardCard();
    const cardText = new CreateTextMainCard({
      selector: ['div'],
      style: ['main-card'],
      text: ['У вас пока нет достижений, но всё еще впереди!'],
    });


    this.mainPageContent.append(topBar.create());
    if (!isEmptyObj(userAchievements) && userAchievements.successData.length !== 0) {
      this.mainPageContent.append(cardItemContainer.create('reward', 'card-item__container--indentation--top'));
      this.cardItemContainerEl = this.mainPageContent.querySelector('.card-item__container');
      for (const rewardInfo in userAchievements.successData) {
        this.cardItemContainerEl.append(cardItem.create(userAchievements.successData[rewardInfo]));
      }
    } else {
      this.mainPageContent.append(cardText.create());
    }


  }
}
