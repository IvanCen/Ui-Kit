/* (async () => {
  const request = {
    method: 'get-shops',
    outputFormat: 'json',
  };
  const rawResponse = await fetch('[~30~]', {
    method: 'POST',
    headers: {
      'Content-Type': 'text/html',
    },
    body: JSON.stringify(request),
  });
  console.log(JSON.parse(await rawResponse.text()));
})();
(async () => {
  const request = {
    method: 'get-catalog',
    outputFormat: 'json',
  };
  const rawResponse = await fetch('[~30~]', {
    method: 'POST',
    headers: {
      'Content-Type': 'text/html',
    },
    body: JSON.stringify(request),
  });
  console.log(JSON.parse(await rawResponse.text()));
})(); */

class Api {
  constructor() {
    this.options = {
      baseUrl: '[~30~]',
      headers: {
        'Content-Type': 'text/html',
      },
    };
  }

  productApi(renderProduct) {
    const request = {
      method: 'get-catalog',
      //view: 'tree',
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
      .then((productsInfo) => productsInfo)
      .then(renderProduct)
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
      });
  }

  storesApi(renderCards) {
    const request = {
      method: 'get-shops',
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
      .then((storesInfo) => storesInfo)
      .then(renderCards)
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
      });
  }
}
