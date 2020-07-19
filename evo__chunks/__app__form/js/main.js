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
           <a href="" class="form__link form__link--type--call">Позвонить</a>
           <p class="form__text">Авторизация осуществляется по бесплатному звонку, как только соединение будет установлено - мы вас авторизуем.</p>
        </div>
        <p class="form__text form__text--success form__text--hide">Вы авторизованны!</p>
        <p class="form__text form__text--error form__text--hide"></p>
        <div class="form__inputs-container form__inputs-container--hide">
          <div class="form__input-container form__input-container--name form__input-container--hide">
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
          <div class="form__input-container form__input-container--birthday form__input-container--hide">
            <h2 class="form__title">Хотите рассказать нам о своей дате рождения? Мы регулярно проводим специальные акции для именинников.</h2>  
            <div class="form__input">
              <label class="form__input-underlined">
                <input class="form__input-area form__input-area--font--normal form__input-area--type--fly-label form__input-area--type--birthday" type="date" min="1900-01-01">
                <span class="form__input-label form__input--focused">День рождения</span>
                <ul class="form__input-requirements"></ul>
              </label>
            </div>
          </div>
          <div class="form__input-container form__input-container--email form__input-container--hide">
            <h2 class="form__title">Хотите подписаться на нашу рассылку? Оставьте нам свой email. В любой момент можно будет отписаться от рассылки через ссылку в каждом отправляемом нами письме.</h2> 
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
          
        <button class="button button--size--medium button--theme--light button--theme--shadow-medium form__button--type--skip">Пропустить</button>
        <button class="button button--theme--tangerin button--size--big button--theme--shadow-big form__button form__button--type--agree">Подтвердить</button>
       </div>
       <button class="button button--theme--tangerin button--size--big button--theme--shadow-big form__button form__button--type--sign-in">Подтвердить</button>
   `;
  }

  create() {
    this.element.insertAdjacentHTML('beforeend', this.template);

    this.buttonSignIn = this.element.querySelector('.form__button--type--sign-in');
    this.buttonSkip = this.element.querySelector('.form__button--type--skip');
    this.buttonAgree = this.element.querySelector('.form__button--type--agree');

    if (typeof this.parameters.events === 'object') {
      for (const event of this.parameters.events) {
        this.buttonSignIn.addEventListener(event.type, event.callback);
      }
    }
    if (typeof this.parameters.eventSkip === 'object') {
      for (const event of this.parameters.eventSkip) {
        this.buttonSkip.addEventListener(event.type, event.callback);
      }
    }
    if (typeof this.parameters.eventAgree === 'object') {
      for (const event of this.parameters.eventAgree) {
        this.buttonAgree.addEventListener(event.type, event.callback);
      }
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
    if (textAlert !== '') {
      const text = textAlert;
    }
    this.element = document.createElement(this.parameters.selector);
    this.template = `
      <div class="form__input">
        <label class="form__input-underlined">
          <input class="form__input-area form__input-area--font--normal form__input-area--type--fly-label form__input-area--type--${this.parameters.identifier}" type="${this.parameters.inputType}" required>
          <span class="form__input-label">${this.parameters.inputLabelName}</span>
          <ul class="form__input-requirements">
            <li class="form__input-requirement form__input-requirement--type--${this.parameters.identifier}">Введите корректные данные</li>
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

