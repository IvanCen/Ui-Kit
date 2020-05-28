// (async () => {
//     let request={
//         method: 'get-shops',
//         outputFormat: 'json'
//     };
//     let rawResponse = await fetch('[~30~]', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'text/html'
//         },
//         body: JSON.stringify(request)
//     });
//     console.log(JSON.parse(await rawResponse.text()));
// })();
/**
 * Пополнение баланса
 */
(async () => {
    let request={
        method: 'recharge_the_balance',
        user: '+79522655566',
        amount: 1000,
        from: 'app',// Доступные варианты: app, site
        outputFormat: 'json'
    };
    let rawResponse = await fetch('[~30~]', {
        method: 'POST',
        headers: {
            'Content-Type': 'text/html'
        },
        body: JSON.stringify(request)
    });
    console.log(JSON.parse(await rawResponse.text()));
})();
/**
 * Получение проверка промокода
 * доступные промокоды:
 * МЕДОВЫЙРАФ - на подарок
 * 1PERCENT - 1 % скидки
 * 1PERCENTONEUSE - 1 % скидки уникальный
 * 1PERCENTONEUSEBYUSE - 1 % скидки один раз для пользователя
 * 1PERCENTONEUSEBYDAY - 1 % скидки один раз для пользователя в день
 * 1RUB - 1 рубль скидки
 * 1RUBONEUSE - 1 рубль скидки уникальный
 * 1RUBONEUSEBYUSER - 1 рубль скидки один раз для пользователя
 * 1RUBONEUSEBYDAY - 1 рубль скидки один раз для пользователя в день
 */

(async () => {
    let request={
        method: 'promo-code-check',
        promoCode: 'МЕДОВЫЙРАФ'.toUpperCase(), //все промокоды в верхнем регистре
        user: '+79522655566',
        outputFormat: 'json'
    };
    let rawResponse = await fetch('[~30~]', {
        method: 'POST',
        headers: {
            'Content-Type': 'text/html'
        },
        body: JSON.stringify(request)
    });
    // console.log(JSON.parse(await rawResponse.text()));
})();
/**
 * Получение списка товаров и модификаторов, которые недоступны на этой точке
 */

(async () => {
    let request={
        method: 'get-shop-out-of-stock-items-and-modifiers',
        shopId: 476, // Тестовый магазин
        outputFormat: 'json'
    };
    let rawResponse = await fetch('[~30~]', {
        method: 'POST',
        headers: {
            'Content-Type': 'text/html'
        },
        body: JSON.stringify(request)
    });
    // console.log(JSON.parse(await rawResponse.text()));
})();

/**
 * Формирование заказа
 */
(async () => {
    let request={
        method: 'make-order',
        cart: [
            {
                id: 64,//кофе медовый раф
                modifiers: [
                    {
                        id: 423,//шоколадный сироп
                        count: 1,
                    },
                    {
                        id: 440,//маршмеллоу
                        count: 4,
                    },
                ]
            },
            {
                id: 64,//кофе медовый раф
                modifiers: [
                    {
                        id: 440,//маршмеллоу
                        count: 2,
                    },
                ]
            },
            {
                id: 46, //американо
            },
            {
                id: 42, //горячий шоколад
            }
        ],
        comment: 'Тестовый заказ',
        shopId: 476, // Тестовый магазин
        user: '+79522655566',
        promoCode: 'МЕДОВЫЙРАФ', // промокод дает start1 кофе медовый раф с двумя шоколадными сиропами, 10% скидки и еще 6 рублей скидки
        outputFormat: 'json'
    };
    let rawResponse = await fetch('[~30~]', {
        method: 'POST',
        headers: {
            'Content-Type': 'text/html'
        },
        body: JSON.stringify(request)
    });
    // console.log(JSON.parse(await rawResponse.text()));
})();
/**
 * Оплата заказа
 */

