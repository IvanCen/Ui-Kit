/*
class Api {
  constructor() {
    this.options = {
      baseUrl: 'http://app.xleb.ru/api.html',
      headers: {
        'Content-Type': 'text/html',
      },
    };
  }

  productApi() {
    const request = {
      method: 'get-catalog',
      view: 'both',
      outputFormat: 'json',

    };
    fetch(this.options.baseUrl, {
      method: 'POST',
      headers: this.options.headers,
      body: JSON.stringify(request),

    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((productsInfo) => dataProductApi = productsInfo)
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
      });
  }
}
const api = new Api();

class CreateCardItemOrderProductCard {
  constructor(parameters) {
    this.parameters = parameters;
  }

  create() {
    this.element = document.createElement('div');
    this.element.classList.add('card-item', 'card-item--direction--column');


    this.template = `
      <div class="card-item__image card-item__image--size--big"></div>
      <div class="card-item__info-container">
        <h3 class="card-item__title card-item__title--text--normal card-item__title--position--center">gfdgdfg</h3>
        <span class="card-item__available-info card-item__available-info--show">
      </div>`;
    this.element.insertAdjacentHTML('beforeend', this.template);


    return this.element;
  }
}

const cardItem = new CreateCardItemOrderProductCard();

document.querySelector('.item-container').append(cardItem.create());
api.productApi();
*/
