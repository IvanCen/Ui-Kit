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
  catalog: {},
  stores: [],
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
 * Функция возвращающая данные appData из локал стораджа или пустой объект если там пусто
 * @return {object}
 */
function getLocalStorageAppData() {
  return JSON.parse(localStorage.getItem('appData')) || {};
}

/**
 * Функция создания объекта для данных о каталоге и записи туда информации
 * Завершается вызовом функции записи всего объекта appData в локал сторадж
 * @param data входящие данные для установки в глобальный объект appData
 * */
function updateDataCatalog(data) {
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
 * @param data входящие данные для установки в глобальный объект appData
 * */
function updateDataStores(data) {
  if (!appData.stores) {
    appData.stores = [];
  }
  if (data) {
    appData.stores = data.successData;
    setLocalStorageAppData();
  }
}

/**
 * Функция создания объекта для данных о промо-информации и записи туда информации
 * Завершается вызовом функции записи всего объекта appData в локал сторадж
 * @param data входящие данные для установки в глобальный объект appData
 * */
function updateDataPromos(data) {
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
 * @param data входящие данные для установки в глобальный объект appData
 * */
function updateDataPosts(data) {
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

/**
 * Функция создания объекта для данных о публичных документах и записи туда информации
 * Завершается вызовом функции записи всего объекта appData в локал сторадж
 * @param data входящие данные для установки в глобальный объект appData
 * */
function updateDataPublicDocuments(data) {
  if (!appData.publicDocuments) {
    appData.publicDocuments = {};
  }
  if (data) {
    appData.publicDocuments = data;
    setLocalStorageAppData();
  }
}

/**
 * Функция проверки наличия публичных документов в глобальном объекте appData
 * @return {boolean}
 */
function checkAvailabilityDataPublicDocuments() {
  if (!appData.publicDocuments) {
    return false;
  }
  return true;
}

/**
 * Функция получения документа через запрос по API
 */
async function getPublicDocument(mode, documentName) {
  const document = await makeApiRequest('get-public-document', {
    document: documentName,
    mode,
  });
  if (document) {
    document.successData.documentName = documentName;
  }
  return document.successData;
}

/**
 * Функция проверки последнего изменения документа и получение и обновление документов
 * если требуется
 */
function checkLastEditDateTimeDocumentsAndGetItIfIsNeed() {
  const { publicDocuments } = appData;
  const newPublicDocuments = {};
  Object.entries(publicDocuments).forEach(async ([key, value]) => {
    // сравнение времени сейчас с последним запросом на документ,
    // если оно больше чем день вернет true
    // запрос последнего редактирования документа
    const publicDocumentEditDate = await getPublicDocument('editDateTime', key);
    // если время изменилось, делаем запрос на новый документ
    if (publicDocumentEditDate.editDate !== value.editDate) {
      const publicDocument = await getPublicDocument('both', key);
      if (publicDocument) {
        // и записываем его в объект с новыми документами
        newPublicDocuments[publicDocument.documentName] = publicDocument;
      }
    }
  });
  // присваивание с остаточными параметрами, сначала старый объект publicDocuments попадает
  // в appData.publicDocuments потом если newPublicDocuments содержит одинаковое название ключа,
  // он его перезапишет на новое
  return { ...publicDocuments, ...newPublicDocuments };
}

/**
 * Функция получения всех публичных документов
 * @return {object}
 */
async function getDataPublicDocuments() {
  const isPublicDocumentsAvailability = checkAvailabilityDataPublicDocuments();
  const modeBoth = 'both';

  if (!isPublicDocumentsAvailability) {
    const publicDocumentsPrivacyPolicy = await getPublicDocument(modeBoth, 'privacy-policy');
    const publicDocumentsUserAgreement = await getPublicDocument(modeBoth, 'user-agreement');
    const publicDocumentsPublicOffer = await getPublicDocument(modeBoth, 'public-offer');
    const publicDocumentsOurHistory = await getPublicDocument(modeBoth, 'our-history');

    const publicDocuments = {};
    // создание объекта документов и запись в него полученных данных каждого документа
    [publicDocumentsPrivacyPolicy,
      publicDocumentsUserAgreement,
      publicDocumentsPublicOffer,
      publicDocumentsOurHistory].forEach((document) => {
      if (document) {
        publicDocuments[document.documentName] = document;
      }
    });
    return publicDocuments;
  }
  return checkLastEditDateTimeDocumentsAndGetItIfIsNeed();
}

/**
 * Функция проверяющая интернет соединение
 * @return {boolean}
 * */
function checkInternetConnection() {
  return window.navigator.onLine;
}

/**
 * Функция запроса всех данных по апи для старта приложения
 * @return {Promise<void>}
 * */
async function getAllDataForStartApp() {
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
  const publicDocuments = await getDataPublicDocuments();

  return {
    catalog, stores, promos, posts, publicDocuments,
  };
}

/**
 * Функция обновления всех данных для старта приложения
 * @return {Promise<void>}
 * */
async function updateAllDataForStartApp({
  catalog, stores, promos, posts, publicDocuments,
}) {
  updateDataCatalog(catalog);
  updateDataStores(stores);
  updateDataPromos(promos);
  updateDataPosts(posts);
  updateDataPublicDocuments(publicDocuments);
}


/**
 * Функция инициализации данных для запуска приложения
 * @return {Promise<void>}
 */
async function dataInit() {
  const haveInternet = checkInternetConnection();
  appData = getLocalStorageAppData(); // берет данные из локал стораджа и обновляет в глобальной переменной
  if (haveInternet) { // если есть интернет, то обновляет данные на актуальные
    const updatedDataForStartApp = await getAllDataForStartApp;
    await updateAllDataForStartApp(updatedDataForStartApp);
  }
}

/**
 * Функция с которой запускается приложение
 * @return {Promise<void>}
 * */
async function coreInit() {
  runPreloader();
  await dataInit();
  renderMainPage();
  stopPreloader();
}

coreInit();
