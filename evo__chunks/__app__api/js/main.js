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
      .then((productsInfo) => {
        dataProductApi.successData = productsInfo.successData;
        localStorage.setItem('productData', JSON.stringify(dataProductApi));
        return productsInfo;
      })
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

  promoApi(func) {
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
      .then(func)
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
      });
  }

  postsApi(func) {
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
      .then(func)
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
    console.log(phoneNumber, code);
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
        console.log(authorizeInfo);
        if (authorizeInfo.success === true) {
          clearTimeout(timerRegSuccess);
          clearTimeout(refreshLink);
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
        console.log(userInfo);
        if (userInfo.success === true) {
          userInfoObj.successData = userInfo.successData;
          localStorage.setItem('userInfo', JSON.stringify(userInfoObj));
        } else {
          delete userInfoObj.successData;
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
      .then((userInfo) => userInfo)
      .then(func)
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
      });
  }

  getPublicDocument(mode, documentName) {
    const request = {
      method: 'get-public-document',
      document: documentName,
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
          this.getPublicDocument('both', documentName);
        }
        localStorage.setItem('applicationData', JSON.stringify(applicationDataObj));
      })
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
      });
  }

  makeOrderApi(phone, orderArrItems, shopId, orderComment, func) {
    let comment;
    if (orderComment !== '') {
      comment = orderComment;
    } else {
      comment = '';
    }
    console.log(comment);
    console.log(phone, orderArrItems, shopId, orderComment, func);
    let store = JSON.parse(localStorage.getItem('userStore'));
    store = store.store;
    const request = {
      method: 'make-order',
      user: phone,
      cart: orderArrItems,
      shopId: store.id,
      promoCode: '',
      comment,
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
        console.log(order);
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

  payOrderApi(payFrom, orderInfo, func) {
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
      .then(func)
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
      });
  }

  rechargeBalanceApi(userPhone, amount, func) {
    console.log(userPhone, amount);
    const request = {
      method: 'recharge_the_balance',
      user: userPhone,
      amount,
      from: 'app', // Доступные варианты: app, site
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
      .then((res) => {
        console.log(res);
        return res;
      })
      .then(func)
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
      });
  }

  getClientOrdersApi(func) {
    const request = {
      method: 'get-client-orders',
      // lastOrder: '900313', // необязательное поле, позволяет указать последний номер заказа в кеше
      lastCount: 10, // необязательное поле, позволяет указать сколько последних заказов вернуть
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
      .then((userLastOrdersInfo) => {
        console.log(userLastOrdersInfo);
        if (userLastOrdersInfo.success === true) {
          userLastOrdersObj.successData = userLastOrdersInfo.successData;
          localStorage.setItem('userLastOrders', JSON.stringify(userLastOrdersObj));
        }
        return userLastOrdersInfo;
      })
      .then(func)
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
      });
  }

  promoСodeСheckApi(userPhone, promoCode, func) {
    const request = {
      method: 'promo-code-check',
      promoCode: promoCode.toUpperCase().trim(), // все промокоды в верхнем регистре
      user: userPhone,
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
      .then((res) => {
        console.log(res);
        return res;
      })
      .then(func)
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
      });
  }

  getClientBonusLog(func) {
    const request = {
      method: 'get-client-bonus-log',
      // lastLogId: '100', // необязательное поле, позволяет указать последний номер заказа в кеше
      lastCount: 10, // необязательное поле, позволяет указать сколько последних заказов вернуть
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
      .then((res) => {
        console.log(res);
        if (res.success === true) {
          userBonusLog.successData = res.successData;
          localStorage.setItem('userBonusLog', JSON.stringify(userBonusLog));
        }
        return res;
      })
      .then(func)
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
      });
  }

  getClientBalanceLog(func) {
    const request = {
      method: 'get-client-balance-log',
      // lastLogId: '100', // необязательное поле, позволяет указать последний номер заказа в кеше
      lastCount: 10, // необязательное поле, позволяет указать сколько последних заказов вернуть
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
      .then((res) => {
        if (res.success === true) {
          userBalanceLog.successData = res.successData;
          localStorage.setItem('userBalanceLog', JSON.stringify(userBalanceLog));
        }
        console.log(res);
        return res;
      })
      .then(func)
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
      });
  }

  logout(func) {
    const request = {
      method: 'logout',
      outputFormat: 'json',
    };

    fetch('[~30~]', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/html',
      },
      body: JSON.stringify(request),

    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((res) => {
        console.log(res);
        if (res.success === true) {
          togglePage.closePage();
          localStorage.removeItem('user-sign-in');
          delete userInfoObj.successData;
          renderMainPage.clearPage();
          renderMainPage.rendering();
          renderMainPage.openPage();
        }
        return res;
      })
      .then(func)
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
      });
  }

  markMessageRead(phone, timestamp, id, func) {
    const request = {
      method: 'mark-message-read',
      phone,
      id, // идентефикатор сообщение, полученный при получении сообщений
      timestamp, // время вставки сообщения, полученное при получении сообщений
      outputFormat: 'json',
    };

    fetch('[~30~]', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/html',
      },
      body: JSON.stringify(request),

    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((res) => {
        console.log(res);
        return res;
      })
      .then(func)
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
      });
  }

  getMessages(func) {
    const request = {
      method: 'get-messages',
      // lastId: '100', // необязательное поле, позволяет указать последний идентификатор сообщения в кеше
      // lastCount: 10, // необязательное поле, позволяет указать сколько последних заказов вернуть
      outputFormat: 'json',
    };

    fetch('[~30~]', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/html',
      },
      body: JSON.stringify(request),

    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((res) => {
        console.log(res);
        userMessages = res;
        return res;
      })
      .then(func)
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
      });
  }

  checkWorkTimeStore(store, func) {
    const request = {
      method: 'check-work-time',
      outputFormat: 'json',
      timezone: 3, // передаем пока 3 везде, так как все наши точки находятся в этой зоне
      mondayMode: store.monday,
      tuesdayMode: store.tuesday,
      wednesdayMode: store.wednesday,
      thursdayMode: store.thursday,
      fridayMode: store.friday,
      saturdayMode: store.saturday,
      sundayMode: store.sunday,
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
      .then((res) => {
        console.log(res);
        return res;
      })
      .then(func)
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
      });
  }

  getShopOutOfStockItemsAndModifiers(store, func) {
    const request = {
      method: 'get-shop-out-of-stock-items-and-modifiers',
      shopId: store,
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
      .then((res) => {
        console.log(res);
        if (res.success) {
          outOfStock.successData = res.successData;
          localStorage.setItem('outOfStock', JSON.stringify(outOfStock));
          /*for (const id in outOfStock.successData.itemsAndModifiers) {
            delete dataProductApi.successData.items[id];
            delete dataProductApi.successData.modifiers[id];
            delete dataProductApi.successData.ingredients[id];
          }*/
        }
        return res;
      })
      .then(func)
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
      });
  }
}
