class ToggleModalPageReviewOrder extends ToggleModalPageOrderReviewRoot {
  constructor(parameters) {
    super(parameters);
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
    this.makeOrder = this.makeOrder.bind(this);
    this.checkStoreWorkTime = this.checkStoreWorkTime.bind(this);
  }

  makeOrder(info) {
    if (info.success === false) {
      toggleModal.rendering('Что то пошло не так');
      toggleModal.openPage();
    } else if (info.success === true) {
      if (!isEmptyObj(basketArray)) {
        if (info.successData.timeStateBool === true) {
          const { phone } = userInfoObj.successData;
          const { id } = userStore.store;

          api.makeOrderApi(phone, basketArray, id, orderComment, orderFriendData, promoCode, this.renderPayOrderPage);
        } else {
          toggleModal.rendering(info.successData.timeStatePickUp);
        }
      } else {
        toggleModal.rendering('Вы ничего не положили в корзину');
        toggleModal.openPage();
      }
    }
  }

  checkStoreWorkTime(info) {
    if (info.success === false) {
      toggleModalPageSignIn.rendering();
    }
    if (info.success === true) {
      for (const day in userStore.store) {
        if (Array.isArray(userStore.store[day])) {
          userStore.store[day] = userStore.store[day].join(', ');
        }
      }
      api.checkWorkTimeStore(userStore.store, this.makeOrder);
    }
  }

  renderPayOrderPage(info) {
    if (info.success) {
      toggleModalPagePaymentOrder.rendering(info);
    } else {
      toggleModal.rendering(info.errors[0]);
    }
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
      eventClose: [
        {
          type: 'click',
          callback: () => {
            this.closePage();
            this.deletePage();
          },
        },
      ],
      isClose: true,
      eventStores: [
        {
          type: 'click',
          callback: () => {
            toggleStores.rendering();
            toggleStores.openPage();
          },
        },
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

    const backButton = new CreateButton({
      selector: ['button'],
      style: ['button'],
      modifier: ['--size--big',
        '--theme--tangerin',
        '--type--fixed-low',
        '--theme--shadow-big',
      ],
      text: ['К меню'],
      events: [
        {
          type: 'click',
          callback: () => {
            this.closePage();
            this.deletePage();
          },
        },
      ],
    });
    const titleBarEmptyBasket = new CreateTitleBar({
      selector: ['div'],
      style: ['title-bar'],
      modifier: ['--indentation--top', '--size--medium'],
      text: ['Добавьте товары в корзину, чтобы продолжить'],
    });

    this.modalPageOrderReview.append(createTopBarIos());
    this.modalPageOrderReview.append(reviewTopBar.create());

    if (basketArray.length !== 0) {
      this.modalPageOrderReview.append(formPromoCode.create());
      this.modalPageOrderReview.append(formComment.create());
      this.modalPageOrderReview.append(formFriendPay.create());
      const phoneMaskFriend = IMask(
        document.querySelector('.form__input-area--type--phone'), {
          mask: '+{7}(000)000-00-00',
          lazy: false,
          placeholderChar: '_',
          autoUnmask: true,
        },
      );
      this.modalPageOrderReview.append(reviewCardItemContainer.create());
      this.modalPageOrderReview.append(reviewButton.create());

      this.cardItemContainer = document.querySelector('.card-item__container--type--review');
      this.reviewButton = document.querySelector('.button--type--make-order');

      const productsItems = dataProductApi.successData.items;
      basketArray.forEach((item, index) => {
        if (typeof productsItems[Number(item.id)] !== 'undefined' && !isEmptyObj(item)) {
          this.cardItemContainer.append(reviewCardItem.create(item));
        } else {
          basketArray.splice(index, 1);
          localStorage.setItem('basket', JSON.stringify(basketArray));
        }
      });
      checkBasket();
      counterBasket();
      const banners = document.querySelectorAll('.banner__container');
      banners.forEach((banner) => {
        activeBanners(banner, true);
      });

      const inputs = this.modalPageOrderReview.querySelectorAll('.form__input-area');
      this.modalPageOrderReview.addEventListener('scroll', () => {
        [...inputs].forEach((el) => {
          if (el.nextElementSibling.classList.contains('form__input--focused')) {
            el.blur();
          }
        });
      });

      orderComment = '';
      activeAccordion();
      inputFlyLabel();

      this.reviewButton.addEventListener('click', () => {
        api.getClientApi(this.checkStoreWorkTime);
      });
    } else {
      this.modalPageOrderReview.append(titleBarEmptyBasket.create());
      this.modalPageOrderReview.append(backButton.create());
    }

    this.openPage();
  }
}
