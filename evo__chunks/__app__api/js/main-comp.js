"use strict";

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var Api = function Api() {
  var _this = this;

  _classCallCheck(this, Api);

  _defineProperty(this, "options", {
    baseUrl: '[~30~]',
    headers: {
      'Content-Type': 'text/html'
    }
  });

  _defineProperty(this, "productApi", function () {
    var request = {
      method: 'get-catalog',
      view: 'both',
      outputFormat: 'json'
    };
    fetch(_this.options.baseUrl, {
      method: 'POST',
      headers: _this.options.headers,
      body: JSON.stringify(request)
    }).then(function (res) {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject("\u041E\u0448\u0438\u0431\u043A\u0430: ".concat(res.status));
    }).then(function (productsInfo) {
      dataProductApi.successData = productsInfo.successData;
      localStorage.setItem('productData', JSON.stringify(dataProductApi));
      return productsInfo;
    })["catch"](function (err) {
      console.log('Ошибка. Запрос не выполнен: ', err);
    });
  });

  _defineProperty(this, "storesApi", function () {
    var request = {
      method: 'get-shops',
      outputFormat: 'json'
    };
    fetch(_this.options.baseUrl, {
      method: 'POST',
      headers: _this.options.headers,
      body: JSON.stringify(request)
    }).then(function (res) {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject("\u041E\u0448\u0438\u0431\u043A\u0430: ".concat(res.status));
    }).then(function (storesInfo) {
      storesDataObj.successData = storesInfo.successData;
      storesDataObj.lastEditDateRequest = Date.now();
      localStorage.setItem('storesData', JSON.stringify(storesDataObj));

      if (!isEmptyObj(userStore)) {
        var isOldStore = function isOldStore() {
          return storesDataObj.successData.every(function (store) {
            if (store.id === userStore.store.id) {
              return false;
            }

            return true;
          });
        };

        if (isOldStore()) {
          delete userStore.store;
          localStorage.setItem('userStore', JSON.stringify(userStore));
        }
      }
    })["catch"](function (err) {
      console.log('Ошибка. Запрос не выполнен: ', err);
    });
  });

  _defineProperty(this, "promoApi", function (func) {
    var request = {
      method: 'get-promo',
      offset: 0,
      length: 3,
      outputFormat: 'json'
    };
    fetch(_this.options.baseUrl, {
      method: 'POST',
      headers: _this.options.headers,
      body: JSON.stringify(request)
    }).then(function (res) {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject("\u041E\u0448\u0438\u0431\u043A\u0430: ".concat(res.status));
    }).then(function (promoInfo) {
      return promoInfo;
    }).then(func)["catch"](function (err) {
      console.log('Ошибка. Запрос не выполнен: ', err);
    });
  });

  _defineProperty(this, "postsApi", function (func) {
    var request = {
      method: 'get-posts',
      offset: 0,
      length: 2,
      outputFormat: 'json'
    };
    fetch(_this.options.baseUrl, {
      method: 'POST',
      headers: _this.options.headers,
      body: JSON.stringify(request)
    }).then(function (res) {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject("\u041E\u0448\u0438\u0431\u043A\u0430: ".concat(res.status));
    }).then(function (postsInfo) {
      return postsInfo;
    }).then(func)["catch"](function (err) {
      console.log('Ошибка. Запрос не выполнен: ', err);
    });
  });

  _defineProperty(this, "signInCodeApi", function (phoneSend, func) {
    var request = {
      method: 'sign-in',
      sendCodeMethod: 'callIn',
      phone: "+".concat(phoneSend),
      outputFormat: 'json'
    };
    fetch(_this.options.baseUrl, {
      method: 'POST',
      headers: _this.options.headers,
      body: JSON.stringify(request)
    }).then(function (res) {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject("\u041E\u0448\u0438\u0431\u043A\u0430: ".concat(res.status));
    }).then(function (signInInfo) {
      return signInInfo;
    }).then(func)["catch"](function (err) {
      console.log('Ошибка. Запрос не выполнен: ', err);
    });
  });

  _defineProperty(this, "authorizeCallInApi", function (func, code, phone) {
    console.log(phone, code);
    var request = {
      method: 'authorize',
      sendCodeMethod: 'callIn',
      phone: phone,
      code: code,
      outputFormat: 'json'
    };
    fetch('[~30~]', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/html'
      },
      body: JSON.stringify(request)
    }).then(function (res) {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject("\u041E\u0448\u0438\u0431\u043A\u0430: ".concat(res.status));
    }).then(function (authorizeInfo) {
      console.log(authorizeInfo, 'auth');
      return authorizeInfo;
    }).then(func)["catch"](function (err) {
      console.log('Ошибка. Запрос не выполнен: ', err);
    });
  });

  _defineProperty(this, "getClientApi", function (func) {
    var request = {
      method: 'get-client',
      outputFormat: 'json'
    };
    fetch(_this.options.baseUrl, {
      method: 'POST',
      headers: _this.options.headers,
      body: JSON.stringify(request)
    }).then(function (res) {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject("\u041E\u0448\u0438\u0431\u043A\u0430: ".concat(res.status));
    }).then(function (userInfo) {
      console.log(userInfo);

      if (userInfo.success === true) {
        userInfoObj.successData = userInfo.successData;
        localStorage.setItem('userInfo', JSON.stringify(userInfoObj));
      } else {
        delete userInfoObj.successData;
        localStorage.setItem('userInfo', JSON.stringify(userInfoObj));
      }

      return userInfo;
    }).then(func)["catch"](function (err) {
      console.log('Ошибка. Запрос не выполнен: ', err);
    });
  });

  _defineProperty(this, "setClientApi", function (request, func) {
    fetch(_this.options.baseUrl, {
      method: 'POST',
      headers: _this.options.headers,
      body: JSON.stringify(request)
    }).then(function (res) {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject("\u041E\u0448\u0438\u0431\u043A\u0430: ".concat(res.status));
    }).then(function (userInfo) {
      return userInfo;
    }).then(func)["catch"](function (err) {
      console.log('Ошибка. Запрос не выполнен: ', err);
    });
  });

  _defineProperty(this, "imageCacheQueueApi", function (request, func) {
    fetch('[~30~]', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/html'
      },
      body: JSON.stringify(request)
    }).then(function (res) {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject("\u041E\u0448\u0438\u0431\u043A\u0430: ".concat(res.status));
    }).then(function (userInfo) {
      return userInfo;
    }).then(func)["catch"](function (err) {
      console.log('Ошибка. Запрос не выполнен: ', err);
    });
  });

  _defineProperty(this, "getPublicDocument", function (mode, documentName) {
    var request = {
      method: 'get-public-document',
      document: documentName,
      mode: mode,
      outputFormat: 'json'
    };
    fetch(_this.options.baseUrl, {
      method: 'POST',
      headers: _this.options.headers,
      body: JSON.stringify(request)
    }).then(function (res) {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject("\u041E\u0448\u0438\u0431\u043A\u0430: ".concat(res.status));
    }).then(function (info) {
      if (isEmptyObj(applicationDataObj[documentName]) || info.successData.content !== undefined) {
        applicationDataObj[documentName] = info.successData;
        applicationDataObj[documentName].lastEditDateRequest = Date.now();
      } else if (info.successData.editDate !== applicationDataObj[documentName].editDate) {
        applicationDataObj[documentName].editDate = info.successData.editDate;

        _this.getPublicDocument('both', documentName);
      }

      localStorage.setItem('applicationData', JSON.stringify(applicationDataObj));
    })["catch"](function (err) {
      console.log('Ошибка. Запрос не выполнен: ', err);
    });
  });

  _defineProperty(this, "makeOrderApi", function (phone, orderArrItems, shopId, orderComment, orderFriendData, func) {
    var comment;
    var replaceName;
    var replacePhone;
    var friendName = orderFriendData.friendName,
        friendPhone = orderFriendData.friendPhone;

    if (friendName !== '' && friendPhone !== '') {
      replaceName = friendName;
      replacePhone = friendPhone;
    } else {
      replaceName = '';
      replacePhone = '';
    }

    if (orderComment !== '') {
      comment = orderComment;
    } else {
      comment = '';
    }

    console.log(comment);
    console.log(phone, orderArrItems, shopId, orderComment, replaceName, replacePhone, func);
    var store = JSON.parse(localStorage.getItem('userStore'));
    store = store.store;
    var request = {
      method: 'make-order',
      user: phone,
      cart: orderArrItems,
      shopId: store.id,
      promoCode: '',
      comment: comment,
      replaceName: replaceName,
      replacePhone: replacePhone,
      outputFormat: 'json'
    };
    fetch(_this.options.baseUrl, {
      method: 'POST',
      headers: _this.options.headers,
      body: JSON.stringify(request)
    }).then(function (res) {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject("\u041E\u0448\u0438\u0431\u043A\u0430: ".concat(res.status));
    }).then(function (order) {
      console.log(order);

      if (order.success === true) {
        orderInfo = order;
      }

      return order;
    }).then(func)["catch"](function (err) {
      console.log('Ошибка. Запрос не выполнен: ', err);
    });
  });

  _defineProperty(this, "payOrderApi", function (payFrom, orderInfo, func) {
    console.log(payFrom, orderInfo);
    var request = {
      method: 'pay-order',
      from: 'app',
      // Доступные варианты: app, site, обязательный для атрибута payForm: creditCard
      payFrom: payFrom,
      // Доступные варианты: balance, creditCard, bonus
      orderId: orderInfo.orderId,
      // Номер заказа полученный при его создании
      outputFormat: 'json'
    };
    fetch(_this.options.baseUrl, {
      method: 'POST',
      headers: _this.options.headers,
      body: JSON.stringify(request)
    }).then(function (res) {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject("\u041E\u0448\u0438\u0431\u043A\u0430: ".concat(res.status));
    }).then(function (orderPay) {
      orderPayInfo = orderPay;
      return orderPay;
    }).then(func)["catch"](function (err) {
      console.log('Ошибка. Запрос не выполнен: ', err);
    });
  });

  _defineProperty(this, "rechargeBalanceApi", function (userPhone, amount, func) {
    console.log(userPhone, amount);
    var request = {
      method: 'recharge_the_balance',
      user: userPhone,
      amount: amount,
      from: 'appWidget',
      // Доступные варианты: app, site, appWidget
      outputFormat: 'json'
    };
    fetch(_this.options.baseUrl, {
      method: 'POST',
      headers: _this.options.headers,
      body: JSON.stringify(request)
    }).then(function (res) {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject("\u041E\u0448\u0438\u0431\u043A\u0430: ".concat(res.status));
    }).then(function (res) {
      console.log(res);
      return res;
    }).then(func)["catch"](function (err) {
      console.log('Ошибка. Запрос не выполнен: ', err);
    });
  });

  _defineProperty(this, "getClientOrdersApi", function (func) {
    var request = {
      method: 'get-client-orders',
      // lastOrder: '900313', // необязательное поле, позволяет указать последний номер заказа в кеше
      lastCount: 10,
      // необязательное поле, позволяет указать сколько последних заказов вернуть
      outputFormat: 'json'
    };
    fetch(_this.options.baseUrl, {
      method: 'POST',
      headers: _this.options.headers,
      body: JSON.stringify(request)
    }).then(function (res) {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject("\u041E\u0448\u0438\u0431\u043A\u0430: ".concat(res.status));
    }).then(function (userLastOrdersInfo) {
      console.log(userLastOrdersInfo);

      if (userLastOrdersInfo.success === true) {
        userLastOrdersObj.successData = userLastOrdersInfo.successData;
        localStorage.setItem('userLastOrders', JSON.stringify(userLastOrdersObj));
      }

      return userLastOrdersInfo;
    }).then(func)["catch"](function (err) {
      console.log('Ошибка. Запрос не выполнен: ', err);
    });
  });

  _defineProperty(this, "promo\u0421ode\u0421heckApi", function (userPhone, promoCode, func) {
    var request = {
      method: 'promo-code-check',
      promoCode: promoCode.toUpperCase().trim(),
      // все промокоды в верхнем регистре
      user: userPhone,
      outputFormat: 'json'
    };
    fetch(_this.options.baseUrl, {
      method: 'POST',
      headers: _this.options.headers,
      body: JSON.stringify(request)
    }).then(function (res) {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject("\u041E\u0448\u0438\u0431\u043A\u0430: ".concat(res.status));
    }).then(function (res) {
      console.log(res);
      return res;
    }).then(func)["catch"](function (err) {
      console.log('Ошибка. Запрос не выполнен: ', err);
    });
  });

  _defineProperty(this, "getClientBonusLog", function (func) {
    var request = {
      method: 'get-client-bonus-log',
      // lastLogId: '100', // необязательное поле, позволяет указать последний номер заказа в кеше
      lastCount: 10,
      // необязательное поле, позволяет указать сколько последних заказов вернуть
      outputFormat: 'json'
    };
    fetch(_this.options.baseUrl, {
      method: 'POST',
      headers: _this.options.headers,
      body: JSON.stringify(request)
    }).then(function (res) {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject("\u041E\u0448\u0438\u0431\u043A\u0430: ".concat(res.status));
    }).then(function (res) {
      console.log(res);

      if (res.success === true) {
        userBonusLog.successData = res.successData;
        localStorage.setItem('userBonusLog', JSON.stringify(userBonusLog));
      }

      return res;
    }).then(func)["catch"](function (err) {
      console.log('Ошибка. Запрос не выполнен: ', err);
    });
  });

  _defineProperty(this, "getClientBalanceLog", function (func) {
    var request = {
      method: 'get-client-balance-log',
      // lastLogId: '100', // необязательное поле, позволяет указать последний номер заказа в кеше
      lastCount: 10,
      // необязательное поле, позволяет указать сколько последних заказов вернуть
      outputFormat: 'json'
    };
    fetch(_this.options.baseUrl, {
      method: 'POST',
      headers: _this.options.headers,
      body: JSON.stringify(request)
    }).then(function (res) {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject("\u041E\u0448\u0438\u0431\u043A\u0430: ".concat(res.status));
    }).then(function (res) {
      if (res.success === true) {
        userBalanceLog.successData = res.successData;
        localStorage.setItem('userBalanceLog', JSON.stringify(userBalanceLog));
      }

      console.log(res);
      return res;
    }).then(func)["catch"](function (err) {
      console.log('Ошибка. Запрос не выполнен: ', err);
    });
  });

  _defineProperty(this, "logout", function (func) {
    var request = {
      method: 'logout',
      outputFormat: 'json'
    };
    fetch('[~30~]', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/html'
      },
      body: JSON.stringify(request)
    }).then(function (res) {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject("\u041E\u0448\u0438\u0431\u043A\u0430: ".concat(res.status));
    }).then(function (res) {
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
    }).then(func)["catch"](function (err) {
      console.log('Ошибка. Запрос не выполнен: ', err);
    });
  });

  _defineProperty(this, "markMessageRead", function (phone, timestamp, id, func) {
    var request = {
      method: 'mark-message-read',
      phone: phone,
      id: id,
      // идентефикатор сообщение, полученный при получении сообщений
      timestamp: timestamp,
      // время вставки сообщения, полученное при получении сообщений
      outputFormat: 'json'
    };
    fetch('[~30~]', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/html'
      },
      body: JSON.stringify(request)
    }).then(function (res) {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject("\u041E\u0448\u0438\u0431\u043A\u0430: ".concat(res.status));
    }).then(function (res) {
      console.log(res);
      return res;
    }).then(func)["catch"](function (err) {
      console.log('Ошибка. Запрос не выполнен: ', err);
    });
  });

  _defineProperty(this, "getMessages", function (func) {
    var request = {
      method: 'get-messages',
      // lastId: '100', // необязательное поле, позволяет указать последний идентификатор сообщения в кеше
      // lastCount: 10, // необязательное поле, позволяет указать сколько последних заказов вернуть
      outputFormat: 'json'
    };
    fetch('[~30~]', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/html'
      },
      body: JSON.stringify(request)
    }).then(function (res) {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject("\u041E\u0448\u0438\u0431\u043A\u0430: ".concat(res.status));
    }).then(function (res) {
      console.log(res);
      userMessages = res;
      return res;
    }).then(func)["catch"](function (err) {
      console.log('Ошибка. Запрос не выполнен: ', err);
    });
  });

  _defineProperty(this, "checkWorkTimeStore", function (store, func) {
    var request = {
      method: 'check-work-time',
      outputFormat: 'json',
      timezone: 3,
      // передаем пока 3 везде, так как все наши точки находятся в этой зоне
      mondayMode: store.monday,
      tuesdayMode: store.tuesday,
      wednesdayMode: store.wednesday,
      thursdayMode: store.thursday,
      fridayMode: store.friday,
      saturdayMode: store.saturday,
      sundayMode: store.sunday
    };
    fetch(_this.options.baseUrl, {
      method: 'POST',
      headers: _this.options.headers,
      body: JSON.stringify(request)
    }).then(function (res) {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject("\u041E\u0448\u0438\u0431\u043A\u0430: ".concat(res.status));
    }).then(function (res) {
      console.log(res);
      return res;
    }).then(func)["catch"](function (err) {
      console.log('Ошибка. Запрос не выполнен: ', err);
    });
  });

  _defineProperty(this, "getShopOutOfStockItemsAndModifiers", function (store, func) {
    var request = {
      method: 'get-shop-out-of-stock-items-and-modifiers',
      shopId: store,
      outputFormat: 'json'
    };
    fetch(_this.options.baseUrl, {
      method: 'POST',
      headers: _this.options.headers,
      body: JSON.stringify(request)
    }).then(function (res) {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject("\u041E\u0448\u0438\u0431\u043A\u0430: ".concat(res.status));
    }).then(function (res) {
      console.log(res);

      if (res.success) {
        outOfStock.successData = res.successData;
        localStorage.setItem('outOfStock', JSON.stringify(outOfStock));
        /* for (const id in outOfStock.successData.itemsAndModifiers) {
          delete dataProductApi.successData.items[id];
          delete dataProductApi.successData.modifiers[id];
          delete dataProductApi.successData.ingredients[id];
        } */
      }

      return res;
    }).then(func)["catch"](function (err) {
      console.log('Ошибка. Запрос не выполнен: ', err);
    });
  });

  _defineProperty(this, "sendDebugMessage", function (message, func) {
    var request = {
      method: 'send-debug-message',
      message: message,
      outputFormat: 'json'
    };
    fetch(_this.options.baseUrl, {
      method: 'POST',
      headers: _this.options.headers,
      body: JSON.stringify(request)
    }).then(function (res) {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject("\u041E\u0448\u0438\u0431\u043A\u0430: ".concat(res.status));
    }).then(function (res) {
      console.log(res);
      return res;
    }).then(func)["catch"](function (err) {
      console.log('Ошибка. Запрос не выполнен: ', err);
    });
  });

  _defineProperty(this, "getClientAchievements", function (func) {
    var request = {
      method: 'get-client-achievements',
      outputFormat: 'json'
    };
    fetch(_this.options.baseUrl, {
      method: 'POST',
      headers: _this.options.headers,
      body: JSON.stringify(request)
    }).then(function (res) {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject("\u041E\u0448\u0438\u0431\u043A\u0430: ".concat(res.status));
    }).then(function (res) {
      console.log(res);

      if (res.success) {
        userAchievements.successData = res.successData;
        localStorage.setItem('userAchievements', JSON.stringify(userAchievements));
      }

      return res;
    }).then(func)["catch"](function (err) {
      console.log('Ошибка. Запрос не выполнен: ', err);
    });
  });
};
