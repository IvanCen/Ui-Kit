function inputVisibleTogglePass() {
  const iconContainer = document.querySelectorAll('.form__input-icon-eye');
  const inputAreaPassword = document.querySelectorAll('.form__input-area--type--password');

  function visibleTogglePass(el) {
    [...el].forEach((item) => {
      if (item.type === 'password') {
        item.type = 'text';
      } else {
        item.type = 'password';
      }
    });
  }

  [...iconContainer].forEach((item) => {
    item.addEventListener('click', () => visibleTogglePass(inputAreaPassword));
  });
}

function inputFlyLabel() {
  const inputAreaTypeFlyLabel = document.querySelectorAll('.form__input-area--type--fly-label');

  function focused(el) {
    el.nextElementSibling.classList.add('form__input--focused');
  }

  function unfocused(el) {
    if (el.value === '') {
      el.nextElementSibling.classList.remove('form__input--focused');
    }
  }

  [...inputAreaTypeFlyLabel].forEach((item) => {
    item.addEventListener('focus', () => focused(item));
    item.addEventListener('click', () => focused(item));
    item.addEventListener('blur', () => unfocused(item));
  });
}

function validation() {
  const usernameInput = document.querySelector('.form__input-area--type--name');
  const passwordInput = document.querySelector('.form__input-area--type--password');
  const passwordRepeatInput = document.querySelector('.form__input-area--type--password-repeat');
  const emailInput = document.querySelector('.form__input-area--type--email');
  const inputs = document.querySelectorAll('.form__input-area');
  const formButtonSubmit = document.querySelector('.form__button');

  function CustomValidation() {
    this.invalidities = [];
    this.validityChecks = [];
  }

  CustomValidation.prototype = {
    addInvalidity(message) {
      this.invalidities.push(message);
    },
    getInvalidities() {
      return this.invalidities.join('. \n');
    },
    checkValidity(input) {
      for (let i = 0; i < this.validityChecks.length; i += 1) {
        const isInvalid = this.validityChecks[i].isInvalid(input);
        if (isInvalid) {
          this.addInvalidity(this.validityChecks[i].invalidityMessage);
        }

        const requirementElement = this.validityChecks[i].element;
        if (requirementElement) {
          if (isInvalid) {
            requirementElement.classList.add('form__input-requirement--invalid');
            requirementElement.classList.remove('form__input-requirement--valid');
          } else {
            requirementElement.classList.remove('form__input-requirement--invalid');
            requirementElement.classList.add('form__input-requirement--valid');
          }
        }
      }
    },
  };

  const usernameValidityChecks = [
    {
      isInvalid(input) {
        return input.value.length < 2;
      },
      invalidityMessage: 'This input needs to be at least 2 characters',
      element: document.querySelector('.form__input-requirement--type--name:nth-child(1)'),
    },
    /* {
      isInvalid(input) {
        return !input.value.match(/^[А-ЯЁ][а-яё]*(-?[А-ЯЁ][а-яё]+)?/gi);
      },
      invalidityMessage: 'Only letters are allowed',
      element: document.querySelector('.form__input-requirement--type--name:nth-child(2)'),
    }, */
  ];

  const emailValidityChecks = [
    {
      isInvalid(input) {
        return !input.value.match(/^([a-zA-Z0-9][_.-]?)+@([a-zA-Z0-9][_.-]?)+(\.[a-zA-Z-]{2,})+$/g);
      },
      invalidityMessage: 'Please enter a valid email address',
      element: document.querySelector('.form__input-requirement--type--email:nth-child(1)'),
    },
  ];
  const passwordValidityChecks = [
    {
      isInvalid(input) {
        return input.value.length < 8 || input.value.length > 100;
      },
      invalidityMessage: 'This input needs to be between 8 and 100 characters',
      element: document.querySelector('.form__input-requirement--type--password:nth-child(1)'),
    },
    {
      isInvalid(input) {
        return !input.value.match(/[0-9]/g);
      },
      invalidityMessage: 'At least 1 number is required',
      element: document.querySelector('.form__input-requirement--type--password:nth-child(2)'),
    },
    {
      isInvalid(input) {
        return !input.value.match(/[a-z]/g);
      },
      invalidityMessage: 'At least 1 lowercase letter is required',
      element: document.querySelector('.form__input-requirement--type--password:nth-child(3)'),
    },
    {
      isInvalid(input) {
        return !input.value.match(/[A-Z]/g);
      },
      invalidityMessage: 'At least 1 uppercase letter is required',
      element: document.querySelector('.form__input-requirement--type--password:nth-child(4)'),
    },
    {
      isInvalid(input) {
        return false;// тут была строчка
      },
      invalidityMessage: 'You need one of the required special characters',
      element: document.querySelector('.form__input-requirement--type--password:nth-child(5)'),
    },
  ];

  const passwordRepeatValidityChecks = [
    {
      isInvalid() {
        return passwordRepeatInput.value !== passwordInput.value;
      },
      invalidityMessage: 'This password needs to match the first one',
      element: document.querySelector('.form__input-requirement--type--password-repeat:nth-child(1)'),
    },
  ];

  function checkInput(input) {
    const inputUnderlined = input.parentNode;
    const iconError = inputUnderlined.querySelector('.form__input-icon-error');
    if (input.CustomValidation) {
      input.CustomValidation.invalidities = [];
      input.CustomValidation.checkValidity(input);
      if (input.CustomValidation.invalidities.length === 0 && input.value !== '') {
        input.setCustomValidity('');
        input.classList.remove('form__input-area--invalid');
        input.classList.add('form__input-area--valid');
        formButtonSubmit.disabled = false;
        if (iconError) {
          iconError.classList.remove('form__input-icon-error--visible');
        }
      } else {
        const message = input.CustomValidation.getInvalidities();
        input.setCustomValidity(message);
        input.classList.add('form__input-area--invalid');
        input.classList.remove('form__input-area--valid');
        formButtonSubmit.disabled = true;
        if (iconError) {
          iconError.classList.add('form__input-icon-error--visible');
        }
      }
    }
  }

  if (usernameInput) {
    usernameInput.CustomValidation = new CustomValidation();
    usernameInput.CustomValidation.validityChecks = usernameValidityChecks;
  }

  if (emailInput) {
    emailInput.CustomValidation = new CustomValidation();
    emailInput.CustomValidation.validityChecks = emailValidityChecks;
  }

  if (passwordInput) {
    passwordInput.CustomValidation = new CustomValidation();
    passwordInput.CustomValidation.validityChecks = passwordValidityChecks;
  }

  if (passwordRepeatInput) {
    passwordRepeatInput.CustomValidation = new CustomValidation();
    passwordRepeatInput.CustomValidation.validityChecks = passwordRepeatValidityChecks;
  }


  for (let i = 0; i < inputs.length; i += 1) {
    inputs[i].addEventListener('keyup', function () {
      checkInput(this);
    });
  }

  if (formButtonSubmit) {
    formButtonSubmit.addEventListener('click', () => {
      for (let i = 0; i < inputs.length; i += 1) {
        checkInput(inputs[i]);
      }
    });
  }
}

