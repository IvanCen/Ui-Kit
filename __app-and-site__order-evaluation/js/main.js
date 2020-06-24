let ORDER_ID = 0; let
  PHONE = 0;
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
    ORDER_ID = Object.keys(result.successData.orders)[0];
    PHONE = result.successData.orders[ORDER_ID].phone;
    const order = result.successData.orders[ORDER_ID];
    const orderTime = new Date(order.orderDate);
    const t = (new Date() - orderTime) / 60000;
    console.log(order);


    if (!order.mark && !order.markComment && order.orderStateName == 'Готов' && t > 30) {
      if (typeof toggleModal !== 'undefined') {
        const eva = createRateContainer();
        toggleModal.rendering(`<h2 class="modal__title">Вам понравился прошлый заказ?</h2>${eva.outerHTML}`);
        bindingEvents();
      } else {
        document.querySelector('.popup__header').textContent = 'Вам понравился прошлый заказ?';
        const mainContainer = document.querySelector('.popup__header').parentElement;
        document.querySelector('.popup__container').classList.add('popup__container--left');
        document.querySelector('.popup__image').remove();
        const eva = createRateContainer();
        mainContainer.appendChild(eva);
        bindingEvents();
        showPopup();
      }
    } else {
      console.log('Последний заказ уже оценён!');
    }
  }
}

function createRateContainer() {
  const evaluation = document.createElement('div');
  evaluation.classList.add('evaluation');

  const smileContainer = document.createElement('div');
  smileContainer.classList.add('evaluation__smiles');

  for (let i = 1; i <= 5; i++) {
    const smile = document.createElement('div');
    smile.classList.add('evaluation__smile', `evaluation__smile-${i}`);
    smile.setAttribute('data-value', i);
    if (i == 3) smile.classList.add('evaluation__smile--active');
    smileContainer.appendChild(smile);
  }

  const input = document.createElement('textarea');
  input.classList.add('evaluation__msg');
  input.setAttribute('rows', '3');

  const p = document.createElement('p');
  p.textContent = 'Рассказать подробнее:';

  evaluation.appendChild(smileContainer);
  evaluation.appendChild(p);
  evaluation.appendChild(input);
  if (typeof toggleModal === 'undefined') {
    const button = document.createElement('button');
    button.classList.add('button', 'button--color-6', 'evaluation__send');
    button.textContent = 'Отправить';
    evaluation.appendChild(button);
  }
  return evaluation;
}

async function sendMark(mark, comment) {
  console.log(`mark - ${mark}; comment - ${comment}`);
  console.log(ORDER_ID, PHONE);

  (async () => {
    const request = {
      method: 'set-order-feedback',
      orderId: +ORDER_ID,
      client: PHONE,
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
      let message = 'Возникла ошибка: ';
      result.errors.forEach((error) => {
        message += error;
        if (error == 'Войдите, чтобы продолжить') alert('Войдите, чтобы продолжить! Ваш сеанс устарел, попробуйте обновить страничку.');
        setTimeout(() => {
          document.location.reload(true);
        }, 5000);
      });
    } else if (typeof toggleModal !== 'undefined') {
      toggleModal.rendering('Спасибо за вашу оценку!');
    } else {
      document.querySelector('.evaluation').remove();
      document.querySelector('.popup__header').textContent = 'Спасибо за вашу оценку!';
    }
  })();
}

function bindingEvents() {
  document.querySelectorAll('.evaluation__smile').forEach((el) => {
    el.addEventListener('click', (e) => {
      document.querySelectorAll('.evaluation__smile').forEach((el) => {
        el.classList.remove('evaluation__smile--active');
      });
      el.classList.add('evaluation__smile--active');
    });
  });

  const sendButton = document.querySelector('.evaluation__send') || document.querySelector('.modal__button-accept');
  sendButton.textContent = 'Отправить';
  sendButton.addEventListener('click', (e) => {
    const mark = document.querySelector('.evaluation__smile--active').getAttribute('data-value');
    const comment = document.querySelector('textarea').value;
    sendMark(mark, comment);
  });
}
