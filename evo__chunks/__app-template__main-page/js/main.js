const mainPage = document.querySelector('.main-page');
mainPage.classList.add('main-page--loaded');
const body = document.querySelector('body');
const api = new Api();
let returnPage;
let orderInfo;
let orderPayInfo;
let orderComment;
let userMessages;
const itemsArray = JSON.parse(localStorage.getItem('items')) || [];
const basketArray = JSON.parse(localStorage.getItem('basket')) || [];
const userDataObj = JSON.parse(localStorage.getItem('userData')) || {};
const applicationDataObj = JSON.parse(localStorage.getItem('applicationData')) || {};
const storesDataObj = JSON.parse(localStorage.getItem('storesData')) || {};
const userInfoObj = JSON.parse(localStorage.getItem('userInfo')) || {};
const userLastOrdersObj = JSON.parse(localStorage.getItem('userLastOrders')) || {};
const userStore = JSON.parse(localStorage.getItem('userStore')) || {};
const userBalanceLog = JSON.parse(localStorage.getItem('userBalanceLog')) || {};
const userBonusLog = JSON.parse(localStorage.getItem('userBonusLog')) || {};
const dataProductApi = JSON.parse(localStorage.getItem('productData')) || {};
const userFavoriteStore = JSON.parse(localStorage.getItem('userFavoriteStore')) || {};
const outOfStock = JSON.parse(localStorage.getItem('outOfStock')) || {};


/* if (isEmptyObj(storesDataObj)) {
  api.storesApi();
} else if ((Date.now() - storesDataObj.lastEditDateRequest) > (24 * 60 * 60 * 1000)) {
  api.storesApi();
} */
api.storesApi(); // пока каждый раз вызываем при старте

if (isEmptyObj(applicationDataObj)) {
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

api.getClientApi();
api.productApi();
api.getClientOrdersApi();
api.getMessages();

const toggleOrderMenuContent = new ToggleOrderMenuContent({ api });
const toggleOrderHitsContent = new ToggleOrderHitsContent({ api });
const toggleOrderHistoryContent = new ToggleOrderHistoryContent();
const toggleOrderFavoriteContent = new ToggleOrderFavoriteContent();

const toggleInboxTabMessagesContent = new ToggleInboxTabMessagesContent();
const toggleInboxTabLastOffersContent = new ToggleInboxTabLastOffersContent();

const togglePageSeeAll = new TogglePageSeeAll({
  classOpen: ['page--opened'],
});
const togglePageStoresSearch = new TogglePageStoresSearch({
  classOpen: ['modal-page-search--opened'],
});
const toggleFifthPageOrderSearch = new ToggleFifthPageOrderSearch({
  classOpen: ['fifth-page--opened'],
});
const toggleSubPageStoresDetails = new ToggleSubPageStoresDetails({
  classOpen: ['subpage--opened'],
});
const toggleSubPageAccountEditUser = new ToggleSubPageAccountEditUser({
  classOpen: ['subpage--opened'],
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
const toggleSubPageApplication = new ToggleSubPageApplication({
  classOpen: ['subpage--opened'],
});
const toggleThirdPageEditUser = new ToggleThirdPageEditUser({
  classOpen: ['third-page--opened'],
});
const toggleThirdPageAddinsCard = new ToggleThirdPageAddinsCard({
  classOpen: ['third-page--opened--bottom-bar'],
});
const toggleFourthPageReviewOrder = new ToggleFourthPageReviewOrder({
  classOpen: ['fourth-page--opened'],
});
const toggleFifthPageReviewOrder = new ToggleFifthPageReviewOrder({
  classOpen: ['fifth-page--opened'],
});
const toggleSixthPageReviewOrder = new ToggleSixthPageReviewOrder({
  classOpen: ['sixth-page--opened'],
});


const searchClassMethod = new Search();
const toggleBalance = new ToggleBalance();
const toggleOrder = new ToggleOrder();
const toggleGift = new ToggleGift();
const toggleStores = new ToggleStores({
  api,
  classOpen: ['modal-page--opened'],
});
const toggleModal = new ToggleModal();
const renderMainPage = new ToggleMain({ api });
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
const toggleModalPage = new ToggleModalPageStores({
  classOpen: ['modal-page--opened'],
});
const toggleModalPageSearch = new ToggleModalPageSearch({
  classOpen: ['modal-page-search--opened'],
});
const togglePageSignIn = new TogglePageSignIn({
  classOpen: ['page--opened'],
  api,
});
const togglePageBalanceFill = new TogglePageBalanceFill({
  classOpen: ['page--opened'],
});
const togglePageInbox = new TogglePageInbox({
  classOpen: ['page--opened'],
});
const togglePageAccount = new TogglePageAccount({
  classOpen: ['page--opened'],
});

function closeOrderPage() {
  const pagesOrder = document.querySelectorAll('.page-order');
  [...pagesOrder].forEach((item) => {
    item.classList.remove('page-order--opened--bottom-bar');
  });
}

const mainPageFooter = new CreateFooter({
  selector: ['div'],
  style: ['footer'],
  eventOpenMainPage: [
    {
      type: 'click',
      callback: () => {
        stopAction(() => {
          renderMainPage.closePage();
          renderMainPage.clearPage();
          renderMainPage.rendering();
          renderMainPage.openPage();
          closePages();
        });
      },
    },
  ],
  eventOpenCardsPage: [
    {
      type: 'click',
      callback: () => {
        toggleBalance.closePage();
        toggleBalance.clearPage();
        toggleBalance.rendering();
        toggleBalance.openPage();
        closePages();
      },
    },
  ],
  eventOpenOrderPage: [
    {
      type: 'click',
      callback: () => {
        toggleOrder.closePage();
        toggleOrder.clearPage();
        toggleOrder.rendering();
        toggleOrder.openPage();
        toggleOrderMenuContent.rendering();
        toggleOrderHitsContent.rendering();
        toggleOrderHistoryContent.rendering();
        closePages();
      },
    },
  ],
  eventOpenGiftPage: [
    {
      type: 'click',
      callback: () => {
        toggleGift.closePage();
        toggleGift.clearPage();
        toggleGift.rendering();
        toggleGift.openPage();
        closePages();
      },
    },
  ],
  eventOpenStoresPage: [
    {
      type: 'click',
      callback: () => {
        toggleStores.closePage();
        toggleStores.clearPage();
        toggleStores.rendering();
        toggleStores.openPage();
        closePages();
      },
    },
  ],
});

mainPage.append(mainPageFooter.create());
switchActiveFooter();
checkBasket();

if (/\?refer=alfa.*/.test(window.location.search)) {
  const win = window.open('about:blank', '_self');
  win.close();
}

(function renderHashOrderCategoryPage() {
  const buttonMain = document.querySelector('.footer__button--type--main');
  const buttonOrder = document.querySelector('.footer__button--type--order');
  buttonOrder.dispatchEvent(new Event('click'));
  Array.from(document.querySelectorAll('.card-item--direction--row')).forEach((item) => {
    item.dispatchEvent(new Event('click'));

    document.querySelectorAll('.page-order').forEach((el) => {
      el.classList.add('page-order--hide');
    });
  });
  setTimeout(() => {
    buttonMain.dispatchEvent(new Event('click')); // рендерит страницу
  }, 2000);

  setTimeout(() => {
    document.querySelectorAll('.page-order').forEach((el) => {
      el.classList.remove('page-order--hide');
      el.classList.remove('page-order--opened--bottom-bar');
    });
  }, 3000);
}());