class CreateFormInputSignIn extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
    this.template = `
      <div class="form__input">
        <label class="form__input-underlined">
          <input class="form__input-area form__input-area--font--normal form__input-area--type--fly-label form__input-area--type--phone form__input-area--type--phone-sign-in" type="tel" required>
          <span class="form__input-label form__input--focused">Введите номер телефона</span>
          <ul class="form__input-requirements">
            <li class="form__input-requirement form__input-requirement--type--phone"></li>
          </ul>
          <div class="form__input-icon-container">
            <img src="data:image/svg+xml;base64,[[run-snippet? &snippetName='file-to-base64' &file=[+chunkWebPath+]/img/icon-attention-triangle.svg]]" alt="" class="form__input-icon form__input-icon-error">
          </div>
        </label>
      </div>
      <p class="form__text form__text--error-phone form__text--hide"></p>
      <div class="form__call-container">
        <div class="form__text-container">
          <div class="form__title">В течении нескольких секунд Вам поступит звонок</div>
          <p class="form__text form__text--indentation--small">Введите последние 4 цифры входящего номера в качестве кода для входа</p>
        </div>
        <div class="form__group form__group--m-top form__group--d-ib">
            <div class="form__input-wrapper  form__input-wrapper--last-number-inputs">
                <input type="tel" inputmode="numeric" maxlength="1" class="last-number-input" name="first-phone"  autocomplete="qwe">
                <input type="tel" inputmode="numeric" maxlength="1" class="last-number-input" name="second-phone"  autocomplete="qwe">
                <input type="tel" inputmode="numeric" maxlength="1" class="last-number-input" name="third-phone"  autocomplete="off">
                <input type="tel" inputmode="numeric" maxlength="1" class="last-number-input" name="fourth-phone"  autocomplete="qwe" data-pos="last">
            </div>
            <p class="form__text form__text-info-number form__text--indentation--small">Вы ввели номер <span class="number-for-registration"></span>, если вы ошиблись при вводе, то <a class="form__link form__link--type--back" type="reset">исправьте номер</a></p>
        </div>
        <p class="form__text form__text--error form__text--error-code form__text--hide"></p>
        <button class="button button--theme--tangerin button--size--large button--theme--shadow-big form__button form__button--type--call button--type--disabled" disabled>Подтвердить</button>
        <button class="button button--size--large button--theme--transparent form__button form__button--type--again form__button--hide">Отправить код повторно</button>
      </div>
      <p class="form__text form__text--success form__text--hide">Вы авторизованны!</p>
      <p class="form__text form__text--error form__text--hide"></p>
     <button class="button button--theme--tangerin button--size--large button--theme--shadow-big form__button form__button--type--sign-in">Подтвердить</button>
   `;
  }

  create() {
    this.element.insertAdjacentHTML('beforeend', this.template);

    this.buttonSignIn = this.element.querySelector('.form__button--type--sign-in');

    this.buttonAgain = this.element.querySelector('.form__button--type--again');

    if (typeof this.parameters.events === 'object') {
      for (const event of this.parameters.events) {
        this.buttonSignIn.addEventListener(event.type, event.callback);
      }
    }


    if (typeof this.parameters.eventAgain === 'object') {
      for (const event of this.parameters.eventAgain) {
        this.buttonAgain.addEventListener(event.type, () => {
          event.callback();
          this.buttonAgain.disabled = true;
          this.buttonAgain.classList.add('button--type--disabled');
          setTimeout(() => {
            this.buttonAgain.disabled = false;
            this.buttonAgain.classList.remove('button--type--disabled');
          }, 10000);
        });
      }
    }

    return super.create(this.element);
  }
}

