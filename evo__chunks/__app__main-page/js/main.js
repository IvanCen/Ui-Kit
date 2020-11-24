const mainPageEl = document.querySelector('.main-page');
const body = document.querySelector('body');

/* window.onerror = (message, url, lineNo) => {
  api.sendDebugMessage(`App-test. Error: ${message} Line Number: ${lineNo}`);
}; */
const api = new Api();
api.getDefaultBagItemForOrder();

const returnPageObj = {
  returnMainPageAfterSignIn: false,
  returnBalanceAfterSignIn: false,
};
const orderFriendData = {};
let orderInfo;
let orderPayInfo;
let orderComment;
let userMessages;
let lastUserMessagesIdLet;
let promoCode;
let timeRequest;
const dataPackage = {};
let AllItemsForSearch;
let AllModifiersForSearch;
// eslint-disable-next-line prefer-const
let storesOpened = false;

let authorizationCodeLet;
let authorizationPhoneLet;
let itemsArrayLet;
let basketArrayLet;
let userDataObjLet;
let applicationDataObjLet;
let storesDataObjLet;
let userInfoObjLet;
let userLastOrdersObjLet;
let userStoreLet;
let userBalanceLogLet;
let userBonusLogLet;
let dataProductApiLet;
let userFavoriteStoreLet;
let outOfStockLet;
let userAchievementsLet;
let dataPostsLet;
let dataPromoLet;
let dataSeasonsLet;
let dataUserSeasonsLet;

try {
  lastUserMessagesIdLet = localStorage.getItem('lastUserMessagesId') || '';
} catch (e) {
  lastUserMessagesIdLet = '0';
  api.sendDebugMessage(e);
}
try {
  authorizationCodeLet = localStorage.getItem('authorizationCode') || '';
} catch (e) {
  authorizationCodeLet = '';
  api.sendDebugMessage(e);
}
try {
  authorizationPhoneLet = localStorage.getItem('authorizationPhone') || '';
} catch (e) {
  authorizationPhoneLet = '';
  api.sendDebugMessage(e);
}
try {
  itemsArrayLet = JSON.parse(localStorage.getItem('items')) || [];
} catch (e) {
  itemsArrayLet = [];
  api.sendDebugMessage(e);
}
try {
  basketArrayLet = JSON.parse(localStorage.getItem('basket')) || [];
} catch (e) {
  basketArrayLet = [];
  api.sendDebugMessage(e);
}
try {
  userDataObjLet = JSON.parse(localStorage.getItem('userData')) || {};
} catch (e) {
  userDataObjLet = {};
  api.sendDebugMessage(e);
}
try {
  applicationDataObjLet = JSON.parse(localStorage.getItem('applicationData')) || {};
} catch (e) {
  applicationDataObjLet = {};
  api.sendDebugMessage(e);
}
try {
  storesDataObjLet = JSON.parse(localStorage.getItem('storesData')) || {};
} catch (e) {
  storesDataObjLet = {};
  api.sendDebugMessage(e);
}
try {
  userInfoObjLet = JSON.parse(localStorage.getItem('userInfo')) || {};
} catch (e) {
  userInfoObjLet = {};
  api.sendDebugMessage(e);
}
try {
  userLastOrdersObjLet = JSON.parse(localStorage.getItem('userLastOrders')) || {};
} catch (e) {
  userLastOrdersObjLet = {};
  api.sendDebugMessage(e);
}
try {
  userStoreLet = JSON.parse(localStorage.getItem('userStore')) || {};
} catch (e) {
  userStoreLet = {};
  api.sendDebugMessage(e);
}
try {
  userBalanceLogLet = JSON.parse(localStorage.getItem('userBalanceLog')) || {};
} catch (e) {
  userBalanceLogLet = {};
  api.sendDebugMessage(e);
}
try {
  userBonusLogLet = JSON.parse(localStorage.getItem('userBonusLog')) || {};
} catch (e) {
  userBonusLogLet = {};
  api.sendDebugMessage(e);
}
try {
  dataProductApiLet = JSON.parse(localStorage.getItem('productData')) || {};
} catch (e) {
  dataProductApiLet = {};
  api.sendDebugMessage(e);
}
try {
  userFavoriteStoreLet = JSON.parse(localStorage.getItem('userFavoriteStore')) || {};
} catch (e) {
  userFavoriteStoreLet = {};
  api.sendDebugMessage(e);
}
try {
  outOfStockLet = JSON.parse(localStorage.getItem('outOfStock')) || {};
} catch (e) {
  outOfStockLet = {};
  api.sendDebugMessage(e);
}
try {
  userAchievementsLet = JSON.parse(localStorage.getItem('userAchievements')) || {};
} catch (e) {
  userAchievementsLet = {};
  api.sendDebugMessage(e);
}
try {
  dataPostsLet = JSON.parse(localStorage.getItem('dataPosts')) || {};
} catch (e) {
  dataPostsLet = {};
  api.sendDebugMessage(e);
}
try {
  dataPromoLet = JSON.parse(localStorage.getItem('dataPromo')) || {};
} catch (e) {
  dataPromoLet = {};
  api.sendDebugMessage(e);
}
try {
  dataSeasonsLet = JSON.parse(localStorage.getItem('dataSeasons')) || {};
} catch (e) {
  dataSeasonsLet = {};
  api.sendDebugMessage(e);
}
try {
  dataUserSeasonsLet = JSON.parse(localStorage.getItem('dataUserSeasons')) || {};
} catch (e) {
  dataUserSeasonsLet = {};
  api.sendDebugMessage(e);
}
// eslint-disable-next-line prefer-const
let lastUserMessagesId = lastUserMessagesIdLet;
// eslint-disable-next-line prefer-const
let authorizationCode = authorizationCodeLet;
// eslint-disable-next-line prefer-const
let authorizationPhone = authorizationPhoneLet;
const itemsArray = itemsArrayLet;
const basketArray = basketArrayLet;
const userDataObj = userDataObjLet;
const applicationDataObj = applicationDataObjLet;
const storesDataObj = storesDataObjLet;
const userInfoObj = userInfoObjLet;
const userLastOrdersObj = userLastOrdersObjLet;
const userStore = userStoreLet;
const userBalanceLog = userBalanceLogLet;
const userBonusLog = userBonusLogLet;
const dataProductApi = dataProductApiLet;
const userFavoriteStore = userFavoriteStoreLet;
const outOfStock = outOfStockLet;
const userAchievements = userAchievementsLet;
const dataPromo = dataPromoLet;
const dataPosts = dataPostsLet;
const dataSeasons = dataSeasonsLet;
const dataUserSeasons = dataUserSeasonsLet;


