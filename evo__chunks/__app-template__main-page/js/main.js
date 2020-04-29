const mainPage = document.querySelector('.main-page');
const body = document.querySelector('body');

const toggleOrderContent = new ToggleOrderContent();
const togglePageSignIn = new TogglePageSignIn({
  classOpen: ['page--opened'],
});
const toggleSubPageProductCard = new ToggleSubPageProductCard({
  classOpen: ['subpage--opened--bottom-bar'],
});
const togglePageOrderCategory = new TogglePageOrderCategory({
  classOpen: ['page--opened--bottom-bar'],
});
const toggleCards = new ToggleCards();
const toggleOrder = new ToggleOrder();
const renderMainPage = new ToggleMain();


renderMainPage.rendering();

const mainPageFooter = new CreateFooter({
  selector: ['div'],
  style: ['footer'],
  eventOpenMainPage: [
    { type: 'click', callback: renderMainPage.clearPage },
    { type: 'click', callback: renderMainPage.rendering },
    { type: 'click', callback: togglePageOrderCategory.closePage },
    { type: 'click', callback: togglePageOrderCategory.deletePage },
    { type: 'click', callback: toggleSubPageProductCard.closePage },
    { type: 'click', callback: toggleSubPageProductCard.deletePage },
  ],
  eventOpenCardsPage: [
    { type: 'click', callback: toggleCards.clearPage },
    { type: 'click', callback: toggleCards.rendering },
    { type: 'click', callback: togglePageOrderCategory.closePage },
    { type: 'click', callback: togglePageOrderCategory.deletePage },
    { type: 'click', callback: toggleSubPageProductCard.closePage },
    { type: 'click', callback: toggleSubPageProductCard.deletePage },
  ],
  eventOpenOrderPage: [
    { type: 'click', callback: toggleOrder.clearPage },
    { type: 'click', callback: toggleOrder.rendering },
    { type: 'click', callback: togglePageOrderCategory.closePage },
    { type: 'click', callback: togglePageOrderCategory.deletePage },
    { type: 'click', callback: toggleSubPageProductCard.closePage },
    { type: 'click', callback: toggleSubPageProductCard.deletePage },
  ],
});

mainPage.append(mainPageFooter.create());
switchActiveFooter();