class CreateFormInputSignInQuestions extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
  }

  create(userInfo) {
    if (userInfo.name === '') {
      this.templateName = `
        <div class="swiper-slide swiper-slide--indentation" data-id="name">
          <div class="slide-wrapper">
            <div class="form__input-container form__input-container--name">
              <h2 class="form__title">Давайте знакомиться, меня зовут Хлебник, а вас?</h2>
                <div class="form__input">
                  <label class="form__input-underlined">
                    <input class="form__input-area form__input-area--font--normal form__input-area--type--fly-label form__input-area--type--name" minlength="2">
                    <span class="form__input-label">Имя</span>
                    <ul class="form__input-requirements">
                      <li class="form__input-requirement form__input-requirement--type--name">Имя должно содержать больше двух букв</li>
                    </ul>
                 </label>
                </div>
              </div>
              <div class="login__buttons-for-form">
                  <button type="submit" class="button form__button--type--next-name button--type--next-swiper button--color-5 button--type--disabled" disabled>Далее</button>
                  <button type="skip" class="button button--size--large">Пропустить</button>
              </div>
              </div>
          </div>
        `;
    }
    if (userInfo.birthday === '') {
      this.templateBirthday = `
        <div class="swiper-slide swiper-slide--indentation" data-id="birthday">
              <div class="slide-wrapper">
                  <div class="form__input-container form__input-container--birthday">
                    <h2 class="form__title">Хотите рассказать нам о своей дате рождения? Мы регулярно проводим специальные акции для именинников</h2>  
                    <div class="form__input">
                      <label class="form__input-underlined">
                        <input class="form__input-area form__input-area--font--normal form__input-area--type--fly-label form__input-area--type--birthday" type="date" min="1900-01-01">
                        <button class="date__picker"></button>
                        <span class="form__input-label form__input--focused">День рождения</span>
                        <ul class="form__input-requirements"></ul>
                      </label>
                    </div>
                  </div>
                  <div class="login__buttons-for-form">
                      <button type="submit" class="button form__button--type--next-birthday button--type--next-swiper button--color-5 button--type--disabled" disabled>Далее</button>
                      <button type="skip" class="button button--size--large">Пропустить</button>
                  </div>
              </div>
          </div>
        `;
    }
    if (userInfo.email === '') {
      this.templateEmail = `
        <div class="swiper-slide swiper-slide--indentation" data-id="email">
              <div class="slide-wrapper">
                  <div class="form__input-container form__input-container--email">
                    <h2 class="form__title">Поделитесь своим email адресом, чтобы первым узнавать о новинках</h2> 
                    <div class="form__input">
                      <label class="form__input-underlined">
                        <input class="form__input-area form__input-area--font--normal form__input-area--type--fly-label form__input-area--type--email" type="email">
                        <span class="form__input-label">Email</span>
                        <ul class="form__input-requirements">
                          <li class="form__input-requirement form__input-requirement--type--email">Пожалуйста введите правильный email адрес</li>
                        </ul>
                        <div class="form__input-icon-container">
                          <img src="data:image/svg+xml;base64,[[run-snippet? &snippetName='file-to-base64' &file=[+chunkWebPath+]/img/icon-attention-triangle.svg]]" alt="" class="form__input-icon form__input-icon-error">
                        </div>
                      </label>
                    </div>
                  </div>
                  <div class="login__buttons-for-form">
                      <button type="submit" class="button form__button--type--next-email button--type--next-swiper button--color-5 button--type--disabled" disabled>Готово</button>
                      <button type="skip" class="button button--size--large">Пропустить</button>
                  </div>
              </div>
          </div>
        `;
    }
    this.template = `
        <div class="swiper-wrapper">
          ${this.templateName || ''}
          ${this.templateBirthday || ''}
          ${this.templateEmail || ''}
        </div>
        <div class="swiper-pagination"></div>
   `;

    this.element.insertAdjacentHTML('beforeend', this.template);

    this.inputAreaBirthday = this.element.querySelector('.form__input-area--type--birthday');
    if (this.inputAreaBirthday) {
      this.inputAreaBirthday.addEventListener('click', () => {
        emitter.emit('inputdate', this.inputAreaBirthday);
      });
    }


    return super.create(this.element);
  }
}