/* if (isEmptyObj(storesDataObj)) {
    api.storesApi();
  } else if ((Date.now() - storesDataObj.lastEditDateRequest) > (24 * 60 * 60 * 1000)) {
    api.storesApi();
  } */

api.storesApi(); // пока каждый раз вызываем при старте

if (applicationDataObj && isEmptyObj(applicationDataObj)) {
  api.getPublicDocument('both', 'privacy-policy');
  api.getPublicDocument('both', 'user-agreement');
  api.getPublicDocument('both', 'public-offer');
  api.getPublicDocument('both', 'our-history');
} else {
  for (const document in applicationDataObj) {
    if ((Date.now() - applicationDataObj[document].lastEditDateRequest) > (24 * 60 * 60 * 1000)) {
      api.getPublicDocument('editDateTime', document);
    }
  }
}

function getUserInfo(info) {
  if (info.success) {
    api.getClientApi();
  } else {
    delete userInfoObj.successData;
    authorizationCode = '';
    authorizationPhone = '';
    localStorage.setItem('authorizationCode', authorizationCode);
    localStorage.setItem('authorizationPhone', authorizationPhone);
    localStorage.setItem('userInfo', JSON.stringify(userInfoObj));
  }
}

if (authorizationCode !== '' && authorizationPhone !== '') {
  api.authorizeCallInApi(getUserInfo, authorizationCode, authorizationPhone);
}

api.productApi(renderMain);
api.getClientAchievements();
api.getClientOrdersApi();
api.postsApi();
api.getSeasons();
api.getClientSeasons();
api.getClientBonusLog();
api.getClientBalanceLog();
setInterval(api.getMessages, 30000);
api.getMessages();

const toggleOrderMenuContent = new ToggleOrderMenuContent({ api });
const toggleOrderHitsContent = new ToggleOrderHitsContent({ api });
const toggleOrderHistoryContent = new ToggleOrderHistoryContent();
const toggleOrderFavoriteContent = new ToggleOrderFavoriteContent();

const toggleInboxTabMessagesContent = new ToggleInboxTabMessagesContent();
const toggleInboxTabLastOffersContent = new ToggleInboxTabLastOffersContent();
const toggleSubscriptionTabActual = new ToggleSubscriptionTabActual();
const toggleSubscriptionTabMy = new ToggleSubscriptionTabMy();

