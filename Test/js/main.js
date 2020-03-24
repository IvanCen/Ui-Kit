/**
 *
 * @param id
 * @param count
 */
function buy_form_set_value_for_items( id, count ) {
    let classForFind = 'buy-form--id-' + id;
    let elementsWithThisId = document.querySelectorAll( '.' + classForFind );
    let elementsWithThisIdLength = elementsWithThisId.length;
    if( elementsWithThisIdLength ) {
        elementsWithThisId.forEach( function ( element ) {
            if ( count >= 0 ) {
                let valueControl = element.querySelector( '.buy-form__value' );
                valueControl.innerText = count;
                valueControl.setAttribute('value', count);
            }
        } );
    }
}

/**
 *
 * @param item
 * @param count
 */
function buy_form_add_to_basket(item,count) {
        (async () => {
            let rawResponse = await fetch('[~96~]', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ajax_actions:{
                        basket: {
                            add: {
                                item: item,
                                count: count,
                            },
                            'return': 'basket'
                        }
                    }
                })
            });
            let basket = await rawResponse.json();
            if(basket){
                for( let element of Object.values(basket)){
                    if(element.toppings.length == 0){
                        buy_form_set_value_for_items(element.item,element.count);
                    }
                    update_small_basket_count(true);
                }
            }
        })();
}

/**
 *
 * @param element
 * @param add
 */
function buy_form_add_or_remove_one_item( element, add ){
    let buyForm = element.closest( '.buy-form' );
    let id = buyForm.getAttribute( 'data-id' );
    let valueElement = buyForm.querySelector( '.buy-form__value' );
    let value = parseInt( valueElement.innerText );
    if( add ) {
        buy_form_add_to_basket(id,1);
        value++;
    }
    else{
        buy_form_add_to_basket(id,-1);
        value--;
    }
    buy_form_set_value_for_items(id,value);
}

/**
 *
 */
function buy_form_events(  ) {
    let elements = document.querySelectorAll( '.buy-form' );
    let mutationConfig = {
        attributes: true,
        childList: false,
        subtree: false,
        characterData: false,
        characterDataOldValue: false
    };
    elements.forEach( function ( element ) {
        let minusButton = element.querySelector( '.buy-form__control--minus' );
        let plusButton = element.querySelector( '.buy-form__control--plus' );
        let valueElement = element.querySelector( '.buy-form__value' );
        let addButton = element.querySelector( '.buy-form__buy-button' );
        let controls = element.querySelector( '.buy-form__controls' );

        controls.addEventListener( 'click', function (event) {
            event.stopPropagation();
        });

        minusButton.addEventListener( 'click', function (event) {
            event.preventDefault();
            event.stopPropagation();
            buy_form_add_or_remove_one_item(this, false);
        });
        plusButton.addEventListener( 'click', function (event) {
            event.preventDefault();
            event.stopPropagation();
            buy_form_add_or_remove_one_item(this, true);
        });
        addButton.addEventListener( 'click', function (event) {
            event.preventDefault();
            event.stopPropagation();
            buy_form_add_or_remove_one_item(this, true);
        });

        let observer = new MutationObserver(function(elements){
            for( element of elements ) {

                let className = 'buy-form--empty';
                let buyForm = element.target.closest( '.buy-form' );

                let value = element.target.getAttribute('value');
                value = parseInt( value );

                if ( value > 0 ) {
                    buyForm.classList.remove( className );
                }
                else {
                    buyForm.classList.add( className );
                }

            }
        });
        observer.observe(valueElement, mutationConfig);
    } );
}

if ( document.readyState === 'loading' ) {

    document.addEventListener('DOMContentLoaded',() => {
        buy_form_events();
    });
}
else {
    buy_form_events();
}