class CreateFormInput extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
  }

  create(textAlert) {
    this.element = document.createElement(this.parameters.selector);
    this.template = `
      <div class="form__input">
        <label class="form__input-underlined">
          <input class="form__input-area form__input-area--font--normal form__input-area--type--fly-label form__input-area--type--${this.parameters.identifier}" type="${this.parameters.inputType}" required>
          <span class="form__input-label">${this.parameters.inputLabelName}</span>
          <ul class="form__input-requirements">
            
          </ul>
          <div class="form__input-icon-container">
            <img src="data:image/svg+xml;base64,[[run-snippet? &snippetName='file-to-base64' &file=[+chunkWebPath+]/img/icon-attention-triangle.svg]]" alt="" class="form__input-icon form__input-icon-error">
          </div>
        </label>
        <p class="form__text form__text--error form__text--hide"></p>
        <p class="form__text">${textAlert || ''}</p>
        <p class="form__text form__text--success form__text--hide">Данные изменены</p>
        </div>
   `;
    this.element.insertAdjacentHTML('beforeend', this.template);

    if (this.parameters.inputType === 'date') {
      this.inputArea = this.element.querySelector('.form__input-area');

      setTimeout(() => this.inputArea.focus(), 200);
    }

    return super.create(this.element);
  }
}

