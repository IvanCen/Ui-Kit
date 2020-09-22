/**
 Создаем глобальную переменную, в которой мы будем хранить данные для приложения
 */
let appData = {};
const errors = [];
/**
 Примерная структура хранения данных
 * @type {{object}}
 */
appData = {
  /**
   *
   * @type {{birthday: string, code: string, achievements: string, balance: string, phone: string, bonus: string, name: string, orders: string, email: string}}
   */
  user: {
    name: '',
    phone: '',
    code: '',
    email: '',
    birthday: '',
    achievements: '',
    orders: '',
    balance: '',
    bonus: '',
  },
  information: {},
};

/**
 * Функция отправки ошибки на email (ivansenkov.web@gmail.com) по API
 * @param error
 */
function sendErrorOnEmail(error) {
  makeApiRequest('send-debug-message', { message: `App. Error: ${error}` });
}

/**
 * Функция принимающая ошибку
 * @param error
 */
function catchError(error) {
  sendErrorOnEmail(error);
}

/**
 * Функция добавления глобального объекта appData в локал сторадж
 * */
function setLocalStorageAppData() {
  localStorage.setItem('appData', JSON.stringify(appData));
}

/**
 * Функция создания объекта для данных о каталоге и записи туда информации
 * Завершается вызовом функции записи всего объекта appData в локал сторадж
 * @param data входящие данные для установки в глобальный объект даты
 * */
function setDataCatalog(data) {
  if (!appData.catalog) {
    appData.catalog = {};
  }
  if (data) {
    appData.catalog = data.successData;
    setLocalStorageAppData();
  }
}

/**
 * Функция создания объекта для данных о магазинах и записи туда информации
 * Завершается вызовом функции записи всего объекта appData в локал сторадж
 * @param data входящие данные для установки в глобальный объект даты
 * */
function setDataStores(data) {
  if (!appData.stores) {
    appData.stores = {};
  }
  if (data) {
    appData.stores = data.successData;
    setLocalStorageAppData();
  }
}

/**
 * Функция создания объекта для данных о промо-информации и записи туда информации
 * Завершается вызовом функции записи всего объекта appData в локал сторадж
 * @param data входящие данные для установки в глобальный объект даты
 * */
function setDataPromos(data) {
  if (!appData.information) {
    appData.information = {};
  }
  if (!appData.information.promos) {
    appData.information.promos = {};
  }
  if (data) {
    appData.information.promos = data.successData;
    setLocalStorageAppData();
  }
}

/**
 * Функция создания объекта для данных о постах и записи туда информации
 * Завершается вызовом функции записи всего объекта appData в локал сторадж
 * @param data входящие данные для установки в глобальный объект даты
 * */
function setDataPosts(data) {
  if (!appData.information) {
    appData.information = {};
  }
  if (!appData.information.posts) {
    appData.information.posts = {};

    if (data) {
      appData.information.posts = data.successData;
      setLocalStorageAppData();
    }
  }
}
/*async function doConnectFunction() {
  console.log('connection');
  let status;
  const img = document.createElement('img');
  img.src = 'https://js.cx/clipart/train.gif';
  img.onload = await function () {
    return Promise.resolve(true);
  };
  img.onerror = await function () {
    return false;
  };
  return status;
}
console.log(doConnectFunction().then((res) => console.log(res)));*/
/**
 * Функция запроса всех данных по апи для старта приложения
 * @return {Promise<void>}
 * */
async function getAllDataApiForStartApp() {
  const catalog = await makeApiRequest('get-catalog', {
    view: 'both',
  });
  const stores = await makeApiRequest('get-shops');
  const promos = await makeApiRequest('get-promo', {
    offset: 0,
    length: 3,
  });
  const posts = await makeApiRequest('get-posts', {
    offset: 0,
    length: 2,
  });

  [catalog, stores, promos, posts].forEach((item) => {
    if (!item) {

    }
  });

  setDataCatalog(catalog);
  setDataStores(stores);
  setDataPromos(promos);
  setDataPosts(posts);
}

/**
 * Функция с которой запускается приложение
 * @return {Promise<void>}
 * */
async function coreInit() {
  runPreloader();
  await getAllDataApiForStartApp();
  stopPreloader();
}

coreInit();
