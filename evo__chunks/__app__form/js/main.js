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
  const usernameInput = document.querySelector('.form__input-area__name');
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
    {
      isInvalid(input) {
        return !input.value.match(/^[А-ЯЁ][а-яё]*(-?[А-ЯЁ][а-яё]+)?/gi);
      },
      invalidityMessage: 'Only letters are allowed',
      element: document.querySelector('.form__input-requirement--type--name:nth-child(2)'),
    },
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
        return !input.value.match(/[!@#$%^&*]/g);
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
      if (iconError) {
        iconError.classList.remove('form__input-icon-error--visible');
      }
    } else {
      const message = input.CustomValidation.getInvalidities();
      input.setCustomValidity(message);
      input.classList.add('form__input-area--invalid');
      input.classList.remove('form__input-area--valid');
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
            <input class="form__input-area form__input-area--type--fly-label form__input-area--type--email" type="email" required>
            <span class="form__input-label">Email</span>
            <ul class="form__input-requirements">
              <li class="form__input-requirement form__input-requirement--type--email">Please enter a valid email address</li>
            </ul>
            <div class="form__input-icon-container">
              <img src="[+chunkWebPath+]/img/icon-attention-triangle.svg" alt="" class="form__input-icon form__input-icon-error">
            </div>
          </label>
          </div>
          <div class="form__input">
          <label class="form__input-underlined">
            <input class="form__input-area form__input-area--type--fly-label form__input-area--type--password"
                   type="password" maxlength="100" minlength="8" required>
            <span class="form__input-label">Password</span>
            <ul class="form__input-requirements">
              <li class="form__input-requirement form__input-requirement--type--password">At least 8 characters long (and less than
                100 characters)
              </li>
              <li class="form__input-requirement form__input-requirement--type--password">Contains at least 1 number</li>
              <li class="form__input-requirement form__input-requirement--type--password">Contains at least 1 lowercase letter</li>
              <li class="form__input-requirement form__input-requirement--type--password">Contains at least 1 uppercase letter</li>
              <li class="form__input-requirement form__input-requirement--type--password">Contains a special character (e.g. @ !)
              </li>
            </ul>
            <div class="form__input-icon-container">
              <img src="[+chunkWebPath+]/img/icon-eye-noVisible.svg" alt="" class="form__input-icon form__input-icon-eye">
              <img src="[+chunkWebPath+]/img/icon-attention-triangle.svg" alt="" class="form__input-icon form__input-icon-error">
            </div>
          </label>
     </div> 
     <button class="button form__button button--theme--size--small button--theme--oranges-transparent button--position--left">Forgot password?</button> 
     <button class="button form__button button--theme--size--small button--theme--oranges-transparent button--position--left">Forgot username?</button> 
     <button class="button button--theme--tangerin button--size--big button--theme--shadow-big form__button form__button--type--sign-in" type="submit">Sign in</button>
   `;
  }

  create() {
    this.element.insertAdjacentHTML('beforeend', this.template);

    this.buttonSignIn = this.element.querySelector('.form__button--type--sign-in');

    if (typeof this.parameters.events === 'object') {
      for (const event of this.parameters.events) {
        this.buttonSignIn.addEventListener(event.type, event.callback);
      }
    }

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
          <input class="form__input-area form__input-area--type--fly-label form__input-area--type--text" type="text">
          <span class="form__input-label">Add a message (optional)</span>
          <ul class="form__input-requirements">
            <li class="form__input-requirement form__input-requirement--type--text"></li>
          </ul>
          <div class="form__input-icon-container">
            <img src="[+chunkWebPath+]/img/icon-attention-triangle.svg" alt="" class="form__input-icon form__input-icon-error">
          </div>
        </label>
      </div>
      <div class="form__input">
        <label class="form__input-underlined">
          <input class="form__input-area form__input-area__name form__input-area--type--fly-label" minlength="2">
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
          <input class="form__input-area form__input-area--type--fly-label form__input-area--type--email" type="email" required>
          <span class="form__input-label">Email</span>
          <ul class="form__input-requirements">
            <li class="form__input-requirement form__input-requirement--type--email">Please enter a valid email address</li>
          </ul>
          <div class="form__input-icon-container">
            <img src="[+chunkWebPath+]/img/icon-attention-triangle.svg" alt="" class="form__input-icon form__input-icon-error">
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