class CreateFormPromoCode extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
    this.template = `
          <button class="accordion">Есть промокод?
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
   `;
  }

  create() {
    this.element.insertAdjacentHTML('beforeend', this.template);

    this.buttonPromoCode = this.element.querySelector('.button--type--promo-code');

    function checkPromoCode(info) {
      const error = document.querySelector('.form__input-requirement--type--promo-code');

      if (info.success) {
        const cardItemContainer = document.querySelector('.card-item__container--type--review');
        const accordionButton = document.querySelector('.accordion');

        error.textContent = '';
        error.classList.add('form__input-requirement--hide');


        toggleModal.rendering(info.successData.promoCode.description);
        const reviewCardItem = new CreateCardItemReviewOrder({
          style: ['card-item'],
          modifier: [
            '--direction--row',
            '--border--bottom',
          ],
        });
        info.successData.promoCode.presentItems.forEach((item) => {
          for (const el of Object.values(dataProductApi.successData.items)) {
            if (item.id === el.id) {
              cardItemContainer.append(reviewCardItem.create(item));
            }
          }
        });
        accordionButton.click();
      } else {
        error.textContent = info.errors[0];
        error.classList.add('form__input-requirement--invalid');
        error.classList.remove('form__input-requirement--hide');
      }
    }

    this.buttonPromoCode.addEventListener('click', () => {
      if (!isEmptyObj(userInfoObj)) {
        const inputArea = this.element.querySelector('.form__input-area');
        api.promoСodeСheckApi(userInfoObj.successData.phone, inputArea.value, checkPromoCode);
      } else {
        toggleSubPage.closePage();
        toggleThirdPage.closePage();
        toggleFourthPage.closePage();
        togglePageSignIn.rendering();
      }
    });


    return super.create(this.element);
  }
}

class CreateFormComment extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
    this.template = `
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
   `;
  }

  create() {
    this.element.insertAdjacentHTML('beforeend', this.template);

    this.buttonComment = this.element.querySelector('.button--type--comment');
    this.inputArea = this.element.querySelector('.form__input-area');

    this.error = this.element.querySelector('.form__input-requirement--type--comment');
    this.buttonComment.addEventListener('click', () => {
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


    return super.create(this.element);
  }
}

class CreateFormFriendPay extends CreateItem {
  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.element = document.createElement(this.parameters.selector);
    this.template = `
          <button class="accordion">Хотите оплатить за друга?
            <img src="data:image/svg+xml;base64,[[run-snippet? &snippetName='file-to-base64' &file=[+chunkWebPath+]/img/icon-expand-direction-bottom.svg]]" alt="" class="accordion__icon-arrow">
          </button>
          <div class="accordion__content">
          <div class="form">
            <div class="form__input">
              <label class="form__input-underlined">
                <input class="form__input-area form__input-area--font--normal form__input-area--type--fly-label form__input-area--type--phone" type="tel" required>
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
                    <li class="form__input-requirement form__input-requirement--type--name">Имя должно содержать больше двух букв</li>
                  </ul>
               </label>
             </div>
             <ul class="form__input-requirements">
              <li class="form__input-requirement form__input-requirement--type--error"></li>
            </ul>
            <button class="button button--indentation--top button--theme--tangerin button--size--small form__button button--type--friend" type="submit">Подтвердить</button>
            </div>
          </div>
   `;
  }

  create() {
    this.element.insertAdjacentHTML('beforeend', this.template);

    this.buttonFriend = this.element.querySelector('.button--type--friend');
    this.inputAreaName = this.element.querySelector('.form__input-area--type--name');
    this.inputAreaPhone = this.element.querySelector('.form__input-area--type--phone');
    this.error = this.element.querySelector('.form__input-requirement--type--error');

    this.buttonFriend.addEventListener('click', () => {
      if (this.inputAreaName.value !== '' && this.inputAreaPhone.value !== '+7(___)___-__-__') {
        const accordionButton = this.element.querySelector('.accordion');
        this.error.textContent = `Имя друга: ${this.inputAreaName.value}
          Телефон: ${this.inputAreaPhone.value}
          `;
        this.error.classList.add('form__input-requirement--valid');
        this.error.classList.remove('form__input-requirement--hide');
        setTimeout(() => accordionButton.click(), 2000);
        // orderComment = this.inputArea.value;
      } else {
        this.error.textContent = 'Вы не заполнили все данные';
        this.error.classList.add('form__input-requirement--invalid');
        this.error.classList.remove('form__input-requirement--hide');
      }
    });


    return super.create(this.element);
  }
}
