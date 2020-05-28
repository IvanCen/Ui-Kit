class Api {
  constructor() {
    this.options = {
      baseUrl: '[~30~]',
      headers: {
        'Content-Type': 'text/html',
      },
    };
  }

  productApi() {
    const request = {
      method: 'get-catalog',
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

  storesApi() {
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
      .then((storesInfo) => {
        storesDataObj.successData = storesInfo.successData;
        storesDataObj.lastEditDateRequest = Date.now();
        localStorage.setItem('storesData', JSON.stringify(storesDataObj));
      })
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
      });
  }

  promoApi(renderPromo) {
    const request = {
      method: 'get-promo',
      offset: 0,
      length: 3,
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
      .then((promoInfo) => promoInfo)
      .then(renderPromo)
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
      });
  }

  postsApi(renderPosts) {
    const request = {
      method: 'get-posts',
      offset: 0,
      length: 2,
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
      .then((postsInfo) => postsInfo)
      .then(renderPosts)
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
      });
  }

  signInApi(phoneSend, func) {
    const request = {
      method: 'sign-in',
      sendCodeMethod: 'callOut',
      phone: `+${phoneSend}`,
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
      .then((signInInfo) => signInInfo)
      .then(func)
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
      });
  }

  authorizeApi(func, code, phoneNumber, timerRegSuccess, refreshLink) {
    const request = {
      method: 'authorize',
      sendCodeMethod: 'callOut',
      phone: phoneNumber,
      code,
      outputFormat: 'json',
    };

    fetch('[~30~]', {
      method: 'POST',
      headers: { 'Content-Type': 'text/html' },
      body: JSON.stringify(request),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((authorizeInfo) => {
        if (authorizeInfo.success === true) {
          clearInterval(timerRegSuccess);
          clearInterval(refreshLink);
        }
        return authorizeInfo;
      })
      .then(func)
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
      });
  }

  getClientApi(func) {
    const request = {
      method: 'get-client',
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
      .then((userInfo) => {
        if (userInfo.success === true) {
          userInfoObj.successData = userInfo.successData;
          localStorage.setItem('userInfo', JSON.stringify(userInfoObj));
        }
        return userInfo;
      })
      .then(func)
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
      });
  }

  setClientApi(request, func) {
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
      .then((userInfo) => userInfo)
      .then(func)
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
      });
  }

  imageCacheQueueApi(request, func) {
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
      .then((userInfo) => userInfo)
      .then(func)
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
      });
  }

  getPrivacyPolicy(mode, documentName) {
    const request = {
      method: 'get-public-document',
      document: 'privacy-policy',
      mode,
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
      .then((info) => {
        if (isEmptyObj(applicationDataObj[documentName]) || info.successData.content !== undefined) {
          applicationDataObj[documentName] = info.successData;
          applicationDataObj[documentName].lastEditDateRequest = Date.now();
        } else if (info.successData.editDate !== applicationDataObj[documentName].editDate) {
          applicationDataObj[documentName].editDate = info.successData.editDate;
          api.getPrivacyPolicy('both');
        }
        localStorage.setItem('applicationData', JSON.stringify(applicationDataObj));
      })
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
      });
  }

  getUserAgreement(mode, documentName) {
    const request = {
      method: 'get-public-document',
      document: 'user-agreement',
      mode,
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
      .then((info) => {
        if (isEmptyObj(applicationDataObj[documentName]) || info.successData.content !== undefined) {
          applicationDataObj[documentName] = info.successData;
          applicationDataObj[documentName].lastEditDateRequest = Date.now();
        } else if (info.successData.editDate !== applicationDataObj[documentName].editDate) {
          applicationDataObj[documentName].editDate = info.successData.editDate;
          api.getUserAgreement('both');
        }
        localStorage.setItem('applicationData', JSON.stringify(applicationDataObj));
      })
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
      });
  }

  getPublicOffer(mode, documentName) {
    const request = {
      method: 'get-public-document',
      document: 'public-offer',
      mode,
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
      .then((info) => {
        if (isEmptyObj(applicationDataObj[documentName]) || info.successData.content !== undefined) {
          applicationDataObj[documentName] = info.successData;
          applicationDataObj[documentName].lastEditDateRequest = Date.now();
        } else if (info.successData.editDate !== applicationDataObj[documentName].editDate) {
          applicationDataObj[documentName].editDate = info.successData.editDate;
          api.getPublicOffer('both');
        }
        localStorage.setItem('applicationData', JSON.stringify(applicationDataObj));
      })
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
      });
  }

  makeOrderApi(phone, orderArrItems, shopId, func) {
    const request = {
      method: 'make-order',
      user: phone,
      cart: orderArrItems,
      shopId: 476, // Тестовый магазин
      promoCode: '',
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
      .then((order) => {
        if (order.success === true) {
          orderInfo = order;
        }
        return order;
      })
      .then(func)
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
      });
  }

  payOrderApi(payFrom, orderInfo, resPayOrder) {
    console.log(payFrom, orderInfo);
    const request = {
      method: 'pay-order',
      from: 'app', // Доступные варианты: app, site, обязательный для атрибута payForm: creditCard
      payFrom, // Доступные варианты: balance, creditCard, bonus
      orderId: orderInfo.orderId, // Номер заказа полученный при его создании
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
      .then((orderPay) => {
        orderPayInfo = orderPay;
        return orderPay;
      })
      .then(resPayOrder)
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
      });
  }
}
