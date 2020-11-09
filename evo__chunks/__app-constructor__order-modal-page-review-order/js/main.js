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
          const { phone } = userInfoObj.successData;
          let isToGo;
          let idPackage;
          let idStore;
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

          if (idPackage) {
            this.deleteItem(idPackage);
            basketArray.push({ id: idPackage, modifier: [] });
          }
          this.inputComment = document.querySelector('.form__input-comment');
          let orderComment;
          if (this.inputComment.value !== '') {
            orderComment = this.inputArea.value;
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
      console.log(payInfo);
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
        closePages();
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
    console.log(inputsPayment);
    if (info.success) {
      [...inputsPayment].forEach((item) => {
        if (item.checked) {
          console.log(resPayOrder, item.id);
          api.payOrderApi(item.id, orderInfo.successData, resPayOrder);
        }
      });
      // toggleModalPagePaymentOrder.rendering(info);
    } else {
      toggleModal.rendering({ subject: 'Ошибка', text: info.errors[0] });
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
              storesPage.rendering();
              storesPage.openPage();
            });
          },
        },
      ],
    });
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

    const textAreaNoBasket = new CreateTextAreaNoBasket({
      selector: ['div'],
      style: ['text-area-container'],
      textButton: ['К меню'],
      eventsButton: [
        {
          type: 'click',
          callback: () => {
            this.closePage();
            this.deletePage();
          },
        },
      ],
    });
    const textAreaNoSignIn = new CreateTextAreaNoSignIn({
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
    });

    this.modalPageOrderReview.append(createTopBarIos());
    this.modalPageOrderReview.append(reviewTopBarNew.create());
    if (isEmptyObj(userInfoObj)) {
      this.modalPageOrderReview.append(textAreaNoSignIn.create());
      this.title = document.querySelector('.header__status-basket');
      this.title.textContent = 'Корзина';
    } else if (basketArray.length !== 0) {
      this.modalPageOrderReview.append(cardItemReviewContainer.create());
      this.modalPageOrderReview.append(formDeliver.create());
      this.modalPageOrderReview.append(formStores.create());
      this.modalPageOrderReview.append(formPay.create());
      this.modalPageOrderReview.append(formPromoCode.create());
      this.modalPageOrderReview.append(formComment.create());
      this.modalPageOrderReview.append(formFriendPay.create());
      this.modalPageOrderReview.append(textAreaResult.create());

      this.accordContainer = document.querySelector('.accordion__container-review');

      const productsItems = dataProductApi.successData.items;

      basketArray.forEach((item, index) => {
        if (typeof productsItems[Number(item.id)] !== 'undefined' && !isEmptyObj(item)) {
          this.accordContainer.append(reviewCardItemNew.create(item));
        } else {
          basketArray.splice(index, 1);
          localStorage.setItem('basket', JSON.stringify(basketArray));
        }
      });

      countResultPriceAndAllProductCounter();

      this.reviewButton = document.querySelector('.button--type--make-order');

      emitter.emit('event:counter-changed');
      const banners = document.querySelectorAll('.banner__container');
      if (banners) {
        banners.forEach((banner) => {
          activeBanners(banner, true);
        });
      }


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
      this.modalPageOrderReview.append(textAreaNoBasket.create());
    }

    function initImages() {
      let images = document.querySelectorAll('.catalog__list-element-image');
      images.forEach((image) => {
        image.style.backgroundImage = `url(${image.dataset.image})`;
      });

      images = document.querySelectorAll('.basket__offers-element-image');
      images.forEach((image) => {
        image.style.backgroundImage = `url(${image.dataset.image})`;
      });
    }

    function onDOMContentLoaded(e) {
      const accordionTriggers = document.querySelectorAll('.accordion__trigger');
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

      const accordionShouldOpen = document.querySelectorAll('.basket__header-should-open');
      accordionShouldOpen.forEach((element) => {
        element.click();
      });

      const groups = document.querySelectorAll('.form__group--float');
      groups.forEach((group) => {
        group.addEventListener('click', (e) => {
          group.classList.add('form__group--focused');
          // group.querySelector('input').focus();
        });
        group.querySelector('input').addEventListener('blur', (e) => {
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

      const sectionReset = document.querySelectorAll('.button__reset');
      sectionReset.forEach((reset) => {
        reset.addEventListener('click', (e) => {
          const inputs = reset.closest('section').querySelectorAll('input');
          inputs.forEach((input) => {
            input.value = '';
            input.closest('.form__group').classList.remove('form__group--not-empty');
          });
        });
      });
    }

    onDOMContentLoaded();

    this.openPage();
  }
}
