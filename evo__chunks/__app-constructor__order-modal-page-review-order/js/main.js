class ToggleModalPageReviewOrder extends ToggleModalPageOrderReviewRoot {
  constructor(parameters) {
    super(parameters);
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
    this.makeOrder = this.makeOrder.bind(this);
    this.checkStoreWorkTime = this.checkStoreWorkTime.bind(this);
    this.createCheckbox = this.createCheckbox.bind(this);
    this.checkToGo = this.checkToGo.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.modalPageOrderReview = document.querySelector('.modal-page-order-review');
  }

  createCheckbox(info) {
    if (info.success) {
      const { name, price, id } = info.successData;
      const checkboxText = new CreateCheckboxSlide({
        selector: ['label'],
        style: ['checkbox-slide'],
        modifier: [
          '--indentation--top',
          '--indentation--bottom-big',
        ],
        name,
        price,
        id,
      });
      this.modalPageOrderReview.append(checkboxText.create());
      this.checkToGo();
    }
  }

  deleteItem(id) {
    basketArray.every((item, index) => {
      if (item.id === id) {
        basketArray.splice(index, 1);
        return false;
      }
      return true;
    });
  }

  checkToGo() {
    this.checkboxSelect = this.modalPageOrderReview.querySelector('.checkbox-textslide__input');
    this.checkboxCheckboxTextslide = this.modalPageOrderReview.querySelector('.checkbox-textslide');
    this.checkboxSlide = this.modalPageOrderReview.querySelector('.checkbox-slide');
    this.checkboxSlideInput = this.modalPageOrderReview.querySelector('.checkbox-slide__input');
    this.checkboxSelect.addEventListener('click', () => {
      if (this.checkboxSelect.checked) {
        this.checkboxSlide.classList.add('checkbox-slide--hide');
        this.checkboxCheckboxTextslide.classList.add('checkbox-textslide--indentation--bottom-big');
        this.checkboxSlideInput.checked = false;
      } else {
        this.checkboxSlide.classList.remove('checkbox-slide--hide');
        this.checkboxCheckboxTextslide.classList.remove('checkbox-textslide--indentation--bottom-big');
      }
    });
  }

  makeOrder(info) {
    if (info.success === false) {
      toggleModal.rendering('Что то пошло не так');
      toggleModal.openPage();
    } else if (info.success === true) {
      if (!isEmptyObj(basketArray)) {
        if (info.successData.timeStateBool === true) {
          this.checkboxSelect = this.modalPageOrderReview.querySelector('.checkbox-textslide__input');
          this.checkboxSlideInput = this.modalPageOrderReview.querySelector('.checkbox-slide__input');
          const { phone } = userInfoObj.successData;
          const { id } = userStore.store;
          let isToGo;
          const idPackage = Number(this.checkboxSlideInput.getAttribute('data-id'));
          if (this.checkboxSlideInput.checked) {
            this.deleteItem(idPackage);
            basketArray.push({ id: idPackage, modifier: [] });
          } else {
            this.deleteItem(idPackage);
          }

          console.log(this.checkboxSelect.checked);
          isToGo = !this.checkboxSelect.checked;
          api.makeOrderApi(
            phone,
            basketArray,
            id,
            orderComment,
            orderFriendData,
            promoCode,
            isToGo,
            this.renderPayOrderPage,
          );
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
    const pagePay = document.querySelector('.modal-page-order-payment');
    if (pagePay) {
      return null;
    } if (info.success) {
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
            stopAction(() => {
              toggleStores.rendering();
              toggleStores.openPage();
            });
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
    const checkboxSelect = new CreateCheckboxTextSlide({
      selector: ['div'],
      style: ['checkbox-textslide'],
    });

    this.modalPageOrderReview.append(createTopBarIos());
    this.modalPageOrderReview.append(reviewTopBar.create());

    if (basketArray.length !== 0) {
      this.modalPageOrderReview.append(formPromoCode.create());
      this.modalPageOrderReview.append(formComment.create());
      this.modalPageOrderReview.append(formFriendPay.create());
      IMask(
        document.querySelector('.form__input-area--type--phone'), {
          mask: '+{7}(000)000-00-00',
          lazy: false,
          placeholderChar: '_',
          autoUnmask: true,
        },
      );
      this.modalPageOrderReview.append(reviewCardItemContainer.create());
      this.modalPageOrderReview.append(reviewButton.create());
      this.modalPageOrderReview.append(checkboxSelect.create());
      api.getDefaultBagItemForOrder(this.createCheckbox);

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

      emitter.emit('event:counter-changed');
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
        stopAction(() => {
          api.getClientApi(this.checkStoreWorkTime);
        });
      });
    } else {
      this.modalPageOrderReview.append(titleBarEmptyBasket.create());
      this.modalPageOrderReview.append(backButton.create());
    }

    this.openPage();
  }
}