class CreateFormInputSupport extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
  }

  create() {
    this.element = document.createElement(this.parameters.selector);
    this.template = `
      <div class="form__input">
        <label class="form__input-underlined">
          <input class="form__input-area form__input-area--font--normal form__input-area--type--fly-label form__input-area--type--subject" type="text">
          <span class="form__input-label">Тема</span>
          <ul class="form__input-requirements">
            
          </ul>
          <div class="form__input-icon-container">
            <img src="data:image/svg+xml;base64,[[run-snippet? &snippetName='file-to-base64' &file=[+chunkWebPath+]/img/icon-attention-triangle.svg]]" alt="" class="form__input-icon form__input-icon-error">
          </div>
        </label>
      </div>
      <div class="form__input">
        <label class="form__input-underlined">
          <input class="form__input-area form__input-area--font--normal form__input-area--type--fly-label form__input-area--type--message" type="text" required>
          <span class="form__input-label">Комментарий</span>
          <ul class="form__input-requirements">
            
          </ul>
          <div class="form__input-icon-container">
            <img src="data:image/svg+xml;base64,[[run-snippet? &snippetName='file-to-base64' &file=[+chunkWebPath+]/img/icon-attention-triangle.svg]]" alt="" class="form__input-icon form__input-icon-error">
          </div>
        </label>
      </div>
   `;
    this.element.insertAdjacentHTML('beforeend', this.template);

    return super.create(this.element);
  }
}

class CreateFormGiftCard extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
    this.template = `
      <div class="form__input">
        <label class="form__input-underlined">
          <input class="form__input-area form__input-area--font--normal form__input-area--type--fly-label form__input-area--type--text" type="text">
          <span class="form__input-label">Add a message (optional)</span>
          <ul class="form__input-requirements">
            <li class="form__input-requirement form__input-requirement--type--text"></li>
          </ul>
          <div class="form__input-icon-container">
            <img src="data:image/svg+xml;base64,[[run-snippet? &snippetName='file-to-base64' &file=[+chunkWebPath+]/img/icon-attention-triangle.svg]]" alt="" class="form__input-icon form__input-icon-error">
          </div>
        </label>
      </div>
      <div class="form__input">
        <label class="form__input-underlined">
          <input class="form__input-area form__input-area--font--normal form__input-area__name form__input-area--type--fly-label" minlength="2">
          <span class="form__input-label">Name</span>
          <ul class="form__input-requirements">
            <li class="form__input-requirement form__input-requirement--type--name">This input needs to be at least 2 characters
            </li>
            <li class="form__input-requirement form__input-requirement--type--name">Only russian letters are allowed</li>
          </ul>
        </label>
      </div>
      <div class="form__input">
        <label class="form__input-underlined">
          <input class="form__input-area form__input-area--font--normal form__input-area--type--fly-label form__input-area--type--email" type="email" required>
          <span class="form__input-label">Email</span>
          <ul class="form__input-requirements">
            <li class="form__input-requirement form__input-requirement--type--email">Please enter a valid email address</li>
          </ul>
          <div class="form__input-icon-container">
            <img src="data:image/svg+xml;base64,[[run-snippet? &snippetName='file-to-base64' &file=[+chunkWebPath+]/img/icon-attention-triangle.svg]]" alt="" class="form__input-icon form__input-icon-error">
          </div>
        </label>
       </div>
         
     <button class="button button--theme--tangerin button--size--big button--theme--shadow-big form__button form__button--type--sign-in" type="submit">Checkout</button>
   `;
  }

  create() {
    this.element.insertAdjacentHTML('beforeend', this.template);

    this.buttonCheckout = this.element.querySelector('.form__button--type--sign-in');

    if (typeof this.parameters.events === 'object') {
      for (const event of this.parameters.events) {
        this.buttonCheckout.addEventListener(event.type, event.callback);
      }
    }

    return super.create(this.element);
  }
}

class CreateFormDeliver extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
    this.create = this.create.bind(this);
  }

  create() {
    const template = `
        <div class="basket__header accordion__trigger basket__header-should-open" data-id="2">
            <div class="basket__title">Способ доставки</div>
        </div>
        <section class="basket__delivery-type accordion__container" data-id="2">
            <div class="form__group basket__group">
                <label class="form__label form__label--type--package">
                    <input onclick="countResultPriceAndAllProductCounter()" type="radio" class="form__input" data-id="${dataPackage.successData.id}" typeToGo="toGo-withPackage" name="delivery-type" checked>
                    С собой (${dataPackage.successData.name} +${dataPackage.successData.price} ₽)
                </label>
                <label class="form__label">
                    <input onclick="countResultPriceAndAllProductCounter()" type="radio" class="form__input" typeToGo="toGo" name="delivery-type">
                    С собой (без пакета)
                </label>
                <label class="form__label">
                    <input onclick="countResultPriceAndAllProductCounter()" type="radio" class="form__input" typeToGo="inCoffee" name="delivery-type">
                    В кафе
                </label>
            </div>
        </section>
   `;
    this.element.insertAdjacentHTML('beforeend', template);
    return super.create(this.element);
  }
}

