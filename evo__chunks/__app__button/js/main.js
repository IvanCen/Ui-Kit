function addEventListenerButton(item) {
    const buttonActive = 'button--active';
    item.addEventListener('click', function () {
        this.focus();
    });
    item.addEventListener('focus', function () {
        this.classList.add(buttonActive);
        this.innerText = this.innerText + '';
    });
    item.addEventListener('blur', function () {
        this.classList.remove(buttonActive);
    });
}

function activeButton() {
    const buttonThemeTangerinTransparent = document.querySelectorAll('.button--theme--tangerin-transparent');
    const buttonThemeLight = document.querySelectorAll('.button--theme--light');
    const buttonThemeTangerin = document.querySelectorAll('.button--theme--tangerin');
    const buttonThemeDarkTransparent = document.querySelectorAll('.button--theme--dark-transparent');
    const buttonThemeOrangesTransparent = document.querySelectorAll('.button--theme--oranges-transparent');
    const arrButton = [
        ...buttonThemeTangerinTransparent,
        ...buttonThemeLight,
        ...buttonThemeTangerin,
        ...buttonThemeDarkTransparent,
        ...buttonThemeOrangesTransparent
    ];
    let doubleTouchStartTimestamp = 0;
    document.addEventListener("touchstart", {passive: false}, function (event) {
        let now = +(new Date());
        if (doubleTouchStartTimestamp + 500 > now) {
            event.preventDefault();
        }
        doubleTouchStartTimestamp = now;
    });

    [...arrButton].forEach(item => {
        addEventListenerButton(item);
    })
}

function buttonCreate(parameters) {

    if (typeof parameters !== 'object') {
        parameters = {};
    }

    const button = document.createElement('button');
    button.classList.add('button');

    if (typeof parameters['styles'] === 'object') {

        for (let style of parameters['styles']) {
            button.classList.add(style);
        }

    }

    if (typeof parameters['events'] === 'object') {

        for (let event of parameters['events']) {
            button.addEventListener(event['type'], event['callback']);
            button.addEventListener(event['type'], event['callback']);
        }

    }

    if (typeof parameters['text'] === 'object') {
        button.textContent = parameters['text']
    }

    addEventListenerButton(button);

    return button;
}



