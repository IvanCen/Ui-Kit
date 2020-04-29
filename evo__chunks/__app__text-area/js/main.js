class CreateTextAreaShareProductCard extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
    this.template = `
      <div class="text-area">
        <div class="text-area__container text-area__container--indentation--normal">
          <div class="text-area__content-container text-area__content-container--direction--column">
            <p class="text-area__text text-area__text--theme--shadow text-area__text--indentation--big">Contrary to popular belief, Lorem Ipsum is not simply
              random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
              Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure
              Latin words, consectetur, from a Lore</p>
            <button class="button text-area__button text-area__button--type--share">
              <img src="[+chunkWebPath+]/img/icon-upload.svg" alt=""
                   class="text-area__icon text-area__icon--position--center">
            </button>
            </div>
        </div>
      </div>
      <div class="text-area">
        <div class="text-area__container text-area__container--indentation--small">
          <h2 class="text-area__title text-area__title--size--small text-area__title--type--bold">Size</h2>
          <div class="text-area__icon-container">
            <button class="button button--theme--chocolate text-area__button text-area__button--type--size">
              Grande
            </button>
          </div>
        </div>
      </div>
      <div class="text-area">
        <div class="text-area__container text-area__container--indentation--small">
          <h2 class="text-area__title text-area__title--size--small text-area__title--type--bold">Add-ins</h2>
          <ul class="text-area__list">
            <li class="text-area__list-item"></li>
          </ul>
          <button class="button">
            <img src="[+chunkWebPath+]/img/icon-expand-direction-right.svg" alt="" class="text-area__icon text-area__icon--position--center">
          </button>
        </div>
      </div>
      <div class="text-area">
        <div class="text-area__container text-area__container--indentation--small">
          <div class="text-area__content-container text-area__content-container--direction--column">
            <h2 class="text-area__title text-area__title--size--small text-area__title--type--bold">Espresso & Shot Options</h2>
            <ul class="text-area__list">
              <li class="text-area__list-item">2 Shots</li>
            </ul>
          </div>
          <button class="button">
            <img src="[+chunkWebPath+]/img/icon-expand-direction-right.svg" alt="" class="text-area__icon text-area__icon--position--center">
          </button>
      </div>
    </div>
    <div class="text-area">
      <div class="text-area__container text-area__container--indentation--small">
        <div class="text-area__content-container text-area__content-container--direction--column">
          <h2 class="text-area__title text-area__title--size--small text-area__title--type--bold">Flavors</h2>
          <ul class="text-area__list">
            <li class="text-area__list-item">4 Pump(s) Smoked Butterscoth Sauce</li>
          </ul>
        </div>
        <button class="button">
          <img src="[+chunkWebPath+]/img/icon-expand-direction-right.svg" alt="" class="text-area__icon text-area__icon--position--center">
        </button>
      </div>
    </div>
    <div class="text-area">
      <div class="text-area__container text-area__container--indentation--small">
        <h2 class="text-area__title text-area__title--size--small text-area__title--type--bold">Tea</h2>
        <ul class="text-area__list">
            <li class="text-area__list-item"></li>
        </ul>
        <button class="button">
          <img src="[+chunkWebPath+]/img/icon-expand-direction-right.svg" alt="" class="text-area__icon text-area__icon--position--center">
        </button>
       </div>
     </div>  
     <div class="text-area">
       <div class="text-area__container text-area__container--indentation--small">
        <h2 class="text-area__title text-area__title--size--small text-area__title--type--bold">Toppings</h2>
        <ul class="text-area__list">
          <li class="text-area__list-item"></li>
        </ul>
        <button class="button">
          <img src="[+chunkWebPath+]/img/icon-expand-direction-right.svg" alt="" class="text-area__icon text-area__icon--position--center">
        </button>
       </div>
     </div>  
     <div class="text-area">
       <div class="text-area__container text-area__container--indentation--small">
        <h2 class="text-area__title text-area__title--size--small text-area__title--type--bold">Milk</h2>
        <ul class="text-area__list">
          <li class="text-area__list-item"></li>
        </ul>
        <button class="button">
          <img src="[+chunkWebPath+]/img/icon-expand-direction-right.svg" alt="" class="text-area__icon text-area__icon--position--center">
        </button>
       </div>
     </div> 
     <button class="text-area__button text-area__button--type--reset">reset recipe</button>
     <div class="text-area">
       <div class="text-area__container text-area__container--indentation--normal text-area__container--direction--column">
        <div class="text-area__content-container text-area__content-container--direction--row">
          <div class="text-area__text-container">
            <h2 class="text-area__title text-area__title--size--normal">Nutrition Information</h2>
            <span class="text-area__info-number text-area__info--text-size--normal text-area__info-number--addition--top">16 fl oz</span>
            <span class="text-area__info text-area__info--text-size--normal text-area__info--text-bold">
              Calories
             <span
                  class="text-area__info-number text-area__info--text-size--normal text-area__info-number--addition--left">5</span>
            </span>
            <span class="text-area__info text-area__info--text-size--normal text-area__info--text-bold">
              Total Fat
              <span class="text-area__info-number text-area__info--text-size--normal text-area__info-number--addition--left">0g</span>
            </span>
            <span class="text-area__info text-area__info--text-size--normal text-area__info--text-bold">
              Total Carbohydrate
              <span class="text-area__info-number text-area__info--text-size--normal text-area__info-number--addition--left">0g</span>
            </span>
          </div>
          <button class="button button--theme--chocolate text-area__button text-area__button--type--more">
            more
          </button>
        </div>
        <div class="text-area__content-container text-area__content-container--direction--column">
          <p class="text-area__text text-area__text--theme--shadow">Notes of smoked butterscotch intermingle with our
            signature espresso, giving your latte a
            sophisticated new twist</p>
          <p class="text-area__text text-area__text--theme--shadow">Notes of smoked butterscotch intermingle with our
            signature espresso, giving your latte a
            sophisticated new twist</p>
        </div>
      </div>
    </div>
    <div class="text-area">
      <div class="text-area__container text-area__container--indentation--normal">
        <div class="text-area__content-container text-area__content-container--direction--column">
          <h2 class="text-area__title text-area__title--size--normal">Allergens</h2>
          <span class="text-area__info-available">Not Available</span>
          <p class="text-area__text text-area__text--theme--shadow">Contrary to popular belief, Lorem Ipsum is not simply
            random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
            Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure
            Latin words, consectetur, from a Lore</p>
        </div>
       </div>
    </div>
    `;
  }

  create() {
    this.element.insertAdjacentHTML('beforeend', this.template);

    this.textArea = this.element.querySelector('.text-area__text');
    if (typeof this.parameters.text === 'object') {
      this.textArea.textContent = this.parameters.text;
    }
    this.buttonShare = this.element.querySelector('.text-area__button--type--share');
    if (typeof this.parameters.eventShare === 'object') {
      for (const event of this.parameters.eventShare) {
        this.buttonShare.addEventListener(event.type, event.callback);
      }
    }
    return super.create(this.element);
  }
}