class CreateFormStores extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);

    this.template = `
        <div class="basket__header accordion__trigger basket__header-should-open" data-id="3">
            <div class="basket__title">Выберите магазин</div>
        </div>
        <section class="basket__shop accordion__container" data-id="3">
            <div class="form__group basket__group">
                
            </div>
        </section>
   `;
  }

  renderStores(container) {
    Object.values(storesDataObj.successData).forEach((item) => {
      let template;
      if (item.id === userStore.store.id) {
        template = `
        <label class="form__label">
            <input type="radio" data-id="${item.id}" class="form__input" name="shop" checked>
            ${item.shortTitle}
        </label>
   `;
      } else {
        template = `
        <label class="form__label">
            <input type="radio" class="form__input" name="shop">
            ${item.shortTitle}
        </label>
   `;
      }

      container.insertAdjacentHTML('beforeend', template);
    });
  }

  create() {
    this.element.insertAdjacentHTML('beforeend', this.template);
    this.basketGroup = this.element.querySelector('.basket__group');
    this.renderStores(this.basketGroup);
    return super.create(this.element);
  }
}

class CreateFormPay extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
    let balance;
    let bonus;
    if (!isEmptyObj(userInfoObj)) {
      balance = `(${userInfoObj.successData.balance})`;
      bonus = `(${userInfoObj.successData.bonus})`;
    }
    this.template = `
        <div class="basket__header accordion__trigger basket__header-should-open" data-id="1">
            <div class="basket__title">Способ оплаты</div>
        </div>
        <section class="basket__payment accordion__container" data-id="1">
            <div class="form__group basket__group">
                <label class="form__label">
                    <input id="creditCard" type="radio" class="form__input" name="payment">
                    Банковская карта
                </label>
                <label class="form__label">
                    <input id="balance" type="radio" class="form__input" name="payment" checked>
                    Баланс ${balance || ''}
                </label>
                <label class="form__label">
                    <input id="bonus" type="radio" class="form__input" name="payment">
                    Бонусы ${bonus || ''}
                </label>
            </div>
        </section>
   `;
  }

  create() {
    this.element.insertAdjacentHTML('beforeend', this.template);

    return super.create(this.element);
  }
}

