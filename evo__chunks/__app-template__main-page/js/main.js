const mainPage = document.querySelector('.main-page');
const body = document.querySelector('body');
const api = new Api();
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
  classOpen: ['page--opened'],
});
const togglePageStoresDetails = new TogglePageStoresDetails({
  classOpen: ['page--opened'],
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
const toggleThirdPageAddinsCard = new ToggleThirdPageAddinsCard({
  classOpen: ['third-page--opened'],
});
const toggleFourthPageReviewOrder = new ToggleFourthPageReviewOrder({
  classOpen: ['fourth-page--opened'],
});
const togglePageStoresFilter = new TogglePageStoresFilter({
  classOpen: ['page--opened'],
});
const togglePageOrderCategoryAll = new TogglePageOrderCategoryAll({
  classOpen: ['page--opened--bottom-bar'],
});
const togglePageOrderCategory = new TogglePageOrderCategory({
  classOpen: ['page--opened--bottom-bar'],
});
const toggleCards = new ToggleCards();
const toggleOrder = new ToggleOrder();
const toggleGift = new ToggleGift();
const toggleStores = new ToggleStores({ api });
const toggleModal = new ToggleModal();
const renderMainPage = new ToggleMain({ api });
const togglePage = new TogglePage({
  classOpen: ['page--opened--bottom-bar', 'page--opened'],
});
const toggleSubPage = new ToggleSubPage({
  classOpen: ['subpage--opened--bottom-bar', 'subpage--opened'],
});
const toggleThirdPage = new ToggleThirdPage({
  classOpen: ['third-page--opened'],
});
const togglePageSignIn = new TogglePageSignIn({
  classOpen: ['page--opened'],
  api,
});
const togglePageInbox = new TogglePageInbox({
  classOpen: ['page--opened'],
});
const togglePageAccount = new TogglePageAccount({
  classOpen: ['page--opened'],
});

renderMainPage.rendering();

const mainPageFooter = new CreateFooter({
  selector: ['div'],
  style: ['footer'],
  eventOpenMainPage: [
    { type: 'click', callback: renderMainPage.closePage },
    { type: 'click', callback: renderMainPage.clearPage },
    { type: 'click', callback: renderMainPage.rendering },
    { type: 'click', callback: renderMainPage.openPage },
    { type: 'click', callback: togglePage.closePage },
    { type: 'click', callback: togglePage.deletePage },
    { type: 'click', callback: toggleSubPage.closePage },
    { type: 'click', callback: toggleSubPage.deletePage },
    { type: 'click', callback: toggleThirdPage.closePage },
    { type: 'click', callback: toggleThirdPage.deletePage },
  ],
  eventOpenCardsPage: [
    { type: 'click', callback: toggleCards.closePage },
    { type: 'click', callback: toggleCards.clearPage },
    { type: 'click', callback: toggleCards.rendering },
    { type: 'click', callback: toggleCards.openPage },
    { type: 'click', callback: togglePage.closePage },
    { type: 'click', callback: togglePage.deletePage },
    { type: 'click', callback: toggleSubPage.closePage },
    { type: 'click', callback: toggleSubPage.deletePage },
    { type: 'click', callback: toggleThirdPage.closePage },
    { type: 'click', callback: toggleThirdPage.deletePage },
  ],
  eventOpenOrderPage: [
    { type: 'click', callback: toggleOrder.closePage },
    { type: 'click', callback: toggleOrder.clearPage },
    { type: 'click', callback: toggleOrder.rendering },
    { type: 'click', callback: toggleOrder.openPage },
    { type: 'click', callback: toggleOrderMenuContent.rendering },
    { type: 'click', callback: toggleOrderHitsContent.rendering },
    { type: 'click', callback: toggleOrderHistoryContent.rendering },
    { type: 'click', callback: toggleOrderFavoriteContent.rendering },
    { type: 'click', callback: togglePage.closePage },
    { type: 'click', callback: togglePage.deletePage },
    { type: 'click', callback: toggleSubPage.closePage },
    { type: 'click', callback: toggleSubPage.deletePage },
    { type: 'click', callback: toggleThirdPage.closePage },
    { type: 'click', callback: toggleThirdPage.deletePage },
  ],
  eventOpenGiftPage: [
    { type: 'click', callback: toggleGift.closePage },
    { type: 'click', callback: toggleGift.clearPage },
    { type: 'click', callback: toggleGift.rendering },
    { type: 'click', callback: toggleGift.openPage },
    { type: 'click', callback: togglePage.closePage },
    { type: 'click', callback: togglePage.deletePage },
    { type: 'click', callback: toggleSubPage.closePage },
    { type: 'click', callback: toggleSubPage.deletePage },
    { type: 'click', callback: toggleThirdPage.closePage },
    { type: 'click', callback: toggleThirdPage.deletePage },
  ],
  eventOpenStoresPage: [
    { type: 'click', callback: toggleStores.closePage },
    { type: 'click', callback: toggleStores.clearPage },
    { type: 'click', callback: toggleStores.rendering },
    { type: 'click', callback: toggleStores.openPage },
    { type: 'click', callback: togglePage.closePage },
    { type: 'click', callback: togglePage.deletePage },
    { type: 'click', callback: toggleSubPage.closePage },
    { type: 'click', callback: toggleSubPage.deletePage },
    { type: 'click', callback: toggleThirdPage.closePage },
    { type: 'click', callback: toggleThirdPage.deletePage },
  ],
});
renderMainPage.openPage();
mainPage.append(mainPageFooter.create());
switchActiveFooter();
