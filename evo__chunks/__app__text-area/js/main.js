function switchAdd() {
  const textAreaButtonAdd = document.querySelectorAll('.text-area__button--type--add');
  [...textAreaButtonAdd].forEach((item) => {
    item.addEventListener('click', function () {
      const textArea = this.closest('.text-area');
      const iconPlus = textArea.querySelector('.text-area__icon--type--plus');
      const iconMinus = textArea.querySelector('.text-area__icon--type--minus');
      const iconContainer = textArea.querySelector('.text-area__icon-container');
      const allCounter = document.querySelector('.text-area__all-counter-number');
      const thisAdds = document.querySelector('.text-area__list-item--Coffee');
      const title = textArea.querySelector('.text-area__title');
      let counter = 1;
      allCounter.textContent = counter;
      this.classList.remove('text-area__button--open');
      iconContainer.classList.add('text-area__icon-container--open');
      title.classList.add('text-area__title--theme--chocolate');
      const titleName = title.textContent;
      title.textContent = `${counter} packet(s) ${title.textContent}`;

      iconPlus.addEventListener('click', () => {
        counter += 1;
        allCounter.textContent = counter;
        title.textContent = '';
        title.textContent = `${counter} packet(s) ${titleName}`;
        thisAdds.textContent = title.textContent;
      });

      iconMinus.addEventListener('click', () => {
        if (counter === 0) {
          title.textContent = '';
          title.textContent = titleName;
          iconContainer.classList.remove('text-area__icon-container--open');
          this.classList.add('text-area__button--open');
          title.classList.remove('text-area__title--theme--chocolate');
        }
        if (counter >= 1) {
          counter -= 1;
          allCounter.textContent = counter;
          title.textContent = '';
          title.textContent = `${counter} packet(s) ${titleName}`;
        }
        if (counter === 0) {
          title.textContent = '';
          title.textContent = titleName;
        }
      });
    });
  });
}

