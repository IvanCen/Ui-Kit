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
(async () => {
  let request = {
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
  let catalog = JSON.parse(await rawResponse.text());

  /**
   * Тут показано как получить модификаторы, которые действительно доступны у товара,
   * также получаем сохраненную модификацию и по ней строим доступные категории модификаторов с проброшенным количеством
   */
  let modifiers = catalog.successData.modifiers;


  let rafMedoviyId = 64;

  let rafMedoviy = catalog.successData.items[rafMedoviyId];
  let rafMedoviyModifiers = rafMedoviy.modifiers;

  /*
  Составляем список действительно доступных модификаторов
   */
  let realAvailableMedoviyRafModifiers = [];
  for (let rafMedoviyModifierKey of rafMedoviyModifiers) {
    if (typeof modifiers[rafMedoviyModifierKey] === 'object') {
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
  for (let realAvailableMedoviyRafModifier of realAvailableMedoviyRafModifiers) {
    if (typeof itemModifierWithTitles[realAvailableMedoviyRafModifier['category']] !== 'object') {
      itemModifierWithTitles[realAvailableMedoviyRafModifier['category']] = {};
    }
    itemModifierWithTitles[realAvailableMedoviyRafModifier['category']][realAvailableMedoviyRafModifier['id']] = Object.assign({}, realAvailableMedoviyRafModifier);
    if (typeof userData.itemConfirations[rafMedoviyId] === 'object' && typeof userData.itemConfirations[rafMedoviyId][realAvailableMedoviyRafModifier['id']] !== 'undefined') {
      itemModifierWithTitles[realAvailableMedoviyRafModifier['category']][realAvailableMedoviyRafModifier['id']]['count'] = userData.itemConfirations[rafMedoviyId][realAvailableMedoviyRafModifier['id']]; // тут мы закидываем количество в свойство count
    }
  }
  console.log(itemModifierWithTitles); // выводим список с категориями модификаторов данного товара и количеством товаров
  console.log(realAvailableMedoviyRafModifiers); // выводим общий список доступных модификаторов для данного товара, видим, что мы разделили их и они не получили count, который мы взяли из сохраненных данных о товаре
  /**
   * Ищем среди товаров
   */
  let searchItemText = 'Американо кофе';
  searchItemText = searchItemText.toLowerCase();
  let searchItemTextArray = searchItemText.split(' ');
  let searchItems = {};
  for (let item in catalog.successData.items) {
    let numberOfHits = 0;
    for (let searchItemTextPart of searchItemTextArray) {
      numberOfHits += (catalog.successData.items[item].name.toLowerCase().split(searchItemTextPart).length - 1);
      if (typeof catalog.successData.items[item]['intro'] !== 'undefined') {
        numberOfHits += (catalog.successData.items[item]['intro'].toLowerCase().split(searchItemTextPart).length - 1);
      }
    }
    if (numberOfHits > 0) {
      if (typeof searchItems[numberOfHits] !== 'object') {
        searchItems[numberOfHits] = [];
      }
      searchItems[numberOfHits].push(catalog.successData.items[item]);
    }
  }
  /**
   * Выводим в обратном порядке
   */
  for (let resultGroupKey of Object.keys(searchItems).reverse()) {
    console.log(resultGroupKey);
    console.log(searchItems[resultGroupKey]);
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
