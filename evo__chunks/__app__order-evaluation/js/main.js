const EVAL_EVAL_ORDER_ID = 0;
let EVAL_PHONE = 0;

async function rateLastOrder() {
  const request = {
    method: 'get-client-orders',
    lastCount: 1, // необязательное поле, позволяет указать сколько последних заказов вернуть
    outputFormat: 'json',
  };
  const rawResponse = await fetch('[~30~]', {
    method: 'POST',
    headers: {
      'Content-Type': 'text/html',
    },
    body: JSON.stringify(request),
  });
  const result = JSON.parse(await rawResponse.text());
  if (!result.success) {
    let message = 'Возникла ошибка: ';
    result.errors.forEach((error) => {
      message += error;
    });
    console.log(message);
  } else {
    console.log(result.successData, 'result.successData');
    if (result.successData.orders) {
      EVAL_ORDER_ID = Object.keys(result.successData.orders)[0];
      EVAL_PHONE = result.successData.orders[EVAL_ORDER_ID].phone;
      const order = result.successData.orders[EVAL_ORDER_ID];
      console.log(`${order.orderDate}+00:00`, 'order.orderDate');
      let orderTime = new Date(`${order.orderDate.replace(/-/g, '/')}+00:00`);
      if (isNaN(orderTime)) orderTime = new Date(order.orderDate.replace(/-/g, '/'));
      const t = (new Date() - orderTime) / 60000;
      console.log('Условия - ', !order.mark, !order.markComment, order.orderStateName == 'Готов', t);
      if (!order.mark && !order.markComment && order.orderStateName == 'Готов' && t > 30) {
        const listOfItems = document.querySelector('.order-evaluation__popup-list');
        for (const id in order.items) {
          const { itemId } = order.items[id];
          if (dataProductApi.successData.items[itemId]) {
            console.log(itemId, dataProductApi.successData.items[itemId].mainPhoto.name);
            const item = document.createElement('div');
            item.classList.add('order-evaluation__popup-list-element');
            if (!canUseWebP()) {
              loadImg(dataProductApi.successData.items[itemId], item, 'jpg');
            } else {
              loadImg(dataProductApi.successData.items[itemId], item, 'webp');
            }
            listOfItems.append(item);
          }
        }
        orderEvaluation.show(EVAL_ORDER_ID);
        const submit = document.querySelector('.order-evaluation button[type=submit]');
        initEvalInput();
        submit.addEventListener('click', (e) => {
          e.preventDefault();
          const mark = Math.ceil((document.querySelectorAll('.order-evaluation .order-evaluation__list-container-stars-element--active').length * 100) / 3) / 100;
          const comment = document.querySelector('.order-evaluation__field input').value;
          sendMark(mark, comment);
        }, { once: true });
      } else {
        console.log('Последний заказ уже оценён или еще не прошло пол часа!');
      }
    }
  }
}


async function sendMark(mark, comment) {
  console.log(`mark - ${mark}; comment - ${comment}`);
  console.log(EVAL_ORDER_ID, EVAL_PHONE);

  (async () => {
    const request = {
      method: 'set-order-feedback',
      orderId: +EVAL_ORDER_ID,
      client: EVAL_PHONE,
      mark: +mark,
      comment, // необязательное поле
      outputFormat: 'json',
    };
    console.log(request);
    const rawResponse = await fetch('[~30~]', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/html',
      },
      body: JSON.stringify(request),
    });
    const result = JSON.parse(await rawResponse.text());
    console.log(result);
    if (!result.success) {

    } else {

    }
  })();
}