class CreateTextAreaAddinsProductCard extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
  }

  create(productInfo) {
    this.template = `
      <div class="text-area text-area--theme--light text-area--type--description">
        <div class="text-area__container text-area__container--indentation--normal">
          <div class="text-area__content-container text-area__content-container--direction--column">
            <p class="text-area__text text-area__text--theme--shadow text-area__text--indentation--big">${this.parameters.text}</p>
            <button class="button text-area__button text-area__button--type--share">
              <img src="[+chunkWebPath+]/img/icon-upload.svg" alt=""
                   class="text-area__icon text-area__icon--position--center">
            </button>
            </div>
        </div>
      </div>
     <button class="text-area__button text-area__button--type--reset">reset recipe</button>
       <div class="text-area text-area--theme--light text-area--direction--column text-area--indentation--normal text-area--indentation--top">
        <div class="text-area__content-container text-area__content-container--direction--row text-area__content-container--type--more">
          <div class="text-area__text-container">
            <h2 class="text-area__title text-area__title--size--normal">Nutrition Information</h2>
            <span class="text-area__info-number text-area__info--text-size--normal text-area__info-number--indentation--top">
              ${productInfo.netWeight} fl oz</span>
            <span class="text-area__info text-area__info--text-size--normal text-area__info--text-bold">
              Calories
              <span
                  class="text-area__info-number text-area__info--text-size--normal text-area__info-number--indentation--left">
              ${productInfo.energyFatValue}</span>
            </span>
            <span class="text-area__info text-area__info--text-size--normal text-area__info--text-bold">
              Total Fat
              <span class="text-area__info-number text-area__info--text-size--normal text-area__info-number--indentation--left">
                ${productInfo.fats}</span>
            </span>
                <span class="text-area__sub-info">
                  Saturated Fat
                  <span class="text-area__info-number text-area__info--text-size--normal text-area__info-number--indentation--left">
                    ${productInfo.saturatedFats}</span>
                </span>
                <span class="text-area__sub-info">
                  Trans Fat
                  <span class="text-area__info-number text-area__info--text-size--normal text-area__info-number--indentation--left">
                    ${productInfo.transFats}</span>
                </span>
            <span class="text-area__info text-area__info--text-size--normal text-area__info--text-bold">
              Cholesterol
              <span class="text-area__info-number text-area__info--text-size--normal text-area__info-number--indentation--left">
                ${productInfo.cholesterol}</span>
            </span>
            <span class="text-area__info text-area__info--text-size--normal text-area__info--text-bold">
              Sodium
              <span class="text-area__info-number text-area__info--text-size--normal text-area__info-number--indentation--left">
                ${productInfo.sodium}</span>
            </span>
            <span class="text-area__info text-area__info--text-size--normal text-area__info--text-bold">
              Total Carbohydrate
              <span class="text-area__info-number text-area__info--text-size--normal text-area__info-number--indentation--left">
                ${productInfo.carbon}</span>
            </span>
                <span class="text-area__sub-info">
                  Fiber
                  <span class="text-area__info-number text-area__info--text-size--normal text-area__info-number--indentation--left">
                    ${productInfo.fiber}</span>
                </span>
                <span class="text-area__sub-info">
                  Sugars
                <span class="text-area__info-number text-area__info--text-size--normal text-area__info-number--indentation--left">
                    ${productInfo.sugar}</span>
                </span>
            <span class="text-area__info text-area__info--text-size--normal text-area__info--text-bold">
              Protein
              <span class="text-area__info-number text-area__info--text-size--normal text-area__info-number--indentation--left">
                ${productInfo.protein}</span>
            </span>
            <span class="text-area__info text-area__info--text-size--normal text-area__info--text-bold">
              Caffeine<span class="text-area__info-number text-area__info--text-size--normal text-area__info-number--indentation--left">
                ${productInfo.caffeine}</span>
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
    <div class="text-area text-area--theme--light">
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
    this.element.insertAdjacentHTML('beforeend', this.template);

    this.buttonShare = this.element.querySelector('.text-area__button--type--share');
    this.areaAddins = this.element.querySelector('.text-area--type--add-ins');
    this.buttonMore = this.element.querySelector('.text-area__button--type--more');
    this.nutritionArea = this.element.querySelector('.text-area__content-container--type--more');
    this.buttonMore.addEventListener('click', () => {
      this.nutritionArea.classList.toggle('text-area__content-container--open');
      this.buttonMore.remove();
    });
    if (typeof this.parameters.eventShare === 'object') {
      for (const event of this.parameters.eventShare) {
        this.buttonShare.addEventListener(event.type, event.callback);
      }
    }
    if (typeof this.parameters.eventAddAddins === 'object') {
      for (const event of this.parameters.eventAddAddins) {
        const element = document.createElement('div');
        element.classList.add('text-area', 'text-area--theme--light');
        const template = `
            <div class="text-area__container text-area__container--indentation--small">
              <div class="text-area__content-container text-area__content-container--direction--column">
                <h2 class="text-area__title text-area__title--size--small text-area__title--type--bold">${event}</h2>
                <ul class="text-area__list text-area__list--${event}">
                  <li class="text-area__list-item text-area__list-item--${event}"></li>
                </ul>
              </div>
              <button class="button">
                <img src="[+chunkWebPath+]/img/icon-expand-direction-right.svg" alt="" class="text-area__icon text-area__icon--position--center">
              </button>
            </div>`;
        element.insertAdjacentHTML('beforeend', template);
        element.addEventListener('click', () => {
          toggleThirdPageAddinsCard.rendering(productInfo);
          toggleThirdPageAddinsCard.openPage;
        });
        this.descriptionArea = this.element.querySelector('.text-area--type--description');
        this.descriptionArea.after(element);
      }
    }
    if (typeof this.parameters.eventAddSize === 'object') {
      for (const event of this.parameters.eventAddSize) {
        const element = document.createElement('div');
        element.classList.add('size-bar', 'size-bar--main');
        const template = `
              <div class="size-bar__content-container">
              <h2 class="size-bar__title">${event.nameCategory}</h2>
              <span class="size-bar__info">${event.sizeNameMain}</span>
              </div>
              <div class="size-bar__button-container">
                <button class="size-bar__button">Short</button>
                <button class="size-bar__button size-bar__button--active">${event.sizeNameMain}</button>
                <button class="size-bar__button">Grande</button>
                <button class="size-bar__button">Venti</button>
              </div>`;
        element.insertAdjacentHTML('beforeend', template);

        this.descriptionArea = this.element.querySelector('.text-area--type--description');
        this.descriptionArea.after(element);
      }
    }
    return super.create(this.element);
  }
}

class CreateTextAreaAddins extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
    this.template = `
      <div class="text-area__counter-container">
        <span class="text-area__all-counter-title">Your drink currently has </span>
        <span class="text-area__all-counter"><span class="text-area__all-counter-number">0</span> pump(s)</span>
      </div>
      <h2 class="text-area__title text-area__title--type--uppercase text-area__title--type--bold">liquid sweetener</h2>
      <div class="text-area text-area--theme--light text-area--type--add-ins">
        <div class="text-area__container text-area__container--indentation--small">
          <div class="text-area__content-container text-area__content-container--direction--column">
            <h3 class="text-area__title text-area__title--size--small text-area__title--type--bold">Equal (blue)</h3>
            <ul class="text-area__list">
              <li class="text-area__list-item"></li>
            </ul>
          </div>
          <div class="text-area__icon-container">
            <div class="text-area__icon-container text-area__icon-container--open">
              <button class="button">
                <img src="[+chunkWebPath+]/img/icon-remove-line.svg" alt=""
                     class="text-area__icon text-area__icon--type--minus text-area__icon--position--first">
              </button>
              <button class="button">
                <img src="[+chunkWebPath+]/img/icon-add-plus.svg" alt="" class="text-area__icon text-area__icon--type--plus">
              </button>
            </div>
          </div>
          <button class="button button--theme--chocolate text-area__button text-area__button--type--add text-area__button--open">
            Add
          </button>
        </div>
      </div>
      <h2 class="text-area__title text-area__title--type--uppercase text-area__title--type--bold">liquid sweetener</h2>
      <div class="text-area text-area--theme--light text-area--type--add-ins">
        <div class="text-area__container text-area__container--indentation--small">
          <div class="text-area__content-container text-area__content-container--direction--column">
            <h3 class="text-area__title text-area__title--size--small text-area__title--type--bold">dsadasde</h3>
            <ul class="text-area__list">
              <li class="text-area__list-item"></li>
            </ul>
          </div>
          <div class="text-area__icon-container">
            <div class="text-area__icon-container text-area__icon-container--open">
              <button class="button">
                <img src="[+chunkWebPath+]/img/icon-remove-line.svg" alt=""
                     class="text-area__icon text-area__icon--type--minus text-area__icon--position--first">
              </button>
              <button class="button">
                <img src="[+chunkWebPath+]/img/icon-add-plus.svg" alt="" class="text-area__icon text-area__icon--type--plus">
              </button>
            </div>
          </div>
          <button class="button button--theme--chocolate text-area__button text-area__button--type--add text-area__button--open">
            Add
          </button>
        </div>
      </div>
      <button class="text-area__button text-area__button--type--reset">reset add-ins</button>
    `;
  }

  create() {
    this.element.insertAdjacentHTML('beforeend', this.template);

    /* this.areaAddins = this.element.querySelector('.text-area--type--add-ins');
    if (typeof this.parameters.openAddins === 'object') {
      for (const event of this.parameters.openAddins) {
        this.areaAddins.addEventListener(event.type, event.callback);
      }
    } */
    return super.create(this.element);
  }
}

class CreateTextAreaAccount extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
    this.template = `
      <div class="text-area text-area--type--help">
        <div class="text-area__container text-area__container--indentation--small">
          <h2 class="text-area__title text-area__title--size--small text-area__title--type--bold">Help</h2>
          <button class="button">
            <img src="[+chunkWebPath+]/img/icon-expand-direction-right.svg" alt="" class="text-area__icon text-area__icon--position--center">
          </button>
        </div>
      </div>
      <div class="text-area text-area--type--application">
        <div class="text-area__container text-area__container--indentation--small">
          <div class="text-area__content-container text-area__content-container--direction--column">
            <h2 class="text-area__title text-area__title--size--small text-area__title--type--bold">Application Terms</h2>
          </div>
          <button class="button">
            <img src="[+chunkWebPath+]/img/icon-expand-direction-right.svg" alt="" class="text-area__icon text-area__icon--position--center">
          </button>
      </div>
    </div>
    <div class="text-area text-area--type--privacy">
      <div class="text-area__container text-area__container--indentation--small">
        <div class="text-area__content-container text-area__content-container--direction--column">
          <h2 class="text-area__title text-area__title--size--small text-area__title--type--bold">Privacy Statement</h2>
        </div>
        <button class="button">
          <img src="[+chunkWebPath+]/img/icon-expand-direction-right.svg" alt="" class="text-area__icon text-area__icon--position--center">
        </button>
      </div>
    </div>
    <div class="text-area text-area--type--analytics">
      <div class="text-area__container text-area__container--indentation--small">
        <h2 class="text-area__title text-area__title--size--small text-area__title--type--bold">Analytics</h2>
        <button class="button">
          <img src="[+chunkWebPath+]/img/icon-expand-direction-right.svg" alt="" class="text-area__icon text-area__icon--position--center">
        </button>
       </div>
     </div>  
    `;
  }

  create() {
    this.element.insertAdjacentHTML('beforeend', this.template);

    this.buttonHelp = this.element.querySelector('.text-area--type--help');
    this.buttonApplication = this.element.querySelector('.text-area--type--application');
    this.buttonPrivacy = this.element.querySelector('.text-area__button--type--privacy');
    this.buttonAnalytics = this.element.querySelector('.text-area__button--type--analytics');
    if (typeof this.parameters.eventHelp === 'object') {
      for (const event of this.parameters.eventHelp) {
        this.buttonHelp.addEventListener(event.type, event.callback);
      }
    }
    if (typeof this.parameters.eventApplication === 'object') {
      for (const event of this.parameters.eventApplication) {
        this.buttonApplication.addEventListener(event.type, event.callback);
      }
    }
    if (typeof this.parameters.eventPrivacy === 'object') {
      for (const event of this.parameters.eventPrivacy) {
        this.buttonPrivacy.addEventListener(event.type, event.callback);
      }
    }
    if (typeof this.parameters.eventAnalytics === 'object') {
      for (const event of this.parameters.eventAnalytics) {
        this.buttonAnalytics.addEventListener(event.type, event.callback);
      }
    }
    return super.create(this.element);
  }
}

class CreateTextAreaApplication extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
    this.template = `
      <div class="text-area text-area--indentation--normal">
        <div class="text-area__content-container text-area__content-container--direction--column text-area__content-container--indentation--normal">
          <h2 class="text-area__title text-area__title--size--normal text-area__title--indentation--bottom">Eligibility</h2>
          <p class="text-area__text">The Application is not targeted towards, nor intended for use by, anyone under the age of 13. A USER MUST BE AT LEAST AGE 13 TO ACCESS AND USE THE APPLICATION. If the User is between the ages of 13 and 18, he or she may only use the Application under the supervision of a parent or legal guardian who agrees to be bound by these Terms. User represents and warrants that (a) he/she is not located in a country that is subject to a U.S. government embargo, or that has been designated by the U.S. government as a “terrorist supporting” country; and (b) he/she is not listed on any U.S. government list of prohibited or restricted parties. In order to use certain functions of our Application, you will need to register for an account. You agree to (a) create only one account; (b) provide accurate, truthful , current and complete information when creating your account; (c) maintain and promptly update your account information; (d) maintain the security of your account by not sharing your password with others and restricting access to your account and your computer; (e) promptly notify Starbucks if you discover or otherwise suspect any security breaches relating to the Application; and (f) take responsibility for all activities that occur under your account and accept all risks of unauthorized access.</p>
        </div>
        <div class="text-area__content-container text-area__content-container--direction--column text-area__content-container--indentation--normal">
          <h2 class="text-area__title text-area__title--size--normal text-area__title--indentation--bottom">Privacy</h2>
          <p class="text-area__text">Please read the Privacy Policy carefully to understand how Starbucks collects, uses and discloses personally identifiable information from its users. By downloading, installing, accessing or using the Application, you consent to all actions that we take with respect to your data consistent with our Privacy Policy.</p>
        </div>
        <div class="text-area__content-container text-area__content-container--direction--column text-area__content-container--indentation--normal">
          <h2 class="text-area__title text-area__title--size--normal text-area__title--indentation--bottom">Apple Terms and Conditions; Starbucks Policies</h2>
          <p class="text-area__text">These Terms supplement and incorporate (a) the Apple, Inc. (“Apple”) Terms and Conditions (located at http://www.apple.com/legal/internet-services/itunes/us/terms.html) including, without limitation, the Licensed Application End User License Agreement provided therein (“Apple Terms”); and (b) other Starbucks policies, including Starbucks® Rewards, posted at www.starbucks.com (“Starbucks Website”). If any of the provisions of the Apple Terms and Conditions conflict with these Terms, the Apple Terms and Conditions will control, solely to the extent such terms apply to the Application. Starbucks, not Apple, is solely responsible for the Application and the content thereof.</p>
        </div>
      </div>
    `;
  }

  create() {
    this.element.insertAdjacentHTML('beforeend', this.template);

    return super.create(this.element);
  }
}


class CreateTextAreaStoreInfo extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
    this.template = `
      <div class="text-area">
        <div class="text-area__container text-area__container--indentation--normal">
          <div class="text-area__content-container text-area__content-container--direction--column text-area__content-container--indentation--right">
           <h2 class="text-area__title text-area__title--size--small text-area__title--type--bold">${this.parameters.address}</h2>
           <span class="text-area__title text-area__title--size--small text-area__title--theme--shadow">${this.parameters.distance}</span>
          </div>
          <img src="[+chunkWebPath+]/img/icon-on-map.svg" alt="" class="text-area__icon text-area__icon--position--center">
        </div>
      </div>
      <div class="text-area">
        <div class="text-area__container text-area__container--indentation--normal">
          <div class="text-area__content-container text-area__content-container--direction--column text-area__content-container--indentation--right">
            <h2 class="text-area__title text-area__title--size--small text-area__title--type--bold">${this.parameters.phone}</h2>
          </div>
          <img src="[+chunkWebPath+]/img/icon-phone.svg" alt="" class="text-area__icon text-area__icon--position--center">
       </div>
     </div>  
     <div class="text-area">
        <h2 class="text-area__title text-area__title--size--normal text-area__title--indentation--big text-area__title--theme--shadow">Hours</h2>
        <div class="text-area__content-container text-area__content-container--direction--row">
          <h3 class="text-area__title text-area__title--size--small text-area__title--type--bold">Понедельник</h3>
         <span class="text-area__title text-area__title--size--small">${this.parameters.monday}</span>
        </div>
        <div class="text-area__content-container text-area__content-container--direction--row">
          <h3 class="text-area__title text-area__title--size--small">Вторник</h3>
         <span class="text-area__title text-area__title--size--small text-area__title--theme--shadow">${this.parameters.tuesday}</span>
        </div>
        <div class="text-area__content-container text-area__content-container--direction--row">
          <h3 class="text-area__title text-area__title--size--small">Среда</h3>
         <span class="text-area__title text-area__title--size--small text-area__title--theme--shadow">${this.parameters.wednesday}</span>
        </div>
        <div class="text-area__content-container text-area__content-container--direction--row">
          <h3 class="text-area__title text-area__title--size--small">Четверг</h3>
         <span class="text-area__title text-area__title--size--small text-area__title--theme--shadow">${this.parameters.thursday}</span>
        </div>
        <div class="text-area__content-container text-area__content-container--direction--row">
          <h3 class="text-area__title text-area__title--size--small">Пятница</h3>
         <span class="text-area__title text-area__title--size--small text-area__title--theme--shadow">${this.parameters.friday}</span>
        </div>
        <div class="text-area__content-container text-area__content-container--direction--row">
          <h3 class="text-area__title text-area__title--size--small">Суббота</h3>
         <span class="text-area__title text-area__title--size--small text-area__title--theme--shadow">${this.parameters.saturday}</span>
        </div>
        <div class="text-area__content-container text-area__content-container--direction--row">
          <h3 class="text-area__title text-area__title--size--small">Воскресенье</h3>
         <span class="text-area__title text-area__title--size--small text-area__title--theme--shadow">${this.parameters.sunday}</span>
        </div>
     </div>  
     
     <div class="text-area">
        <h2 class="text-area__title text-area__title--size--normal text-area__title--indentation--big text-area__title--theme--shadow">Amenities</h2>
        <div class="text-area__content-container text-area__content-container--direction--row">
          <h3 class="text-area__title text-area__title--size--small">Google Wi-Fi</h3>
        </div>
        <div class="text-area__content-container text-area__content-container--direction--row">
          <h3 class="text-area__title text-area__title--size--small">Drive-Thru</h3>
        </div>
        <div class="text-area__content-container text-area__content-container--direction--row">
          <h3 class="text-area__title text-area__title--size--small">LaBoulange</h3>
        </div>
        <div class="text-area__content-container text-area__content-container--direction--row">
          <h3 class="text-area__title text-area__title--size--small">Mobile Payment</h3>
        </div>
        <div class="text-area__content-container text-area__content-container--direction--row">
          <h3 class="text-area__title text-area__title--size--small">Music Experience</h3>
        </div>
     </div>  
    `;
  }

  create() {
    this.element.insertAdjacentHTML('beforeend', this.template);

    /* this.buttonHelp = this.element.querySelector('.text-area--type--help');
    this.buttonApplication = this.element.querySelector('.text-area--type--application');

    if (typeof this.parameters.eventHelp === 'object') {
      for (const event of this.parameters.eventHelp) {
        this.buttonHelp.addEventListener(event.type, event.callback);
      }
    }
    if (typeof this.parameters.eventApplication === 'object') {
      for (const event of this.parameters.eventApplication) {
        this.buttonApplication.addEventListener(event.type, event.callback);
      }
    } */
    return super.create(this.element);
  }
}
