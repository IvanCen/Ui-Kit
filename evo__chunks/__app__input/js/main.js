function inputVisibleTogglePass() {
    const iconContainer = document.querySelectorAll('.input__icon-eye');
    const inputAreaPassword = document.querySelectorAll('.input__area--type--password');
    function visibleTogglePass(el) {
        [...el].forEach(item => {
            if (item.type === "password") {
                item.type = "text";
            } else {
                item.type = "password";
            }
        });
    }
    [...iconContainer].forEach(item => {
        item.addEventListener('click', () => visibleTogglePass(inputAreaPassword));
    });
}

function inputFlyLabel() {
    const inputAreaTypeFlyLabel = document.querySelectorAll('.input__area--type--fly-label');

    function focused(el) {
        el.nextElementSibling.classList.add('input--focused')
    }

    function unfocused(el) {
        if (el.value === '') {
            el.nextElementSibling.classList.remove('input--focused');
        }
    }

    [...inputAreaTypeFlyLabel].forEach(item => {
        item.addEventListener('focus', () => focused(item));
        item.addEventListener('click', () => focused(item));
        item.addEventListener('blur', () => unfocused(item));
    });


}

function validation() {
    const usernameInput = document.querySelector('.input__area__name');
    const passwordInput = document.querySelector('.input__area--type--password');
    const passwordRepeatInput = document.querySelector('.input__area--type--password-repeat');
    const emailInput = document.querySelector('.input__area--type--email');
    const inputs = document.querySelectorAll('.input__area');
    const formButtonSubmit = document.querySelector('.form__button');

    function CustomValidation() {
        this.invalidities = [];
        this.validityChecks = [];
    }

    CustomValidation.prototype = {
        addInvalidity: function (message) {
            this.invalidities.push(message);
        },
        getInvalidities: function () {
            return this.invalidities.join('. \n');
        },
        checkValidity: function (input) {
            for (let i = 0; i < this.validityChecks.length; i++) {

                let isInvalid = this.validityChecks[i].isInvalid(input);
                if (isInvalid) {
                    this.addInvalidity(this.validityChecks[i].invalidityMessage);
                }

                let requirementElement = this.validityChecks[i].element;
                if (requirementElement) {
                    if (isInvalid) {
                        requirementElement.classList.add('input__requirement--invalid');
                        requirementElement.classList.remove('input__requirement--valid');
                    } else {
                        requirementElement.classList.remove('input__requirement--invalid');
                        requirementElement.classList.add('input__requirement--valid');
                    }

                }
            }
        }
    };

    const usernameValidityChecks = [
        {
            isInvalid: function (input) {
                return input.value.length < 2;
            },
            invalidityMessage: 'This input needs to be at least 2 characters',
            element: document.querySelector('.input__requirement--type--name:nth-child(1)')
        },
        {
            isInvalid: function (input) {
                return !input.value.match(/^[А-ЯЁ][а-яё]*(-?[А-ЯЁ][а-яё]+)?/gi);
            },
            invalidityMessage: 'Only letters are allowed',
            element: document.querySelector('.input__requirement--type--name:nth-child(2)')
        }
    ];

    const emailValidityChecks = [
        {
            isInvalid: function (input) {
                return !input.value.match(/^([a-zA-Z0-9][_.-]?)+(?<!\W)@([a-zA-Z0-9][_.-]?)+(\.[a-zA-Z-]{2,})+$/g);
            },
            invalidityMessage: 'Please enter a valid email address',
            element: document.querySelector('.input__requirement--type--email:nth-child(1)')
        }
    ];
    const passwordValidityChecks = [
        {
            isInvalid: function (input) {
                return input.value.length < 8 | input.value.length > 100;
            },
            invalidityMessage: 'This input needs to be between 8 and 100 characters',
            element: document.querySelector('.input__requirement--type--password:nth-child(1)')
        },
        {
            isInvalid: function (input) {
                return !input.value.match(/[0-9]/g);
            },
            invalidityMessage: 'At least 1 number is required',
            element: document.querySelector('.input__requirement--type--password:nth-child(2)')
        },
        {
            isInvalid: function (input) {
                return !input.value.match(/[a-z]/g);
            },
            invalidityMessage: 'At least 1 lowercase letter is required',
            element: document.querySelector('.input__requirement--type--password:nth-child(3)')
        },
        {
            isInvalid: function (input) {
                return !input.value.match(/[A-Z]/g);
            },
            invalidityMessage: 'At least 1 uppercase letter is required',
            element: document.querySelector('.input__requirement--type--password:nth-child(4)')
        },
        {
            isInvalid: function (input) {
                return !input.value.match(/[\!\@\#\$\%\^\&\*]/g);
            },
            invalidityMessage: 'You need one of the required special characters',
            element: document.querySelector('.input__requirement--type--password:nth-child(5)')
        }
    ];

    const passwordRepeatValidityChecks = [
        {
            isInvalid: function () {
                return passwordRepeatInput.value != passwordInput.value;
            },
            invalidityMessage: 'This password needs to match the first one',
            element: document.querySelector('.input__requirement--type--password-repeat:nth-child(1)')
        }
    ];

    function checkInput(input) {

        input.CustomValidation.invalidities = [];
        input.CustomValidation.checkValidity(input);

        if (input.CustomValidation.invalidities.length == 0 && input.value != '') {
            input.setCustomValidity('');
            input.classList.remove('input__area--invalid');
        } else {
            let message = input.CustomValidation.getInvalidities();
            input.setCustomValidity(message);
            input.classList.add('input__area--invalid');
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


    for (let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('keyup', function () {
            checkInput(this);
        });
    }

    if (formButtonSubmit) {
        formButtonSubmit.addEventListener('click', function () {
            for (let i = 0; i < inputs.length; i++) {
                checkInput(inputs[i]);
            }
        });
    }

}


function createFormInputSignIn(parameters) {
    if (typeof parameters !== 'object') {
        parameters = {};
    }
    const element = document.createElement('form');

    if (typeof parameters['styles'] === 'object') {

        for (let style of parameters['styles']) {
            element.classList.add(style);
        }

    }

    const template = `
            <div class="input">
                <label class="input__underlined">
                  <input class="input__area input__area--type--fly-label input__area--type--email" type="email" required>
                  <span class="input__label">Email</span>
                  <ul class="input__requirements">
                    <li class="input__requirement input__requirement--type--email">Please enter a valid email address</li>
                  </ul>
                </label>
                </div>
                <div class="input">
                <label class="input__underlined">
                  <input class="input__area input__area--type--fly-label input__area--type--password"
                         type="password" maxlength="100" minlength="8" required>
                  <span class="input__label">Password</span>
                  <ul class="input__requirements">
                    <li class="input__requirement input__requirement--type--password">At least 8 characters long (and less than
                      100 characters)
                    </li>
                    <li class="input__requirement input__requirement--type--password">Contains at least 1 number</li>
                    <li class="input__requirement input__requirement--type--password">Contains at least 1 lowercase letter</li>
                    <li class="input__requirement input__requirement--type--password">Contains at least 1 uppercase letter</li>
                    <li class="input__requirement input__requirement--type--password">Contains a special character (e.g. @ !)
                    </li>
                  </ul>
                  <div class="input__icon-container">
                    <img src="[+chunkWebPath+]/img/icon-eye-noVisible.svg" alt="" class="input__icon input__icon-eye">
                    <img src="[+chunkWebPath+]/img/icon-attention-triangle.svg" alt="" class="input__icon">
                  </div>
                </label>
           </div> 
           <button class="button form__button button--theme--size--small button--theme--oranges-transparent button--position--left">Forgot password?</button> 
           <button class="button form__button button--theme--size--small button--theme--oranges-transparent button--position--left">Forgot username?</button> 
           <button class="button button--theme--tangerin button--size--big button--theme--shadow-big form__button form__button--type--sign-in" type="submit">Sign in</button>
         `

    element.insertAdjacentHTML('beforeend', template);

    const buttonSignIn = element.querySelector('.form__button--type--sign-in');

    if (typeof parameters['events'] === 'object') {
        for (let event of parameters['events']) {
            buttonSignIn.addEventListener(event['type'], event['callback']);

        }
    }
    if (typeof parameters['buttonStyles'] === 'object') {

        for (let style of parameters['styles']) {
            buttonSignIn.classList.add(style);
        }

    }
    return element;
}