class CreateFormPromoCode extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
    /* this.template = `
          <button class="accordion accordion--type--promo-code">Есть промокод?
            <img src="data:image/svg+xml;base64,[[run-snippet? &snippetName='file-to-base64' &file=[+chunkWebPath+]/img/icon-expand-direction-bottom.svg]]" alt="" class="accordion__icon-arrow">
          </button>
          <div class="accordion__content">
          <div class="form">
            <div class="form__input form__input--indentation--bottom">
              <label class="form__input-underlined">
                <input class="form__input-area form__input-area--font--normal form__input-area--type--fly-label form__input-area--type--text" type="text" required>
                <span class="form__input-label accordion__input-label">Введите промокод</span>

                <div class="form__input-icon-container">
                  <img src="data:image/svg+xml;base64,[[run-snippet? &snippetName='file-to-base64' &file=[+chunkWebPath+]/img/icon-barcode.svg]]" alt="" class="form__input-icon">
                </div>
              </label>
            </div>
            <ul class="form__input-requirements">
              <li class="form__input-requirement form__input-requirement--type--promo-code"></li>
            </ul>
            <button class="button button--indentation--top button--theme--tangerin button--size--small button--type--promo-code" type="submit">Подтвердить</button>
            </div>
          </div>
   `; */
    this.template = `
        <div class="basket__header basket__header--dark accordion__trigger" data-id="4">
            <div class="basket__title">Есть промокод?</div>
        </div>
        <section class="basket__payment accordion__container" data-id="4">
            <div class="form__group form__group--float form__group--bordered">
                <label class="form__label">Промокод</label>
                <input class="form__input form__input-promoCode" type="text">
            </div>
        </section>
   `;
  }

  create() {
    this.element.insertAdjacentHTML('beforeend', this.template);

    /* this.buttonPromoCode = this.element.querySelector('.button--type--promo-code');

    function checkPromoCode(info) {
      const error = document.querySelector('.form__input-requirement--type--promo-code');

      if (info.success) {
        const cardItemContainer = document.querySelector('.card-item__container--type--review');
        const accordionButton = document.querySelector('.accordion--type--promo-code');
        console.log(accordionButton);

        error.textContent = '';
        error.classList.add('form__input-requirement--hide');

        toggleModal.rendering(info.successData.promoCode.description);
        const reviewCardItem = new CreateCardItemReviewOrder({
          style: ['banner__container'],
          modifier: [
            '--type--swipe',
            '--border--bottom',
          ],
        });
        info.successData.promoCode.presentItems.forEach((item) => {
          if (typeof dataProductApi.successData.items[item.id] !== 'undefined') {
            cardItemContainer.append(reviewCardItem.create(item));
          }
        });
        const banners = document.querySelectorAll('.banner__container');
        banners.forEach((banner) => {
          activeBanners(banner, true);
        });
        promoCode = info.successData.promoCode.name;
        accordionButton.click();
      } else {
        error.textContent = info.errors[0];
        error.classList.add('form__input-requirement--invalid');
        error.classList.remove('form__input-requirement--hide');
      }
    }

    this.buttonPromoCode.addEventListener('click', () => {
      stopAction(() => {
        if (!isEmptyObj(userInfoObj)) {
          const inputArea = this.element.querySelector('.form__input-area');
          api.promoСodeСheckApi(userInfoObj.successData.phone, inputArea.value, checkPromoCode);
        } else {
          toggleModalPageSignIn.rendering();
        }
      });
    }); */


    return super.create(this.element);
  }
}

class CreateFormComment extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
    /* this.template = `
          <button class="accordion">Хотите оставить комментарий к заказу?
            <img src="data:image/svg+xml;base64,[[run-snippet? &snippetName='file-to-base64' &file=[+chunkWebPath+]/img/icon-expand-direction-bottom.svg]]" alt="" class="accordion__icon-arrow">
          </button>
          <div class="accordion__content">
          <div class="form">
            <div class="form__input form__input--indentation--bottom">
              <label class="form__input-underlined">
                <input class="form__input-area form__input-area--font--normal form__input-area--type--fly-label form__input-area--type--text" type="text" required>
                <span class="form__input-label accordion__input-label">Введите комментарий</span>
              </label>
            </div>
            <ul class="form__input-requirements">
              <li class="form__input-requirement form__input-requirement--type--comment"></li>
            </ul>
            <button class="button button--indentation--top button--theme--tangerin button--size--small button--type--comment" type="submit">Подтвердить</button>
            </div>
          </div>
   `; */
    this.template = `         
      <div class="basket__header basket__header--dark accordion__trigger" data-id="5">
          <div class="basket__title">Комментарий к заказу</div>
      </div>
      <section class="basket__payment accordion__container" data-id="5">
          <div class="form__group form__group--float form__group--bordered">
              <label class="form__label">Комментарий</label>
              <input class="form__input form__input-comment" type="text">
          </div>
      </section>
   `;
  }

  create() {
    this.element.insertAdjacentHTML('beforeend', this.template);

    /* this.buttonComment = this.element.querySelector('.button--type--comment');
    this.inputArea = this.element.querySelector('.form__input');

    this.error = this.element.querySelector('.form__input-requirement--type--comment');
    this.buttonComment.addEventListener('click', () => {
      stopAction(() => {
        if (this.inputArea.value !== '') {
          const accordionButton = this.element.querySelector('.accordion');
          this.error.textContent = `Ваш комментарий: ${this.inputArea.value}`;
          this.error.classList.add('form__input-requirement--valid');
          this.error.classList.remove('form__input-requirement--hide');
          setTimeout(() => accordionButton.click(), 2000);
          orderComment = this.inputArea.value;
        } else {
          this.error.textContent = 'Вы не ввели комментарий';
          this.error.classList.add('form__input-requirement--invalid');
          this.error.classList.remove('form__input-requirement--hide');
        }
      });
    }); */


    return super.create(this.element);
  }
}

