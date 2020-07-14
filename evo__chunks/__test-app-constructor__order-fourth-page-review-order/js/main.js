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
        `--size--medium${isIos ? '--ios' : ''}`,
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
        { type: 'click', callback: closeOrderPage },
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
    const formFriendPay = new CreateFormFriendPay({
      selector: ['div'],
      style: ['accordion__container'],
    });
    const reviewCardItemContainer = new CreateCardItemContainerFavAndHisOrder({
      selector: ['div'],
      style: ['card-item__container'],
      modifier: [
        '--direction--column',
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
      style: ['banner__container'],
      modifier: [
        '--type--swipe',
        '--border--bottom',
      ],
    });


    this.fourthPage.append(createTopBarIos());
    this.fourthPage.append(reviewTopBar.create());
    this.fourthPage.append(formPromoCode.create());
    this.fourthPage.append(formComment.create());
    this.fourthPage.append(formFriendPay.create());
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
    const banners = document.querySelectorAll('.banner__container');
    banners.forEach((banner) => {
      activeBanners(banner, true);
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
            toggleModal.rendering(info.successData.timeStatePickUp);
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
        returnPage = true;
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

    const phoneMaskFriend = IMask(
      document.querySelector('.form__input-area--type--phone'), {
        mask: '+{7}(000)000-00-00',
        lazy: false,
        placeholderChar: '_',
        autoUnmask: true,
      },
    );
    validation();
    activeLike();
    activeButton();
    activeAccordion();
    inputFlyLabel();
    this.openPage();
  }
}