function OrderEvaluation() {
  const self = this;
  const TEMPLATE = `<div class="order-evaluation__list order-evaluation__list--show">
                            <div class="order-evaluation__list-touch"></div>
                            <div class="order-evaluation__list-header">Оцените ваш заказ</div>
                            <div class="order-evaluation__list-container">
                                <div class="order-evaluation__list-container-element">
                                    <span>Качество</span>
                                    <div class="order-evaluation__list-container-stars">
                                        <div class="order-evaluation__list-container-stars-element order-evaluation__list-container-stars-element--active"></div>
                                        <div class="order-evaluation__list-container-stars-element"></div>
                                        <div class="order-evaluation__list-container-stars-element"></div>
                                        <div class="order-evaluation__list-container-stars-element"></div>
                                        <div class="order-evaluation__list-container-stars-element"></div>
                                    </div>
                                </div>
                                <div class="order-evaluation__list-container-element">
                                    <span>Обслуживание</span>
                                    <div class="order-evaluation__list-container-stars">
                                        <div class="order-evaluation__list-container-stars-element order-evaluation__list-container-stars-element--active"></div>
                                        <div class="order-evaluation__list-container-stars-element"></div>
                                        <div class="order-evaluation__list-container-stars-element"></div>
                                        <div class="order-evaluation__list-container-stars-element"></div>
                                        <div class="order-evaluation__list-container-stars-element"></div>
                                    </div>
                                </div>
                                <div class="order-evaluation__list-container-element">
                                    <span>Атмосфера</span>
                                    <div class="order-evaluation__list-container-stars">
                                        <div class="order-evaluation__list-container-stars-element order-evaluation__list-container-stars-element--active"></div>
                                        <div class="order-evaluation__list-container-stars-element"></div>
                                        <div class="order-evaluation__list-container-stars-element"></div>
                                        <div class="order-evaluation__list-container-stars-element"></div>
                                        <div class="order-evaluation__list-container-stars-element"></div>
                                    </div>
                                </div>
                                <div class="order-evaluation__field form__group form__group--float form__group--bordered">
                                    <label class="form__label">Комментарий</label>
                                    <input class="form__input" type="text">
                                </div>
                                <span class="order-evaluation__sub-text">*необязательно</span>
                                <div class="order-evaluation__wrapper">
                                    <button type="submit" class="button button--color-5">Оценить</button>
                                </div>
                            </div>
                        </div>
                    
                        <div class="order-evaluation__popup order-evaluation__popup--show">
                            <h2 class="order-evaluation__popup-header">Вам понравилось?</h2>
                            <div class="order-evaluation__popup-text">Оцените, пожалуйста, заказ №<span class="order-evaluation__popup-number"></span>. Нам очень важно Ваше мнение!</div>
                            <div class="order-evaluation__popup-list">
                            </div>
                            <div class="order-evaluation__popup-buttons">
                                <button class="order-evaluation__popup-button order-evaluation__popup-button--late">позже</button>
                                <button class="order-evaluation__popup-button order-evaluation__popup-button--estimate">оценить</button>
                            </div>
                        </div>`;

  this.evaluation = document.createElement('div');
  this.evaluation.classList.add('order-evaluation');
  this.evaluation.innerHTML = TEMPLATE;

  this.render = function () {
    const check = document.querySelector('.order-evaluation');
    if (!check) {
      document.body.append(self.evaluation);
    }
    self.init();
    self.resizeEval = function () {
      const container = document.querySelector('.order-evaluation__list');
      self.activeEvalTouch(container, true);
    };
    window.addEventListener('resize', self.resizeEval);
  };
  this.show = function (numberOfOrder, items = []) {
    const check = document.querySelector('.order-evaluation');
    if (check) {
      this.evaluation.querySelector('.order-evaluation__popup-number').textContent = numberOfOrder;
      check.classList.add('order-evaluation--show');
      // if(items.length){
      //     this.evaluation.querySelector(".order-evaluation__popup-list").innerHTML = "";
      //     items.forEach(item=>{
      //         let div = document.createElement("div");
      //         div.classList.add("order-evaluation__popup-list-element");
      //         div.style.backgroundImage = "url("+item+")";
      //         this.evaluation.querySelector(".order-evaluation__popup-list").appendChild(div);
      //     });
      // }
    }
  };
  this.evalOpened = false;
  this.init = function () {
    const orderbg = document.querySelector('.order-evaluation');
    const late = self.evaluation.querySelector('.order-evaluation__popup-button--late');
    const submit = document.querySelector('.order-evaluation button[type=submit]');
    orderbg.classList.remove('order-evaluation--show');
    late.addEventListener('click', (e) => {
      orderbg.classList.remove('order-evaluation--show');
    });
    orderbg.addEventListener('click', (e) => {
      if (orderbg == e.target) {
        orderbg.classList.remove('order-evaluation--show');
      }
    });
    submit.addEventListener('click', (e) => {
      // Отправка отзыва
      orderbg.classList.remove('order-evaluation--show');
    });

    const container = document.querySelector('.order-evaluation__list');
    const popup = document.querySelector('.order-evaluation__popup');
    popup.classList.add('order-evaluation__popup--show');
    const estimate = document.querySelector('.order-evaluation__popup-button--estimate');
    estimate.addEventListener('click', () => {
      popup.classList.remove('order-evaluation__popup--show');
      self.evalAnimation('open');
    });

    const starsActive = document.querySelectorAll('.order-evaluation__list-container-stars-element--active');
    starsActive.forEach((star) => {
      star.classList.remove('order-evaluation__list-container-stars-element--active');
    });
    const stars = document.querySelectorAll('.order-evaluation__list-container-stars-element');
    stars.forEach((star) => {
      star.addEventListener('click', () => {
        let el = star;
        while (el) {
          el.classList.add('order-evaluation__list-container-stars-element--active');
          el = el.previousElementSibling;
        }
        el = star.nextElementSibling;
        while (el) {
          el.classList.remove('order-evaluation__list-container-stars-element--active');
          el = el.nextElementSibling;
        }
      });
    });

    self.activeEvalTouch(container);
    self.evalAnimation('end');
  };

  this.remove = function () {
    self.evaluation.remove();
  };

  this.activeEvalTouch = function (container, resize) {
    if (resize) return;
    let dragStart = 182;
    let dragEnd = 182;
    let offsetY = 182;
    let offsetYOnStart = 182;
    let isOpen = false;
    const delta = 0;
    const isEvalOpen = self.evalOpened;
    let windowHeight = container.clientHeight || window.innerHeight;
    if (isEvalOpen === false) {
      offsetY = windowHeight - delta;
      offsetYOnStart = windowHeight - delta;
      container.style.transform = `translate3d(0,${offsetY}px,0)`;
    }
    self.evalAnimation = function (action) {
      windowHeight = container.clientHeight || window.innerHeight;
      if (offsetY > (windowHeight / 5) && !isOpen && action === 'end') {
        offsetY = windowHeight - delta;
        offsetYOnStart = windowHeight - delta;
        isOpen = !isOpen;
        self.evalOpened = false;
      } else if (offsetY > (windowHeight - delta) && action === 'move' && isOpen) {
        offsetY = windowHeight - delta;
        offsetYOnStart = windowHeight - delta;
        dragStart = windowHeight - delta;
        dragEnd = windowHeight - delta;
      } else if (offsetY < (windowHeight) && action === 'end' && isOpen) {
        offsetY = 182;
        offsetYOnStart = 182;
        isOpen = !isOpen;
        self.evalOpened = true;
      }
      if (offsetY < 182) {
        // тут действия, если тянется дальше максимума
        if (action === 'end') {
          offsetY = 182;
          dragStart = 182;
          dragEnd = 182;
          offsetYOnStart = 182;
        } else if (action === 'move') {
          offsetY = 182;// уменьшапем скорость смещения в 2 раза
        }
      }
      if (action === 'open') {
        container.classList.add('order-evaluation__list--animation');
        offsetY = 182;
        dragStart = 182;
        dragEnd = 182;
        offsetYOnStart = 182;
        container.style.transform = `translate3d(0,${offsetY}px,0)`;
        setTimeout(() => {
          container.classList.remove('order-evaluation__list--animation');
        }, 300);
        return;
      }
      // console.log(offsetY, dragStart, dragEnd, offsetYOnStart);
      container.style.transform = `translate3d(0,${offsetY}px,0)`;
      // let s = document.querySelector(".stores__name")
      // s.textContent = "offsetY - " + offsetY +"; windowHeight - " + windowHeight + "; container.scrollHeight - " + container.scrollHeight;
    };

    const panelTouch = container.querySelector('.order-evaluation__list-touch');
    panelTouch.addEventListener('touchstart', (event) => {
      container.classList.remove('order-evaluation__list--animation');
      event.preventDefault();
      dragStart = event.touches[0].clientY;
    }, { passive: false });

    panelTouch.addEventListener('touchmove', (event) => {
      event.preventDefault();
      dragEnd = event.touches[0].clientY;
      offsetY = offsetYOnStart + dragEnd - dragStart;
      self.evalAnimation('move');
    }, { passive: false });

    panelTouch.addEventListener('touchend', (event) => {
      event.preventDefault();
      offsetYOnStart = offsetY;
      container.classList.add('order-evaluation__list--animation');
      self.evalAnimation('end');
      const orderbg = document.querySelector('.order-evaluation');
      if (orderbg) orderbg.classList.remove('order-evaluation--show');
    }, { passive: false });
  };
}

const orderEvaluation = new OrderEvaluation();


document.addEventListener('DOMContentLoaded', onDOMContentLoaded);

function onDOMContentLoaded() {
  orderEvaluation.render();
}

function initEvalInput() {
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
}