(async () => {
    let request={
        method: 'pay-order',
        from: 'app',// Доступные варианты: app, site, обязательный для атрибута payForm: creditCard
        payFrom: 'creditCard', // Доступные варианты: balance, creditCard, bonus
        orderId: 900004, // Номер заказа полученный при его создании
        outputFormat: 'json'
    };
    let rawResponse = await fetch('[~30~]', {
        method: 'POST',
        headers: {
            'Content-Type': 'text/html'
        },
        body: JSON.stringify(request)
    });
    // console.log(JSON.parse(await rawResponse.text()));
})();
/**
 * Ошибки, которые могут возникнуть при вызове метода get-public-document:
 * Документ не задан|если передаваемый параметр document пустой
 * Возвращаемые параметры не заданы|если передаваемый параметр mode пустой
 * Возвращаемые параметры заданы с ошибкой|если передаваемый параметр mode не входит в предопределенный список
 * Документ не найден|если соответствующий документ для передаваемого параметра document не определен на сервере
 * Произошла ошибка при получени данных документа|если на сервере произошла какая-то ошибка и данные не удалось получить
 * Примеры вызова метода get-public-document:
 */
/**
 * Политика конфиденциальности, дата изменения и содержимое
 */
(async () => {
    let request={
        method: 'get-public-document',
        document: 'privacy-policy',
        mode: 'both',
        outputFormat: 'json'
    };
    let rawResponse = await fetch('[~30~]', {
        method: 'POST',
        headers: {
            'Content-Type': 'text/html'
        },
        body: JSON.stringify(request)
    });
    // console.log(JSON.parse(await rawResponse.text()));
})();
/**
 * Политика конфиденциальности, дата изменения
 */
(async () => {
    let request={
        method: 'get-public-document',
        document: 'privacy-policy',
        mode: 'editDateTime',
        outputFormat: 'json'
    };
    let rawResponse = await fetch('[~30~]', {
        method: 'POST',
        headers: {
            'Content-Type': 'text/html'
        },
        body: JSON.stringify(request)
    });
    // console.log(JSON.parse(await rawResponse.text()));
})();
/**
 * Политика конфиденциальности, содержимое
 */
(async () => {
    let request={
        method: 'get-public-document',
        document: 'privacy-policy',
        mode: 'content',
        outputFormat: 'json'
    };
    let rawResponse = await fetch('[~30~]', {
        method: 'POST',
        headers: {
            'Content-Type': 'text/html'
        },
        body: JSON.stringify(request)
    });
    // console.log(JSON.parse(await rawResponse.text()));
})();
/**
 * Пользовательское соглашение, содержимое
 */
(async () => {
    let request={
        method: 'get-public-document',
        document: 'user-agreement',
        mode: 'content',
        outputFormat: 'json'
    };
    let rawResponse = await fetch('[~30~]', {
        method: 'POST',
        headers: {
            'Content-Type': 'text/html'
        },
        body: JSON.stringify(request)
    });
    // console.log(JSON.parse(await rawResponse.text()));
})();
/**
 * Публичная оферта, содержимое
 */
(async () => {
    let request={
        method: 'get-public-document',
        document: 'public-offer',
        mode: 'content',
        outputFormat: 'json'
    };
    let rawResponse = await fetch('[~30~]', {
        method: 'POST',
        headers: {
            'Content-Type': 'text/html'
        },
        body: JSON.stringify(request)
    });
    // console.log(JSON.parse(await rawResponse.text()));
})();




