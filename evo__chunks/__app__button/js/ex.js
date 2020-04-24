/**
 * @param parameters
 * @returns {HTMLButtonElement}
 */
function button_create(parameters) {

    if (typeof parameters !== 'object') {
        parameters = {};
    }

    let button = document.createElement('button');
    button.classList.add('button');


    if (typeof parameters['styles'] === 'object') {

        for (let style of parameters['styles']) {
            //button.classList.add('button--theme--'.style);
            button.classList.add('button--theme--'.style);
        }

    }

    if (typeof parameters['events'] === 'object') {

        for (let event of parameters['events']) {
            button.addEventListener(event['type'], event['callback']);
        }

    }

    return button;
}

/**
 * @param data
 */
function one_item_create_page(data) {

    let page = page_create();
    let header = header_create(data['data']);
    let itemBlock = one_item_create();
    let button = button_create(
        {
            styles: ['tangerin', 'dark-transparent']
        }
    );
    /*page.append( header );
    page.append( itemBlock );
    page.append( button );
    page_swap_to( page );*/

}
