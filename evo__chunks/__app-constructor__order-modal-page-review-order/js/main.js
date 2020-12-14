class ToggleModalPageReviewOrder extends ToggleModalPageOrderReviewRoot {
  constructor(parameters) {
    super(parameters);
    this.parameters = parameters;
    this.rendering = this.rendering.bind(this);
    this.makeOrder = this.makeOrder.bind(this);
    this.checkStoreWorkTime = this.checkStoreWorkTime.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.modalPageOrderReview = document.querySelector('.modal-page-order-review');
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

  makeOrder(info) {
    if (info.success === false) {
      toggleModal.rendering({ subject: 'Ошибка', text: 'Что то пошло не так' });
      toggleModal.openPage();
    } else if (info.success === true) {
      if (!isEmptyObj(basketArray)) {
        if (info.successData.timeStateBool === true) {
          this.bascketDeliverySection = this.modalPageOrderReview.querySelector('.basket__delivery-type');
          this.bascketStoresSection = this.modalPageOrderReview.querySelector('.basket__shop');
          this.inputsDelivery = this.bascketDeliverySection.querySelectorAll('.form__input');
          this.inputsStores = this.bascketStoresSection.querySelectorAll('.form__input');
          this.inputsSeasons = this.modalPageOrderReview.querySelectorAll('.form__input[name="seasons"]');
          const { phone } = userInfoObj.successData;
          let isToGo;
          let idPackage;
          let idStore;
          let idSeasons;

          this.inputsDelivery.forEach((item) => {
            if (item.checked) {
              isToGo = item.getAttribute('typeToGo') === 'toGo-withPackage' || item.getAttribute('typeToGo') === 'toGo';
              idPackage = Number(item.getAttribute('data-id'));
            }
          });
          this.inputsStores.forEach((item) => {
            if (item.checked) {
              idStore = Number(item.getAttribute('data-id'));
            }
          });

          this.inputsSeasons.forEach((item) => {
            if (item.checked) {
              idSeasons = Number(item.getAttribute('data-id'));
            }
          });

          if (idPackage) {
            this.deleteItem(idPackage);
            basketArray.push({ id: idPackage, modifier: [] });
          }
          this.inputComment = document.querySelector('.form__input-comment');
          let orderComment;
          if (this.inputComment.value !== '') {
            orderComment = this.inputComment.value;
          }
          this.inputPromoCode = document.querySelector('.form__input-promoCode');
          let orderPromoCode;
          if (this.inputPromoCode.value !== '') {
            orderPromoCode = this.inputArea.value;
          }

          api.makeOrderApi(
            phone,
            basketArray,
            idStore,
            orderComment,
            orderFriendData,
            orderPromoCode,
            isToGo,
            idSeasons,
            this.renderPayOrderPage,
          );
        } else {
          toggleModal.rendering({ subject: 'Информация', text: info.successData.timeStatePickUp });
        }
      } else {
        toggleModal.rendering({ subject: 'Информация', text: 'Вы ничего не положили в корзину' });
        toggleModal.openPage();
      }
    }
  }

  checkStoreWorkTime(info) {
    if (info.success === true) {
      for (const day in userStore.store) {
        if (Array.isArray(userStore.store[day])) {
          userStore.store[day] = userStore.store[day].join(', ');
        }
      }
      api.checkWorkTimeStore(userStore.store, this.makeOrder);
    } else {
      toggleModalPageSignIn.rendering();
    }
  }


  renderPayOrderPage(info) {
    function resPayOrder(payInfo) {
      if (payInfo.success) {
        let successText = 'Ваш заказ успешно оплачен';
        let successTextTimeout = 300;
        if (typeof payInfo.successData.payUrl !== 'undefined') {
          successText = 'Если платеж был успешным, то скоро мы получим его и обновим статус вашего заказа или доставим средства на счет';
          successTextTimeout = 2000;
          const link = document.querySelector('.text-area__link');
          document.location.href = payInfo.successData.payUrl;
          link.href = payInfo.successData.payUrl;
          link.click();
        }

        while (basketArray.length > 0) {
          basketArray.pop();
        }
        localStorage.setItem('basket', JSON.stringify(basketArray));
        emitter.emit('event:counter-changed');

        setTimeout(() => {
          toggleModal.rendering({ subject: 'Информация', text: successText });
        }, successTextTimeout);
      } else {
        toggleModal.rendering({ subject: 'Ошибка', text: payInfo.errors[0] });
      }
    }

    const sectionPayment = document.querySelector('.basket__payment');
    const inputsPayment = sectionPayment.querySelectorAll('.form__input');
    checkEmptyBasket();
    closePages();
    const buttonMain = document.querySelector('.main-panel__button--type--main');
    buttonMain.click();
    if (info.success) {
      [...inputsPayment].forEach((item) => {
        if (item.checked) {
          api.payOrderApi(item.id, orderInfo.successData, resPayOrder);
        }
      });
      // toggleModalPagePaymentOrder.rendering(info);
    } else {
      toggleModal.rendering({ subject: 'Ошибка', text: info.errors[0] });
    }
  }

  initContent() {
    const accordionTriggers = this.modalPageOrderReview.querySelectorAll('.accordion__trigger');
    const accordionShouldOpen = this.modalPageOrderReview.querySelectorAll('.basket__header-should-open');
    const groups = this.modalPageOrderReview.querySelectorAll('.form__group--float');
    const sectionReset = this.modalPageOrderReview.querySelectorAll('.button__reset');
    const banners = this.modalPageOrderReview.querySelectorAll('.banner__container');

    if (banners) {
      banners.forEach((banner) => {
        activeBanners(banner, true);
      });
    }
    accordionTriggers.forEach((trigger) => {
      trigger.addEventListener('click', (e) => {
        const container = document.querySelector(`.accordion__container[data-id='${trigger.dataset.id}']`);
        trigger.classList.toggle('accordion__trigger--active');
        container.classList.toggle('accordion__container--show');
        if (container.style.maxHeight) {
          container.style.maxHeight = null;
        } else {
          container.style.maxHeight = `${container.scrollHeight}px`;
        }
      });
    });

    accordionShouldOpen.forEach((element) => {
      element.click();
    });

    groups.forEach((group) => {
      group.addEventListener('click', () => {
        group.classList.add('form__group--focused');
      });
      group.querySelector('input').addEventListener('blur', () => {
        group.classList.remove('form__group--focused');
        if (group.querySelector('input').value) {
          group.classList.add('form__group--not-empty');
        } else {
          group.classList.remove('form__group--not-empty');
        }
      });
      group.click();
      setTimeout(() => {
        group.classList.remove('form__group--focused');
        if (group.querySelector('input').value) {
          group.classList.add('form__group--not-empty');
        } else {
          group.classList.remove('form__group--not-empty');
        }
      }, 40);
    });

    sectionReset.forEach((reset) => {
      reset.addEventListener('click', () => {
        const inputs = reset.closest('section').querySelectorAll('input');
        inputs.forEach((input) => {
          input.value = '';
          input.closest('.form__group').classList.remove('form__group--not-empty');
        });
      });
    });
  }

  rendering() {
    super.rendering();
    const reviewTopBarNew = new CreateTopBarReview({
      selector: ['div'],
      style: ['top-bar'],
      modifier: [
        '--theme--dark',
        `--size--medium${isIos ? '--ios' : ''}`,
        '--indentation--bottom-padding',
      ],
      eventClose: [
        {
          type: 'click',
          callback: () => {
            this.closePage();
            this.deletePage();
            checkEmptyBasket();
          },
        },
      ],
    });

    const formDeliver = new CreateFormDeliver({
      selector: ['div'],
      style: ['accordion-section'],
    });
    const formStores = new CreateFormStores({
      selector: ['div'],
      style: ['accordion-section'],
    });
    const formPay = new CreateFormPay({
      selector: ['div'],
      style: ['accordion-section'],
    });
    const formPromoCode = new CreateFormPromoCode({
      selector: ['div'],
      style: ['accordion-section'],
    });
    const formComment = new CreateFormComment({
      selector: ['div'],
      style: ['accordion-section'],
    });
    const formFriendPay = new CreateFormFriendPay({
      selector: ['div'],
      style: ['accordion-section'],
    });
    const formSeasons = new CreateFormSeasons({
      selector: ['div'],
      style: ['accordion-section'],
    });
    const cardItemReviewContainer = new CreateCardItemReviewContainer({
      selector: ['div'],
      style: ['card-item__container'],
      modifier: [
        '--type--review',
      ],
    });
    const reviewCardItemNew = new CreateCardItemReview({
      style: ['banner__container'],
      modifier: [
        '--type--swipe',
      ],
    });

    const textAreaNoBasket = new TextAreaNoBasket({
      style: ['text-area-container'],
      modifier: [
        '--hide',
        '--empty-basket',
      ],
      textButton: ['К меню'],
      eventsButton: [
        {
          callback: () => {
            this.closePage();
            this.deletePage();
            this.mainButton = document.querySelector('.main-panel__button--type--main');
            this.mainButton.click();
            checkEmptyBasket();
          },
        },
      ],
    });
    const textAreaNoSignIn = new TextAreaNoSignIn({
      selector: ['div'],
      style: ['text-area-container'],
      eventsButton: [
        {
          type: 'click',
          callback: () => {
            this.closePage();
            this.deletePage();
            toggleModalPageSignIn.rendering();
          },
        },
      ],
    });
    const textAreaResult = new CreateTextAreaResult({
      selector: ['div'],
      style: ['text-area-container'],
      modifier: [
        `${isIos ? '--ios' : ''}`,
      ],
      eventsButton: [
        {
          type: 'click',
          callback: () => {
            stopAction(() => {
              api.getClientApi(this.checkStoreWorkTime);
            });
          },
        },
      ],
    });


    this.modalPageOrderReview.append(reviewTopBarNew.create());
    this.modalPageOrderReview.append(textAreaNoBasket.create());
    if (isEmptyObj(userInfoObj)) {
      this.modalPageOrderReview.append(textAreaNoSignIn.create());
      this.title = document.querySelector('.header__status-basket');
      this.title.textContent = 'Корзина';
    } else if (basketArray.length !== 0) {
      this.container = document.createElement('div');
      this.container.classList.add('modal-page-order-review__content-container', `${isIos ? 'modal-page-order-review__content-container--ios' : 'modal-page-order-review__content-container--not-ios'}`);
      this.container.append(cardItemReviewContainer.create());
      this.container.append(formDeliver.create());
      this.container.append(formStores.create());
      this.container.append(formPay.create());
      this.container.append(formPromoCode.create());
      this.container.append(formComment.create());
      this.container.append(formFriendPay.create());
      if (!isEmptyObj(dataSeasons)) {
        this.container.append(formSeasons.create());
      }
      this.container.append(textAreaResult.create());
      this.modalPageOrderReview.append(this.container);

      const accordContainer = document.querySelector('.accordion__container-review');
      const inputs = this.modalPageOrderReview.querySelectorAll('.form__input-area');

      const productsItems = dataProductApi.successData.items;

      basketArray.forEach((item, index) => {
        if (typeof productsItems[Number(item.id)] !== 'undefined' && !isEmptyObj(item)) {
          accordContainer.append(reviewCardItemNew.create(item));
        } else {
          basketArray.splice(index, 1);
          localStorage.setItem('basket', JSON.stringify(basketArray));
        }
      });

      countResultPriceAndAllProductCounter();

      emitter.emit('event:counter-changed');

      this.modalPageOrderReview.addEventListener('scroll', () => {
        [...inputs].forEach((el) => {
          if (el.nextElementSibling.classList.contains('form__input--focused')) {
            el.blur();
          }
        });
      });

      orderComment = '';
      inputFlyLabel();
    } else {
      this.emptyBasketContainerEl = document.querySelector('.text-area-container--empty-basket');
      this.emptyBasketContainerEl.classList.remove('text-area-container--hide');
    }

    this.initContent();

    this.openPage();
  }
}