(async () => {
    let request={
        method: 'get-catalog',
        view: 'tree',
        outputFormat: 'json'
    };
    let rawResponse = await fetch('[~30~]', {
        method: 'POST',
        headers: {
            'Content-Type': 'text/html'
        },
        body: JSON.stringify(request)
    });
    let catalog=JSON.parse(await rawResponse.text());
    // console.log(catalog);
    /**
     * Тут показано как получить модификаторы, которые действительно доступны у товара,
     * также получаем сохраненную модификацию и по ней строим доступные категории модификаторов с проброшенным количеством
     */
    let modifiers=catalog.successData.modifiers;


    let rafMedoviyId = 64;

    let rafMedoviy=catalog.successData.items[rafMedoviyId];
    let rafMedoviyModifiers = rafMedoviy.modifiers;

    /*
    Составляем список действительно доступных модификаторов
     */
    let realAvailableMedoviyRafModifiers = [];
    for( let rafMedoviyModifierKey of rafMedoviyModifiers){
        if(typeof modifiers[rafMedoviyModifierKey] === 'object'){
            realAvailableMedoviyRafModifiers.push(modifiers[rafMedoviyModifierKey]);
        }
    }
    /*
    Имитируем заполненный список модификаций товара, сохраненный в local storage
     */
    let userData = {};
    userData.itemConfirations = {
        64: {   // идентификатор медового рафа
            431: 2, // манго сироп 2 шт
            440: 3, // маршмелоу 3 шт
        }
    };
    /*
    Проходим все действительно доступные модификаторы и строим список с категориями
     */
    let itemModifierWithTitles = {};
    for( let realAvailableMedoviyRafModifier of realAvailableMedoviyRafModifiers){
        if(typeof itemModifierWithTitles[realAvailableMedoviyRafModifier['category']] !== 'object'){
            itemModifierWithTitles[realAvailableMedoviyRafModifier['category']] = {};
        }
        itemModifierWithTitles[realAvailableMedoviyRafModifier['category']][realAvailableMedoviyRafModifier['id']] = Object.assign({},realAvailableMedoviyRafModifier);
        if(typeof userData.itemConfirations[rafMedoviyId]==='object' && typeof userData.itemConfirations[rafMedoviyId][realAvailableMedoviyRafModifier['id']]!=='undefined'){
            itemModifierWithTitles[realAvailableMedoviyRafModifier['category']][realAvailableMedoviyRafModifier['id']]['count']=userData.itemConfirations[rafMedoviyId][realAvailableMedoviyRafModifier['id']]; // тут мы закидываем количество в свойство count
        }
    }
    // console.log(itemModifierWithTitles); // выводим список с категориями модификаторов данного товара и количеством товаров
    // console.log(realAvailableMedoviyRafModifiers); // выводим общий список доступных модификаторов для данного товара, видим, что мы разделили их и они не получили count, который мы взяли из сохраненных данных о товаре
    /**
     * Ищем среди товаров
     */
    let searchItemText = 'Американо кофе';
    searchItemText = searchItemText.toLowerCase();
    let searchItemTextArray = searchItemText.split(' ');
    let searchItems = {};
    for( let item in catalog.successData.items ) {
        let  numberOfHits = 0;
        for( let searchItemTextPart of searchItemTextArray){
            numberOfHits+=(catalog.successData.items[item].name.toLowerCase().split(searchItemTextPart).length - 1);
            if(typeof catalog.successData.items[item]['intro'] !=='undefined'){
                numberOfHits+=(catalog.successData.items[item]['intro'].toLowerCase().split(searchItemTextPart).length - 1);
            }
        }
        if(numberOfHits>0){
            if(typeof searchItems[numberOfHits]!=='object'){
                searchItems[numberOfHits]=[];
            }
            searchItems[numberOfHits].push(catalog.successData.items[item]);
        }
    }
    /**
     * Выводим в обратном порядке
     */
    for( let resultGroupKey of Object.keys(searchItems).reverse()){
        // console.log(resultGroupKey);
        // console.log(searchItems[resultGroupKey]);
    }
})();
// (async () => {
//     let request={
//         method: 'get-promo',
//         offset: 0,
//         length: 2,
//         outputFormat: 'json'
//     };
//     let rawResponse = await fetch('[~30~]', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'text/html'
//         },
//         body: JSON.stringify(request)
//     });
//     console.log(JSON.parse(await rawResponse.text()));
// })();
// (async () => {
//     let request={
//         method: 'get-posts',
//         offset: 0,
//         length: 1,
//         outputFormat: 'json'
//     };
//     let rawResponse = await fetch('[~30~]', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'text/html'
//         },
//         body: JSON.stringify(request)
//     });
//     console.log(JSON.parse(await rawResponse.text()));
// })();
//
// (async () => {
//     let request={
//         method: 'sign-in',
//         sendCodeMethod: 'callOut',
//         phone: '+79522655566',
//         outputFormat: 'json'
//     };
//     let rawResponse = await fetch('[~30~]', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'text/html'
//         },
//         body: JSON.stringify(request)
//     });
//     console.log(JSON.parse(await rawResponse.text()));
// })();
// (async () => {
//     let request={
//         method: 'image-cache-queue',
//         originalFileUrl: 'assets/images/docs/46/kofe__amerikano__0_150_.jpg',
//         fileEditDate: 1589150584,
//         extension: 'webp',
//         sizeX: '400',
//         sizeY: '400',
//     };
//     let rawResponse = await fetch('[~30~]', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'text/html'
//         },
//         body: JSON.stringify(request)
//     });
//     console.log(JSON.parse(await rawResponse.text()));
// })();