const togglePageInboxDetails = new TogglePageInboxDetails({
  classOpen: ['page--opened'],
});
const toggleModalPageStoresSearch = new ToggleModalPageStoresSearch({
  classOpen: ['modal-page-search--opened-stores'],
});
const toggleModalPageOrderSearch = new ToggleModalPageOrderSearch({
  classOpen: ['modal-page-search--opened'],
});
const toggleModalPageCard = new ToggleModalPageCard({
  classOpen: ['modal-page-card--opened'],
});
const toggleModalPageSharesDetail = new ToggleModalPageSharesDetail({
  classOpen: ['modal-page-card--opened'],
});
const togglePageStoresFilter = new TogglePageStoresFilter({
  classOpen: ['page--opened'],
});
const togglePageOurHistory = new TogglePageOurHistory({
  classOpen: ['page--opened'],
});
const togglePageOrderCategoryAll = new TogglePageOrderCategoryAll({
  classOpen: ['page--opened--bottom-bar'],
});
const togglePageOrderCategory = new TogglePageOrderCategory({
  classOpen: ['page-order--opened--bottom-bar'],
});
const togglePageBalanceHistoryScore = new TogglePageBalanceHistory({
  classOpen: ['page--opened'],
  titleNameTopBar: ['Баланс'],
  text: ['Ваш баланс'],
  number() {
    if (!isEmptyObj(userInfoObj)) {
      return userInfoObj.successData.balance;
    }
    return '0';
  },
  userLog: userBalanceLog,
});
const togglePageBalanceHistoryBonus = new TogglePageBalanceHistory({
  classOpen: ['page--opened'],
  titleNameTopBar: ['Бонусы'],
  text: ['Ваши бонусы'],
  number() {
    if (!isEmptyObj(userInfoObj)) {
      return userInfoObj.successData.bonus;
    }
    return '0';
  },
  userLog: userBonusLog,
});
const toggleSubPageProductCard = new ToggleSubPageProductCard({
  classOpen: ['subpage--opened--bottom-bar'],
});
const toggleSubPageGiftCard = new ToggleSubPageGiftCard({
  classOpen: ['subpage--opened'],
});
const toggleSubPageSupport = new ToggleSubPageSupport({
  classOpen: ['subpage--opened'],
});
const toggleSubPageApplication = new ToggleSubPageApplication({
  classOpen: ['subpage--opened'],
});
const toggleModalPageSubscription = new ToggleModalPageSubscription({
  classOpen: ['subpage--opened'],
});
const toggleSubPageEditUser = new ToggleSubPageEditUser({
  classOpen: ['subpage--opened'],
});
const toggleThirdPageAddinsCard = new ToggleThirdPageAddinsCard({
  classOpen: ['third-page--opened--addins'],
});
const toggleModalPageReviewOrder = new ToggleModalPageReviewOrder({
  classOpen: ['modal-page-order-review--opened'],
});
const toggleModalPageOrderHistory = new ToggleModalPageOrderHistory({
  classOpen: ['modal-page-order-history--opened'],
});


const searchClassMethod = new Search();
const balancePage = new BalancePage();
const toggleOrder = new ToggleOrder();
const toggleReward = new ToggleReward();
const storesPage = new StoresPage({
  api,
  classOpen: ['modal-page--opened'],
});
const toggleModal = new ToggleModal();
const mainPage = new MainPage({ api });
const togglePage = new TogglePage({
  classOpen: ['page--opened--bottom-bar', 'page--opened'],
});
const togglePageOrderCard = new TogglePageOrderCard({
  classOpen: ['page-order--opened--bottom-bar', 'page-order--opened'],
});
const toggleSubPage = new ToggleSubPage({
  classOpen: ['subpage--opened--bottom-bar', 'subpage--opened'],
});
const toggleThirdPage = new ToggleThirdPage({
  classOpen: ['third-page--opened'],
});
const toggleFourthPage = new ToggleFourthPage({
  classOpen: ['fourth-page--opened'],
});
const toggleFifthPage = new ToggleFifthPage({
  classOpen: ['fifth-page--opened'],
});
const toggleSixthPage = new ToggleSixthPage({
  classOpen: ['sixth-page--opened'],
});
/* const toggleModalPage = new ToggleModalPageStores({
  classOpen: ['modal-page--open'],
}); */
const toggleModalPageSearch = new ToggleModalPageSearch({
  classOpen: ['modal-page-search--opened'],
});
const toggleModalPageOrderReview = new ToggleModalPageOrderReviewRoot({
  classOpen: ['modal-page-order-review--opened'],
});
const toggleModalPageOrderPayment = new ToggleModalPageOrderHistoryRoot({
  classOpen: ['modal-page-order-payment--opened'],
});
const toggleModalPageSignIn = new ToggleModalPageSignIn({
  classOpen: ['modal-page-sign-in--opened'],
  api,
});
const togglePageBalanceFill = new TogglePageBalanceFill({
  classOpen: ['page--opened'],
});
const inboxPage = new InboxPage({
  classOpen: ['page--opened'],
});
const accountPage = new AccountPage({
  classOpen: ['page--opened'],
});
const Navigation = new CreateNavigation({
  style: '',
  eventOpenBalancePage: [
    {
      type: 'click',
      callback: () => {
        closePages();
        const balanceButton = document.querySelector('.main-panel__button--type--balance');
        balanceButton.click();
      },
    },
  ],
  eventOpenHistoryPage: [
    {
      type: 'click',
      callback: () => {
        closePages();
        setTimeout(() => {
          api.getClientOrdersApi(toggleModalPageOrderHistory.rendering);
        }, 100);
      },
    },
  ],
  eventOpenMainPage: [
    {
      type: 'click',
      callback: () => {
        closePages();
        const mainButton = document.querySelector('.main-panel__button--type--main');
        mainButton.click();
      },
    },
  ],
  eventOpenInboxPage: [
    {
      type: 'click',
      callback: () => {
        closePages();
        const inboxButton = document.querySelector('.main-panel__button--type--messages');
        inboxButton.click();
      },
    },
  ],
  eventOpenProfilePage: [
    {
      type: 'click',
      callback: () => {
        closePages();
        const profileButton = document.querySelector('.main-panel__button--type--profile');
        profileButton.click();
      },
    },
  ],
  eventOpenStoresPage: [
    {
      type: 'click',
      callback: () => {
        storesPage.openPage(true);
        closePages();
      },
    },
  ],
  eventOpenBasketPage: [
    {
      type: 'click',
      callback: () => {
        stopAction(() => {
          toggleModalPageReviewOrder.rendering();
        });
      },
    },
  ],
  eventOpenSubscriptionPage: [
    {
      type: 'click',
      callback: () => {
        stopAction(() => {
          toggleModalPageSubscription.rendering();
        });
      },
    },
  ],
});

