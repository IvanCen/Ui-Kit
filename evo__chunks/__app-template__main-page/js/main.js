const mainPage = document.querySelector('.main-page');
const mainPageContent = document.querySelector('.main-page__content');
const body = document.querySelector('body');
/*
Универсальная функция создания
*/

/*function createItem(parameters) {
    if (typeof parameters !== 'object') {
        parameters = {};
    }

    const element = document.createElement(parameters['tagName']);

    if (typeof parameters['styles'] === 'object') {
        for (let style of parameters['styles']) {
            element.classList.add(style);
        }
    }

    if (typeof parameters['template'] === 'object') {
        element.insertAdjacentHTML('beforeend', parameters['template']);
    }

    if (typeof parameters['text'] === 'object') {
        element.textContent = parameters['text']
    }

    if (typeof parameters['events'] === 'object') {

        for (let event of parameters['events']) {
            element.addEventListener(event['type'], event['callback']);
        }

    }

    return element;
}*/


function toggleSignInPage() {
    body.append(createPage());
    const page = document.querySelector('.page');

    function deletePage() {
        setTimeout(() => page.remove(), 200);

    }

    function closePage() {
        page.classList.remove('page--opened');
        body.classList.remove('body');
    }

    function openPage() {
        setTimeout(() => {
            page.classList.add('page--opened');
            body.classList.add('body');
        }, 100);

    }

    function renderSubPage() {
        const signInTopBar = createTopBarSignIn({
            styles: ['top-bar', 'top-bar--size--small'],
            textTitle: ['Sign in to Rewards'],
            events: [
                {type: 'click', callback: closePage},
                {type: 'click', callback: deletePage}
            ],
        });
        const formInputSignIn = createFormInputSignIn({
            styles: ['form'],
            events: [
                {type: 'click', callback: closePage},
                {type: 'click', callback: deletePage}
            ],
        });

        page.append(signInTopBar);
        page.append(formInputSignIn);
        inputFlyLabel();
        inputVisibleTogglePass();
        validation();
    }

    renderSubPage();
    openPage();

}

(function renderMainPage() {
    const mainPageTopBar = createTopBar({
        events: [
            //{type: ['click', 'touchstart'], callback: toggleSignInPage},
            {type: 'click', callback: toggleSignInPage}
        ],
        textTitle: ['Отличный день для кофе ☕'],
    });

    const mainPageTitleBar = createTitleBar({
        styles: ['title-bar__title',
            'title-bar__title--size--small',
        ],
        text: ['starbucks rewards'],
    });

    const mainPageSwiper = createSwiper();
    const mainPageMainCard = createMainCard();
    const mainPageFooter = createFooter();

    const mainPageButtonJoinDark = buttonCreate(
        {
            styles: ['button--size--small',
                'button--theme--dark-transparent',
                'button--indentation--left',
            ],
            text: ['Join Now'],
        }
    )

    const mainPageButtonJoinOrange = buttonCreate({
            styles: ['button--size--big',
                'button--theme--tangerin',
                'button--indentation--bottom',
                'button--indentation--right',
                'button--position--right',
                'button--theme--shadow-big',
            ],
            events: [{type: 'click', callback: toggleSignInPage}],
            text: ['Join Now'],
            //events: [{type: 'click', callback: toggleSignInPage}],
        }
    )

    mainPage.prepend(mainPageSwiper);
    mainPage.prepend(mainPageTitleBar);
    mainPage.prepend(mainPageTopBar);
    mainPageContent.append(mainPageButtonJoinDark);
    mainPageContent.append(mainPageMainCard);
    mainPageContent.append(mainPageButtonJoinOrange);
    mainPage.append(mainPageFooter);

    const swiper = new Swiper('.swiper', {
        slidesPerView: 'auto',
        spaceBetween: 16,
    });

    switchActiveFooter();
    activeButton();

})();


function switcherPages(deletePage, switchPage) {
    deletePage.remove();
    switchPage();
}


//switcherPages(page, renderSubPage);


