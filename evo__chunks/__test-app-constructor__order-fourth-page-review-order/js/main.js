class ToggleFourthPageReviewOrder extends ToggleFourthPage {
  constructor(parameters) {
    super(parameters);
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
  }

  rendering() {
    super.rendering();
    const reviewTopBar = new CreateTopBarReviewOrder({
      selector: ['div'],
      style: ['top-bar'],
      modifier: [
        '--theme--dark',
        '--size--medium',
      ],
      eventBack: [
        { type: 'click', callback: this.closePage },
        { type: 'click', callback: this.deletePage },
      ],
      eventStores: [
        { type: 'click', callback: toggleStores.closePage },
        { type: 'click', callback: toggleStores.clearPage },
        { type: 'click', callback: toggleStores.rendering },
        { type: 'click', callback: toggleStores.openPage },
        { type: 'click', callback: togglePage.closePage },
        { type: 'click', callback: togglePage.deletePage },
        { type: 'click', callback: toggleSubPage.closePage },
        { type: 'click', callback: toggleSubPage.deletePage },
        { type: 'click', callback: toggleThirdPage.closePage },
        { type: 'click', callback: toggleThirdPage.deletePage },
        { type: 'click', callback: toggleFourthPage.closePage },
        { type: 'click', callback: toggleFourthPage.deletePage },
      ],
    });
    const formPromoCode = new CreateFormPromoCode({
      selector: ['div'],
      style: ['accordion__container'],
    });
    const formComment = new CreateFormComment({
      selector: ['div'],
      style: ['accordion__container'],
    });
    const reviewCardItemContainer = new CreateCardItemContainerFavAndHisOrder({
      selector: ['div'],
      style: ['card-item__container'],
      modifier: [
        '--direction--column',
        '--indentation-column--normal',
        '--indentation--top',
        '--indentation--bottom',
        '--type--review',
      ],
    });
    /* const reviewCheckboxTextSlide = new CreateCheckboxTextSlide({
      selector: ['div'],
      style: ['checkbox-textslide'],
    }); */
    const reviewButton = new CreateButton({
      selector: ['button'],
      style: ['button'],
      modifier: ['--size--big',
        '--theme--tangerin',
        '--type--fixed-low',
        '--theme--shadow-big',
        '--type--make-order',
      ],
      text: ['Продолжить'],
    });
    const reviewCardItem = new CreateCardItemReviewOrder({
      style: ['card-item'],
      modifier: [
        '--direction--row',
        '--border--bottom',
      ],
    });


    this.fourthPage.append(createTopBarIos());
    this.fourthPage.append(reviewTopBar.create());
    this.fourthPage.append(formPromoCode.create());
    this.fourthPage.append(formComment.create());
    this.fourthPage.append(reviewCardItemContainer.create());
    // this.fourthPage.append(reviewCheckboxTextSlide.create());
    this.fourthPage.append(reviewButton.create());

    this.cardItemContainer = document.querySelector('.card-item__container--type--review');
    this.reviewButton = document.querySelector('.button--type--make-order');

    const productsItems = dataProductApi.successData.items;
    basketArray.forEach((item) => {
      for (const el of Object.values(productsItems)) {
        if (item.id === el.id) {
          this.cardItemContainer.append(reviewCardItem.create(item));
        }
      }
    });
    function renderPayOrderPage(info) {
      console.log(info);
      if (info.success) {
        toggleFifthPageReviewOrder.rendering(info);
      } else {
        toggleModal.rendering(info.errors[0]);
      }
    }
    function makeOrder(info) {
      if (info.success === false) {
        toggleModal.rendering('Что то пошло не так');
        toggleModal.openPage();
      } else if (info.success === true) {
        if (!isEmptyObj(basketArray)) {
          if (info.successData.timeStateBool === true) {
            const { phone } = userInfoObj.successData;
            const { id } = userStore.store;

            api.makeOrderApi(phone, basketArray, id, orderComment, renderPayOrderPage);
          } else {
            toggleModal.rendering(info.timeStatePickUp);
          }
        } else {
          toggleModal.rendering('Вы ничего не положили в корзину');
          toggleModal.openPage();
        }
      }
    }
    function checkStoreWorkTime(info) {
      if (info.success === false) {
        toggleSubPage.closePage();
        toggleThirdPage.closePage();
        toggleFourthPage.closePage();
        togglePageSignIn.rendering();
      }
      if (info.success === true) {
        for (const day in userStore.store) {
          if (Array.isArray(userStore.store[day])) {
            userStore.store[day] = userStore.store[day].join(', ');
          }
        }
        api.checkWorkTimeStore(userStore.store, makeOrder);
      }
    }

    this.reviewButton.addEventListener('click', () => {
      api.getClientApi(checkStoreWorkTime);
    });

    activeLike();
    activeButton();
    activeAccordion();
    inputFlyLabel();
    this.openPage();
  }
}