function closeOrderPage() {
  const pagesOrder = document.querySelectorAll('.page-order');
  [...pagesOrder].forEach((item) => {
    item.classList.remove('page-order--opened--bottom-bar');
  });
}

const mainPageTopBar = new CreateTopBar({
  selector: ['div'],
  style: ['header'],
  modifier: [
    '--main',
    `${isIos ? '--ios' : ''}`,
  ],
  eventOpenBasket: [{
    type: 'click',
    callback: () => {
      stopAction(() => {
        if (!isEmptyObj(userStore)) {
          stopAction(() => {
            toggleModalPageReviewOrder.rendering();
          });
        } else {
          storesPage.openPage();
        }
      });
    },
  }],
  /* eventOpenMenu: [{
    type: 'click',
    callback: Navigation.toggle,
  }], */
});
const mainPageFooter = new CreateFooter({
  selector: ['div'],
  style: ['footer'],
  eventOpenMainPage: [
    {
      type: 'click',
      callback: () => {
        closePages();
        mainPage.openPage();
      },
    },
  ],
  eventOpenBalancePage: [
    {
      type: 'click',
      callback: () => {
        closePages();
        balancePage.openPage();
      },
    },
  ],
  eventOpenMessagesPage: [
    {
      type: 'click',
      callback: () => {
        inboxPage.refreshData();
        inboxPage.openPage();
        closePages();
      },
    },
  ],
  eventOpenProfilePage: [
    {
      type: 'click',
      callback: () => {
        accountPage.openPage();
        closePages();
      },
    },
  ],
  eventOpenStoresPage: [
    {
      type: 'click',
      callback: () => {
        storesPage.openPage(true);
        closePages();
      },
    },
  ],
});

function renderMain() {
  mainPageEl.prepend(mainPageTopBar.create());
  api.promoApi(mainPage.rendering);
  balancePage.rendering();
  storesPage.rendering();
  inboxPage.rendering();
  accountPage.rendering();
  toggleInboxTabMessagesContent.rendering();

  mainPageEl.after(Navigation.create());
  mainPageEl.after(mainPageFooter.create());
  // switchActiveFooter();
  initMainPanel();
  initTopMenu();

  if (/\?refer=alfa.*/.test(window.location.search)) {
    const win = window.open('about:blank', '_self');
    win.close();
  }

  (function renderHashOrderCategoryPage() {
    const buttonMain = document.querySelector('.main-panel__button--type--main');

    setTimeout(() => {
      buttonMain.dispatchEvent(new Event('click')); // рендерит страницу
      if (!isEmptyObj(userInfoObj)) {
        toggleModalPageSignIn.rendering();
        toggleModalPageSignIn.regSuccess({ success: true, isStartApp: true, name: userInfoObj.successData.name });
      }
    }, 2000);
  }());

  setTimeout(() => {
    const loader = document.querySelector('.loader');
    if (loader) {
      loader.classList.add('loader--hide');
      loader.remove();
    }
    initSliders();
    checkStore();
  }, 5000);
}

// api.sendDebugMessage(`${JSON.stringify(basketArray)}`);
