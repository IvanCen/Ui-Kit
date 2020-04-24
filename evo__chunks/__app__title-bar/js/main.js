function createTitleBar(parameters) {

    if (typeof parameters !== 'object') {
        parameters = {};
    }

    const element = document.createElement('h2');
    element.classList.add('title-bar')

    if (typeof parameters['styles'] === 'object') {

        for (let style of parameters['styles']) {
            element.classList.add(style);
        }

    }

    if (typeof parameters['text'] === 'object') {
        element.textContent = parameters['text']
    }

    return element;
}


