const mainPage = document.querySelector('.main-page');
const body = document.querySelector('body');

const toggleOrderMenuContent = new ToggleOrderMenuContent();
const toggleOrderHitsContent = new ToggleOrderHitsContent();
const toggleOrderHistoryContent = new ToggleOrderHistoryContent();
const toggleOrderFavoriteContent = new ToggleOrderFavoriteContent();

const togglePageSignIn = new TogglePageSignIn({
  classOpen: ['page--opened'],
});
const togglePageSeeAll = new TogglePageSeeAll({
  classOpen: ['page--opened'],
});
const toggleSubPageProductCard = new ToggleSubPageProductCard({
  classOpen: ['subpage--opened--bottom-bar'],
});
const toggleSubPageGiftCard = new ToggleSubPageGiftCard({
  classOpen: ['subpage--opened'],
});
const togglePageOrderCategory = new TogglePageOrderCategory({
  classOpen: ['page--opened--bottom-bar'],
});
const toggleCards = new ToggleCards();
const toggleOrder = new ToggleOrder();
const toggleGift = new ToggleGift();
const toggleStores = new ToggleStores();
const toggleModal = new ToggleModal();
const renderMainPage = new ToggleMain();
const togglePage = new TogglePage({
  classOpen: ['page--opened--bottom-bar', 'page--opened'],
});
const toggleSubPage = new ToggleSubPage({
  classOpen: ['subpage--opened--bottom-bar', 'subpage--opened'],
});


renderMainPage.rendering();

const mainPageFooter = new CreateFooter({
  selector: ['div'],
  style: ['footer'],
  eventOpenMainPage: [
    { type: 'click', callback: renderMainPage.clearPage },
    { type: 'click', callback: renderMainPage.rendering },
    { type: 'click', callback: togglePage.closePage },
    { type: 'click', callback: togglePage.deletePage },
    { type: 'click', callback: toggleSubPage.closePage },
    { type: 'click', callback: toggleSubPage.deletePage },
  ],
  eventOpenCardsPage: [
    { type: 'click', callback: toggleCards.clearPage },
    { type: 'click', callback: toggleCards.rendering },
    { type: 'click', callback: togglePage.closePage },
    { type: 'click', callback: togglePage.deletePage },
    { type: 'click', callback: toggleSubPage.closePage },
    { type: 'click', callback: toggleSubPage.deletePage },
  ],
  eventOpenOrderPage: [
    { type: 'click', callback: toggleOrder.clearPage },
    { type: 'click', callback: toggleOrder.rendering },
    { type: 'click', callback: toggleOrderMenuContent.rendering },
    { type: 'click', callback: togglePage.closePage },
    { type: 'click', callback: togglePage.deletePage },
    { type: 'click', callback: toggleSubPage.closePage },
    { type: 'click', callback: toggleSubPage.deletePage },
  ],
  eventOpenGiftPage: [
    { type: 'click', callback: toggleGift.clearPage },
    { type: 'click', callback: toggleGift.rendering },
    { type: 'click', callback: togglePage.closePage },
    { type: 'click', callback: togglePage.deletePage },
    { type: 'click', callback: toggleSubPage.closePage },
    { type: 'click', callback: toggleSubPage.deletePage },
  ],
  eventOpenStoresPage: [
    { type: 'click', callback: toggleStores.clearPage },
    { type: 'click', callback: toggleStores.rendering },
    { type: 'click', callback: togglePage.closePage },
    { type: 'click', callback: togglePage.deletePage },
    { type: 'click', callback: toggleSubPage.closePage },
    { type: 'click', callback: toggleSubPage.deletePage },
  ],
});

mainPage.append(mainPageFooter.create());
switchActiveFooter();