class CreateFormFriendPay extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
    /* this.template = `
          <button class="accordion">Хотите оплатить за друга?
            <img src="data:image/svg+xml;base64,[[run-snippet? &snippetName='file-to-base64' &file=[+chunkWebPath+]/img/icon-expand-direction-bottom.svg]]" alt="" class="accordion__icon-arrow">
          </button>
          <div class="accordion__content">
          <div class="form">
            <div class="form__input">
              <label class="form__input-underlined">
                <input class="form__input-area form__input-area--font--normal form__input-area--type--fly-label form__input-area--type--phone form__input-area--type--phone-friend" type="tel" required>
                <span class="form__input-label form__input--focused">Номер телефона</span>
                <div class="form__input-icon-container">
                  <img src="data:image/svg+xml;base64,[[run-snippet? &snippetName='file-to-base64' &file=[+chunkWebPath+]/img/icon-attention-triangle.svg]]" alt="" class="form__input-icon form__input-icon-error">
                </div>
              </label>
              </div>
              <div class="form__input">
                <label class="form__input-underlined">
                  <input class="form__input-area form__input-area--font--normal form__input-area--type--fly-label form__input-area--type--name" minlength="2">
                  <span class="form__input-label">Имя</span>
                  <ul class="form__input-requirements">
                  </ul>
               </label>
             </div>
             <ul class="form__input-requirements">
              <li class="form__input-requirement form__input-requirement--type--error"></li>
            </ul>
            <button class="button button--indentation--top button--theme--tangerin button--size--small form__button button--type--friend" type="submit">Отменить</button>
            </div>
          </div>
   `; */
    this.template = `
      <div class="basket__header basket__header--dark accordion__trigger" data-id="6">
          <div class="basket__title">Хотите оплатить за друга?</div>
      </div>
      <section class="basket__payment accordion__container" data-id="6">
          <div class="form__group form__group--float form__group--bordered">
              <label class="form__label">Номер телефона</label>
              <input class="form__input form__input-area--type--phone-friend" type="text">
          </div>
          <div class="form__group form__group--float form__group--bordered">
              <label class="form__label">Имя</label>
              <input class="form__input form__input-area--type--name" type="text">
          </div>
          <div class="basket__payment-buttons">
              <button class="button button--color-3 button__reset">Отменить</button>
          </div>
      </section>
   `;
  }

  create() {
    this.element.insertAdjacentHTML('beforeend', this.template);

    this.buttonReset = this.element.querySelector('.button__reset');
    this.inputAreaName = this.element.querySelector('.form__input-area--type--name');
    this.inputAreaPhone = this.element.querySelector('.form__input-area--type--phone-friend');
    // this.error = this.element.querySelector('.form__input-requirement--type--error');
    this.accordionButton = this.element.querySelector('.accordion__trigger');
    this.inputAreaName.addEventListener('keyup', (e) => orderFriendData.friendName = e.target.value);
    this.inputAreaPhone.addEventListener('keyup', (e) => orderFriendData.friendPhone = e.target.value);

    IMask(
      this.inputAreaPhone, {
        mask: '+{7}(000)000-00-00',
        lazy: false,
        placeholderChar: '_',
        autoUnmask: true,
      },
    );

    this.buttonReset.addEventListener('click', () => {
      stopAction(() => {
        this.inputAreaName.value = '';
        this.inputAreaPhone.value = '';
        this.accordionButton.click();
        clearFriendDataInfo();
      });
    });


    return super.create(this.element);
  }
}

class CreateFormMapSearch extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
    this.template = `
        <input class="map-search__input" type="text">
        <div class="reset"></div>
   `;
  }

  create() {
    this.element.insertAdjacentHTML('beforeend', this.template);

    this.resetButton = this.element.querySelector('.reset');
    this.input = this.element.querySelector('.map-search__input');

    this.resetButton.addEventListener('click', () => {
      stopAction(() => {
        this.input.value = '';
        this.mapItems = document.querySelectorAll('.map__item');
        this.mapItems.forEach((item) => item.classList.remove('map__item--hide'));
      });
    });
    return super.create(this.element);
  }
}
