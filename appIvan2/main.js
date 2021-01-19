let transactions = [];
transactions = new Proxy(transactions, {
    // get(target, prop) {
    //     if (prop in target) {
    //         return target[prop];
    //     } else {
    //         return ''; // значение по умолчанию
    //     }
    // },
    set(target, prop, val) { // для перехвата записи свойства
        if (typeof val == 'object') {
            target[prop] = val;
            // let sell = document.createElement('div');
            // sell.classList.add('sells__sell');
            // sell.addEventListener('click',()=>{
            //     if(typeof sells[0] === "object"){
            //         sells.push(sells[0]);
            //     }
            // });
            // sell.insertAdjacentHTML("afterbegin", `<div class="sells__sell-picture">${prop}</div>
            //                         <div class="sells__sell-title">${val.title}</div>
            //                         <div class="sells__sell-text">${val.text}</div>`);
            // sellsListWrapperElement.appendChild(sell);
        } else {
            // например для массива тут будет устанавливаться свойство length, в таком случае нам не нужно добавлять транзакцию
            target[prop] = val;
        }
        return true;
    },
});


/*
 * Акции
 */
let sells = [];
let sellsListWrapperElement = document.querySelector('.sells__list-wrapper');
sells = new Proxy(sells, {
    // get(target, prop) {
    //     if (prop in target) {
    //         return target[prop];
    //     } else {
    //         return ''; // значение по умолчанию
    //     }
    // },
    set(target, prop, val) { // для перехвата записи свойства
        if (typeof val == 'object') {
            target[prop] = val;
            let sell = document.createElement('div');
            sell.classList.add('sells__sell');
            sell.addEventListener('click',()=>{
                if(typeof sells[0] === "object"){
                    sells.push(sells[0]);
                }
            });
            sell.insertAdjacentHTML("afterbegin", `<div class="sells__sell-picture">${prop}</div>
                                    <div class="sells__sell-title">${val.title}</div>
                                    <div class="sells__sell-text">${val.text}</div>`);
            sellsListWrapperElement.appendChild(sell);
        } else {
            // например для массива тут будет устанавливаться свойство length, в таком случае нам не нужно добавлять акцию
            target[prop] = val;
        }
        return true;
    },
});
for(let i=0; i<5; i++){
    sells.push({
        id: i,
        picture: '',
        title: 'Осеннее меню',
        text: 'Кликни на акцию, чтобы добавить еще одну акцию',
    });
}



/*
 * Модальное окно
 */
let modalBlocks = document.querySelectorAll('.modal');
let modalBlockHiddenClass = 'modal--hidden';
for(let modalBlock of modalBlocks){
    modalBlock.addEventListener('click', () => {
        modalBlock.classList.add(modalBlockHiddenClass);
    });

    let modalBlockContent = modalBlock.querySelector('.modal__content');
    if(modalBlockContent){
        modalBlockContent.addEventListener('click',(event)=>{
            event.stopPropagation();
        });
    }
    let modalBlockSkipButton = modalBlock.querySelector('.modal__button--skip');
    if(modalBlockSkipButton){
        modalBlockSkipButton.addEventListener('click',()=>{
            modalBlock.classList.add(modalBlockHiddenClass);
        })
    }
}



/*
 * Страничка баланса
 */
let balancePageElement = document.querySelector('.balance-page');
let balancePageElementStateObserver = new MutationObserver((mutationRecords)=>{
    const balancePageClassPrefix = 'balance-page--';
    balancePageElement.classList.remove(balancePageClassPrefix+mutationRecords[0].oldValue);
    balancePageElement.classList.add(balancePageClassPrefix+mutationRecords[0].target.attributes['data-state'].value.toString());
});
balancePageElementStateObserver.observe(balancePageElement, {
    childList: false, // не наблюдать за непосредственными детьми
    subtree: false, // не наблюдать за более глубокими потомками
    attributes: true, // наблюдать за атрибутами
    attributeFilter: ['data-state'], // указываем конкретные атрибуты
    attributeOldValue: true // передавать старое значение в колбэк
});
let balancePageButtons = balancePageElement.querySelectorAll('.header-nav__button');
for(let button of balancePageButtons){
    button.addEventListener('click', () => {
        balancePageElement.setAttribute('data-state',button.getAttribute('data-href'));
    });
}
/*
 * Страничка сообщений
 */
let messagesPageElement = document.querySelector('.messages-page');
let messagesPageElementStateObserver = new MutationObserver((mutationRecords)=>{
    const messagesPageClassPrefix = 'messages-page--';
    messagesPageElement.classList.remove(messagesPageClassPrefix+mutationRecords[0].oldValue);
    messagesPageElement.classList.add(messagesPageClassPrefix+mutationRecords[0].target.attributes['data-state'].value.toString());
});
messagesPageElementStateObserver.observe(messagesPageElement, {
    childList: false, // не наблюдать за непосредственными детьми
    subtree: false, // не наблюдать за более глубокими потомками
    attributes: true, // наблюдать за атрибутами
    attributeFilter: ['data-state'], // указываем конкретные атрибуты
    attributeOldValue: true // передавать старое значение в колбэк
});
let messagesPageButtons = messagesPageElement.querySelectorAll('.header-nav__button');
for(let button of messagesPageButtons){
    button.addEventListener('click', () => {
        messagesPageElement.setAttribute('data-state',button.getAttribute('data-href'));
    });
}




let mainBlockElement = document.querySelector('.main-block');
let mainBlockElementStateObserver = new MutationObserver((mutationRecords)=>{
    const mainBlockClassPrefix = 'main-block--';
    mainBlockElement.classList.remove(mainBlockClassPrefix+mutationRecords[0].oldValue);
    mainBlockElement.classList.add(mainBlockClassPrefix+mutationRecords[0].target.attributes['data-state'].value.toString());
});
mainBlockElementStateObserver.observe(mainBlockElement, {
    childList: false, // не наблюдать за непосредственными детьми
    subtree: false, //  не наблюдать за более глубокими потомками
    attributes: true, // наблюдать за атрибутами
    attributeFilter: ['data-state'], // указываем конкретные атрибуты
    attributeOldValue: true // передавать старое значение в колбэк
});

let bottomNavigationButtons = document.querySelectorAll('.bottom-navigation__button');
for(let button of bottomNavigationButtons){
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        mainBlockElement.setAttribute('data-state',button.getAttribute('data-href'));
    });
}

let homePageBurgerElement = document.querySelector('.home-page__burger');
let homeMenuElement = document.querySelector('.home-menu');
homePageBurgerElement.addEventListener('click',()=>{
    homeMenuElement.classList.remove('home-menu--hidden');
});
homeMenuElement.addEventListener('click',()=>{
    homeMenuElement.classList.add('home-menu--hidden');
});

let needAlertBlockButtons = document.querySelectorAll('.need-alert-block__button');
for( let needAlertBlockButton of needAlertBlockButtons){
    needAlertBlockButton.addEventListener('click', ()=>{
        document.querySelector('html').classList.add('--is-logged');
    });
}
