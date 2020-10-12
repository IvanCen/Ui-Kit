class EventEmitter {
  constructor() {
    this.events = {};
  }

  emit(eventName, data) {
    const event = this.events[eventName];
    if (event) {
      event.forEach((fn) => {
        fn.call(null, data);
      });
    }
  }

  subscribe(eventName, fn) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push(fn);

    return () => {
      this.events[eventName] = this.events[eventName].filter((eventFn) => fn !== eventFn);
    };
  }
}
/*
 Создаем экземпляр класса EventEmitter
 */

const emitter = new EventEmitter();

/*
 Создаем глобальную переменную, в которой мы будем хранить данные для приложения, чтобы не конвертировать их постоянно в json для локального хранилища и обратно, так как это очень пагубно сказывается на производительности приложения
 */
let appData = {};
/*
 Я думаю, что эти данные должны выглядеть примерно так
 */
appData = {
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
  catalog: {

  },
  information: {

  },
};

/**
 * Функция запускающая прелоадер
 */
function runPreloader() {

}
/**
 * Функция останавливающая прелоадер
 */
function stopPreloader() {

}

/**
 * Функция, которая пытается осуществить вход по ранее сохраненным данным
 */
function autoLogin() {

}

/**
 * Функция, которая проверяет нужно ли обновить данные и обновляет их
 * Иногда проверка на то, изменились ли данные не нужна, поэтому функции обновления выделены в отдельные функции и подписаны через emitter, а не выполняются напрямую
 */
function updateDataAsNeeded() {
  const dataNeedForUpdate = findDataNeededForUpdate();
  if (dataNeedForUpdate.user) {
    emitter.emit('event:userDataWasChanged', dataNeedForUpdate.user); // Общее событие
  }
}
/**
 * Функция, которая проверяет какие данные нужно обновить
 */
function findDataNeededForUpdate() {
  return {};
}

/**
 * Функция, которая обновляет данные
 */
function updateUserData(data) {
  if (!appData.user) {
    appData.user = {};
  }
  /*
     Тут обновление данных клиента через отдельные функции
     */
  for (const parameter in data) {
    const parameterWithBigFirstLetter = parameter[0].toUpperCase() + parameter.slice(1);
    emitter.emit('event:userDataNameWasChanged', 'Вася'); // На отдельные данные
  }
  emitter.emit('event:userDataWasChanged', appData.user); // Общее событие
}
emitter.subscribe('event:userDataNeedForUpdate', (data) => {
  updateUserData(data);
});

/**
 * Функция задающая новое имя клиента на сервере
 * @param name
 */
function setNewUserName(name) {
  let response;
  // делаем fetch...
  if (response && response.success) {
    appData.user.name = name;
    /*
         Сообщаем системе информацию о том, что
         */
    emitter.emit('event:userDataNameWasChanged', appData.user.name); // На отдельные данные
    emitter.emit('event:userDataWasChanged', appData.user); // Общее событие
  }
}

/**
 * Функция которая отрисовывает главную страничку
 */
function showPageTemplateHome() {
  const htmlBody = document.querySelector('body');
  const template = '<div></div>';
  htmlBody.append(template);
}

/**
 * Функция запускающая приложение
 */
function coreInit() {
  runPreloader();
  autoLogin();
  stopPreloader();
}
coreInit();
