document.addEventListener('DOMContentLoaded', () => {
  const phoneMask = IMask(
    document.querySelector('.login-form #phone'), {
      mask: '+{7}(000)000-00-00',
      lazy: false,
      placeholderChar: '_',
      autoUnmask: true,
    },
  );
  const dateMask = IMask(
    document.querySelector('.login-form #date'),
    {
      mask: Date,
    },
  );

  if (localStorage.getItem('phone')) {
    document.querySelector(".form[data-id='phone']").querySelector('.form__group').classList.add('form__group--checked');
    document.querySelector(".form[data-id='phone']").value = localStorage.getItem('phone');
    // document.forms[4].querySelector('input[name="phone"]').closest('.form__group').classList.add("form__group--checked");
    // document.forms[4].querySelector('input[name="phone"]').value = localStorage.getItem('phone');
    localStorage.removeItem('phone');
  }
  let phone; let code; let userData; let name; let birthday; let
    email;
  document.querySelector(".form[data-id='phone']").onsubmit = function (e) {
    phone = document.querySelector(".form[data-id='phone']").querySelector('input[name="phone"]').value;
    e.preventDefault();
    if (!checkBeforeSubmit(e.currentTarget)) return;
    (async () => {
      const validatedPhone = phone;
      const replace = /([_-])|\W+/g;
      const value = validatedPhone.replace(replace, '');
      const request = {
        method: 'sign-in',
        sendCodeMethod: 'callIn',
        phone: value,
        outputFormat: 'json',
      };
      const rawResponse = await fetch('[~30~]', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/html',
        },
        body: JSON.stringify(request),
      });
      const result = JSON.parse(await rawResponse.text());
      console.log(result);
      if (!result.success) {
        let message = 'Возникла ошибка: ';
        result.errors.forEach((error) => {
          message += error;
        });
        alert(message);
      } else {
        document.querySelector(".form[data-id='phone']").classList.add('form--hidden-animation');
        document.querySelector(".form[data-id='code']").querySelector('.number-for-registration').textContent = phone;
        localStorage.setItem('phone', phone);
        setTimeout(() => {
          document.querySelector(".form[data-id='phone']").classList.add('form--hidden');
          document.querySelector(".form[data-id='code']").classList.remove('form--hidden');
          document.querySelector(".form[data-id='phone']").classList.remove('form--hidden-animation');
          document.querySelector(".form[data-id='code'] input").click();
          document.querySelector(".form[data-id='code'] input").focus();
        }, 450);
      }
    })();
  };

  // document.querySelectorAll("input").forEach(el=>{
  //     el.addEventListener("focus", function () {
  //         this.removeAttribute('readonly');
  //     });
  // });


  document.querySelector(".form[data-id='code']").onsubmit = function (e) {
    e.preventDefault();
    if (!checkBeforeSubmit(e.currentTarget)) return;
    console.log(phone, code);
    (async () => {
      const request = {
        method: 'authorize',
        sendCodeMethod: 'callIn',
        phone,
        code, // '1234'
        outputFormat: 'json',
      };
      const rawResponse = await fetch('[~30~]', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/html',
        },
        body: JSON.stringify(request),
      });
      const result = JSON.parse(await rawResponse.text());
      console.log(result, ' 12-391313');
      if (!result.success) {
        let message = 'Возникла ошибка: ';
        result.errors.forEach((error) => {
          message += error;
        });
        document.querySelector('.popup__header').textContent = message;
        showPopup();
      } else {
        const userData = await getUserData();
        console.log(userData);
        localStorage.setItem('userData', JSON.stringify(userData));
        if (userData && !userData.name) {
          console.log(userData.name);
          document.querySelector(".form[data-id='code']").classList.add('form--hidden-animation');
          setTimeout(() => {
            document.querySelector(".form[data-id='code']").classList.add('form--hidden');
            document.querySelector(".form[data-id='name']").classList.remove('form--hidden');
          }, 450);
        } else if (userData && !userData.birthday) {
          document.querySelector(".form[data-id='code']").classList.add('form--hidden-animation');
          setTimeout(() => {
            document.querySelector(".form[data-id='code']").classList.add('form--hidden');
            document.querySelector(".form[data-id='date']").classList.remove('form--hidden');
          }, 450);
        } else if (userData && !userData.email) {
          document.querySelector(".form[data-id='code']").classList.add('form--hidden-animation');
          setTimeout(() => {
            document.querySelector(".form[data-id='code']").classList.add('form--hidden');
            document.querySelector(".form[data-id='email']").classList.remove('form--hidden');
          }, 450);
        } else {
          switch_login_and_cabinet_init();
          // document.querySelector('.popup__header').textContent = "Вы успешно вошли";
          // let a = document.createElement('a');
          // a.textContent = "Показать меню";
          // a.setAttribute('aria-label', 'Показать меню');
          // a.setAttribute('href', 'https://xleb.ru/catalog.html');
          // a.classList.add('button');
          // a.classList.add('button--color-6');
          // document.querySelector('.popup__container').appendChild(a);
          // showPopup();
        }
      }
    })();
  };

  async function getUserData() {
    const request = {
      method: 'get-client',
      outputFormat: 'json',
    };

    const userDataRaw = await fetch('[~30~]', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/html',
      },
      body: JSON.stringify(request),
    });
    const userData = JSON.parse(await userDataRaw.text());
    return userData.successData;
  }

  document.querySelector(".form[data-id='name']").onsubmit = function (e) {
    e.preventDefault();
    if (!checkBeforeSubmit(e.currentTarget)) return;

    (async () => {
      const request = {
        method: 'set-client',
        set: 'name',
        name,
        outputFormat: 'json',
      };
      const rawResponse = await fetch('[~30~]', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/html',
        },
        body: JSON.stringify(request),
      });
      const result = JSON.parse(await rawResponse.text());
      console.log(result);
      if (!result.success) {
        let message = '';
        result.errors.forEach((error) => {
          message += error;
        });
        document.querySelector('.popup__header').textContent = message;
        showPopup();
      } else {
        const userData = await getUserData();
        localStorage.setItem('userData', JSON.stringify(userData));
        if (userData && !userData.birthday) {
          document.querySelector(".form[data-id='name']").classList.add('form--hidden-animation');
          setTimeout(() => {
            document.querySelector(".form[data-id='name']").classList.add('form--hidden');
            document.querySelector(".form[data-id='date']").classList.remove('form--hidden');
          }, 450);
        } else if (userData && !userData.email) {
          document.querySelector(".form[data-id='name']").classList.add('form--hidden-animation');
          setTimeout(() => {
            document.querySelector(".form[data-id='name']").classList.add('form--hidden');
            document.querySelector(".form[data-id='date']").classList.remove('form--hidden');
          }, 450);
        }
      }
    })();
  };

  document.querySelector(".form[data-id='date']").onsubmit = function (e) {
    e.preventDefault();
    if (!checkBeforeSubmit(e.currentTarget)) return;
    birthday = this.querySelector('input').value;
    (async () => {
      const request = {
        method: 'set-client',
        set: 'birthday',
        birthday,
        outputFormat: 'json',
      };
      const rawResponse = await fetch('[~30~]', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/html',
        },
        body: JSON.stringify(request),
      });

      const result = JSON.parse(await rawResponse.text());
      console.log(result);
      if (!result.success) {
        let message = '';
        result.errors.forEach((error) => {
          message += error;
        });
        document.querySelector('.popup__header').textContent = message;
        showPopup();
      } else {
        const userData = await getUserData();
        localStorage.setItem('userData', JSON.stringify(userData));
        if (!userData.email) {
          document.querySelector(".form[data-id='date']").classList.add('form--hidden-animation');
          setTimeout(() => {
            document.querySelector(".form[data-id='date']").classList.add('form--hidden');
            document.querySelector(".form[data-id='email']").classList.remove('form--hidden');
          }, 450);
        }
      }
    })();
  };
  document.querySelector(".form[data-id='email']").onsubmit = function (e) {
    e.preventDefault();
    if (!checkBeforeSubmit(e.currentTarget)) return;
    email = this.querySelector('input').value;
    console.log(email);
    (async () => {
      const request = {
        method: 'set-client',
        set: 'email',
        email,
        outputFormat: 'json',
      };
      const rawResponse = await fetch('[~30~]', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/html',
        },
        body: JSON.stringify(request),
      });

      const result = JSON.parse(await rawResponse.text());
      console.log(result);
      if (!result.success) {
        let message = '';
        result.errors.forEach((error) => {
          message += error;
        });
        document.querySelector('.popup__header').textContent = message;
        showPopup();
      } else {
        const userData = await getUserData();
        localStorage.setItem('userData', JSON.stringify(userData));
        switch_login_and_cabinet_init();
        // console.log('success');
        // document.querySelector('.popup__header').textContent = "Вы успешно вошли. Вам на почту отправлено письмо для подтверждения email.";
        // let a = document.createElement('a');
        // a.textContent = "Показать меню";
        // a.setAttribute('aria-label', 'Показать меню');
        // a.setAttribute('href', 'https://xleb.ru/catalog.html');
        // a.classList.add('button');
        // a.classList.add('button--color-6');
        // document.querySelector('.popup__container').appendChild(a);
        // showPopup();
      }
    })();
  };

  document.querySelector(".form[data-id='code']").onreset = function (e) {
    document.querySelector(".form[data-id='code']").classList.add('form--hidden-animation');
    document.querySelector(".form[data-id='phone']").classList.add('form--show');
    setTimeout(() => {
      document.querySelector(".form[data-id='phone']").classList.remove('form--hidden');
      document.querySelector(".form[data-id='code']").classList.remove('form--hidden-animation');
      document.querySelector(".form[data-id='code']").classList.add('form--hidden');
    }, 450);
  };


  function checkBeforeSubmit(form) {
    const inputs = form.querySelectorAll('input');
    let result = true;
    inputs.forEach((el, index) => {
      validateInput(el);
      if (el.closest('.form__group').classList.contains('form__group--isInvalid')) {
        el.focus();
        result = false;
        el.blur();
      }
    });
    return result;
  }

  function onlyNumbers(e) {
    if (!/\d/.test(e.key)) e.preventDefault();
  }

  document.querySelectorAll('.expander__button').forEach((el, index) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const box = e.currentTarget.nextElementSibling;
      e.currentTarget.closest('.expander').classList.toggle('expander--opened');
      if (box.style.maxHeight == null) {
        box.style.maxHeight = `${box.scrollHeight}px`;
        setTimeout(() => {
          box.style.maxHeight = '100%';
        }, 500);
      } else {
        box.style.maxHeight = null;
      }
    });
  });

  document.querySelectorAll('.form__input-wrapper--last-number-inputs input').forEach((el, index) => {
    el.addEventListener('focus', (e) => {
      e.currentTarget.closest('.form__group').classList.add('form__group--focused');
      const tips = e.currentTarget.closest('.form__group').querySelectorAll('.form__tips');
      if (tips.length) {
        tips.forEach((el) => { expandBlock(el); });
      }
    });
    el.addEventListener('blur', (e) => {
      const tips = e.currentTarget.closest('.form__group').querySelectorAll('.form__tips');
      if (tips.length) {
        tips.forEach((el) => { expandBlock(el); });
      }
      e.currentTarget.closest('.form__group').classList.remove('form__group--focused');
    });
    el.addEventListener('beforeinput', (e) => {
      el.value = '';
    });
    el.addEventListener('keyup', function (e) {
      const re = /\d/;
      if (this.value.match(re)) {
        try { el.nextElementSibling.focus(); } catch (e) {
          el.closest('.form').querySelector('.button').focus();
        }
      }
      if (el.getAttribute('name') == 'fourth-phone' && checkCodeIsEntered()) {
        document.querySelector(".form[data-id='code'] .button").click();
      }
    });
    el.addEventListener('keypress', onlyNumbers);
  });

  function checkCodeIsEntered() {
    let emptyInputs = 0;
    document.querySelectorAll('.form__input-wrapper--last-number-inputs input').forEach((el) => {
      if (el.value != '') emptyInputs++;
    });
    return emptyInputs == 4;
  }


  document.querySelectorAll('input').forEach((el, index) => {
    el.addEventListener('keyup', function (e) {
      validateInput(this);
    });
  });
  document.querySelectorAll('input[name="date"]').forEach((el, index) => {
    el.addEventListener('keyup', function (e) {
      const v = this.value;
      if (v.match(/^\d{2}$/) !== null) {
        this.value = `${v}.`;
      } else if (v.match(/^\d{2}\.\d{2}$/) !== null) {
        this.value = `${v}.`;
      }
    });
  });

  function validateInput(input) {
    const group = input.closest('.form__group');
    group.classList.add('form__group--checked');
    // if(!input.required) return;
    let result;
    switch (input.name) {
      case 'name':
        result = checkName(input);
        break;
      case 'surname':
        result = checkName(input);
        break;
      case 'create-password':
        result = createPassword(input);
        break;
      case 'confirm-password':
        result = checkConfirmPassword(input);
        break;
      case 'password': break;
      case 'card-number':
        result = checkCardNumber(input);
        break;
      case 'security-code':
        result = checkSecureCode(input);
        break;
      case 'email':
        result = checkEmail(input);
        break;
      case 'login':
        result = notEmptyLogin(input);
        break;
      case 'login-pass':
        result = notEmptyPass(input);
        break;
      case 'phone':
        result = checkPhone(input);
        break;
      case 'date':
        result = checkBirthDate(input);
        break;
      case 'first-phone':
      case 'second-phone':
      case 'third-phone':
      case 'fourth-phone':
        result = lastFourNumber(input);
        break;
      default: return;
    }

    let count = 0;
    result.forEach((el) => {
      el.passed ? count++ : '';
    });

    const wrapper = input.closest('.form__group').querySelector('.form__tips-wrapper');
    const checkForCreated = input.closest('.form__group').querySelector('.form__tips--for-check');
    if (!wrapper) return;
    if (!checkForCreated) {
      console.log('Создаем подсказки');
      const ul = document.createElement('ul');
      wrapper.appendChild(ul);
      ul.classList.add('form__tips');
      ul.classList.add('form__tips--for-check');
      result.forEach((el, index) => {
        const li = document.createElement('li');
        li.classList.add('form__tips-element');
        if (el.passed) {
          li.classList.add('form__tips-element--success');
        } else {
          li.classList.add('form__tips-element--invalid');
        }
        li.textContent = el.text;
        li.setAttribute('data-id', index);
        ul.appendChild(li);
      });
    } else {
      console.log('Подсказки уже существуют');
      result.forEach((el, index) => {
        const li = input.closest('.form__group').querySelectorAll('.form__tips--for-check li')[index];
        if (el.passed) {
          li.classList.remove('form__tips-element--invalid');
          li.classList.add('form__tips-element--success');
          setTimeout(() => {
            li.classList.add('form__tips-element--success-hided');
          }, 450);
        } else {
          li.classList.remove('form__tips-element--success');
          li.classList.remove('form__tips-element--success-hided');
          li.classList.add('form__tips-element--invalid');
        }
      });
    }

    if (count == result.length) {
      input.closest('.form__group').classList.remove('form__group--isInvalid');
    } else {
      input.closest('.form__group').classList.add('form__group--isInvalid');
    }
  }
  function checkPhone(input) {
    const сonditions = [
      { text: 'Номер телефона должен состоять из 11 цифр.', passed: false },
    ];
    phone = input.value;
    const replace = /([_-])|\W+/g;
    const re = /\d{11}/g;
    const value = input.value.replace(replace, '');
    (value.length === 11 && value.match(re)) ? сonditions[0].passed = true : '';
    return сonditions;
  }
  function checkBirthDate(input) {
    const сonditions = [
      { text: 'Введите дату рождения полностью.', passed: false },
    ];
    const re = /[0-9]{2}\.[0-9]{2}\.[0-9]{4}/;
    input.value.match(re) ? сonditions[0].passed = true : '';
    return сonditions;
  }
  function lastFourNumber(input) {
    const сonditions = [
      { text: 'Введите последние 4 цифры номера, с которого вам поступил звонок', passed: false },
    ];
    const re = /\d{4}/;
    let numbers = '';
    input.closest('.form__group').querySelectorAll('input').forEach((el) => {
      numbers += el.value;
    });
    numbers.match(re) ? сonditions[0].passed = true : '';
    code = numbers;
    return сonditions;
  }
  function checkName(input) {
    const сonditions = [
      { text: 'Введите ваше имя.', passed: false },
    ];
    const re = /[а-яА-я]{1,}/ig;
    const result = input.value.match(re);
    if (result) { name = result[0]; сonditions[0].passed = true; }
    return сonditions;
  }

  function notEmptyLogin(input) {
    const сonditions = [
      { text: 'Enter an email/username.', passed: false },
    ];
    const re = /\w{1,}/ig;
    const result = input.value.match(re);
    result ? сonditions[0].passed = true : '';
    return сonditions;
  }

  function notEmptyPass(input) {
    const сonditions = [
      { text: 'Ошибка: Введите пароль.', passed: false },
    ];
    const re = /\w{1,}/ig;
    const result = input.value.match(re);
    result ? сonditions[0].passed = true : '';
    return сonditions;
  }

  function checkCardNumber(input) {
    const сonditions = [
      { text: 'A valid Starbucks card number has 16 digits.', passed: false },
    ];
    const re = /\d{16}/;
    const result = input.value.match(re);
    result ? сonditions[0].passed = true : '';
    return сonditions;
  }

  function checkConfirmPassword(input) {
    const сonditions = [
      { text: 'Пароли не совпадают', passed: false },
    ];
    const re = document.querySelector('input[name="create-password"]').value;
    (re === input.value && re !== '') ? сonditions[0].passed = true : '';
    return сonditions;
  }

  function checkSecureCode(input) {
    const сonditions = [
      { text: 'A valid security code has 8 digits.', passed: false },
    ];
    const re = /\d{8}/;
    const result = input.value.match(re);
    result ? сonditions[0].passed = true : сonditions[0].passed = false;
    return сonditions;
  }

  function checkEmail(input) {
    const сonditions = [
      { text: 'Введите корректный email.', passed: false },
    ];
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const result = re.test(input.value);
    result ? сonditions[0].passed = true : сonditions[0].passed = false;
    return сonditions;
  }

  function createPassword(input) {
    const сonditions = [
      { text: 'From 8 to 25 characters', passed: false },
      { text: 'At least one number', passed: false },
      { text: 'At least one capital letter', passed: false },
      { text: 'At least one lowercase letter', passed: false },
      { text: 'At least one special character such as exclamation point or comma', passed: false },
    ];

    (input.value.length >= 8 && input.value.length <= 25) ? сonditions[0].passed = true : сonditions[0].passed = false;

    const oneNumber = /\d+/;
    input.value.match(oneNumber) ? сonditions[1].passed = true : сonditions[1].passed = false;

    const oneCapital = /[A-Z]+/;
    input.value.match(oneCapital) ? сonditions[2].passed = true : сonditions[2].passed = false;

    const oneLower = /[a-z]+/;
    input.value.match(oneLower) ? сonditions[3].passed = true : сonditions[3].passed = false;

    const another = /\W+/;
    input.value.match(another) ? сonditions[4].passed = true : сonditions[4].passed = false;

    return сonditions;
  }

  document.querySelectorAll('.button--pulse').forEach((el) => {
    el.addEventListener('mousedown', function (e) {
      e.preventDefault();
      const check = e.currentTarget.querySelector('.button__pulse');
      check ? check.remove() : '';
      const div = document.createElement('div');
      this.appendChild(div);
      const rect = e.currentTarget.getBoundingClientRect();
      const left = e.clientX - rect.left;
      const top = e.clientY - rect.top;
      div.classList.add('button__pulse');
      div.style.setProperty('top', `${top}px`);
      div.style.setProperty('left', `${left}px`);
      div.classList.add('button__pulse--animation');
    });
  });

  document.querySelectorAll('.field-input').forEach((el, index) => {
    el.addEventListener('focus', (e) => {
      e.currentTarget.closest('.form__group').classList.add('form__group--focused');
      const tips = e.currentTarget.closest('.form__group').querySelectorAll('.form__tips');
      if (tips.length) {
        tips.forEach((el) => { expandBlock(el); });
      }
    });
    el.addEventListener('blur', (e) => {
      const tips = e.currentTarget.closest('.form__group').querySelectorAll('.form__tips');
      e.currentTarget.closest('.form__group').classList.remove('form__group--focused');
      if (tips.length) {
        tips.forEach((el) => { expandBlock(el); });
      }
    });
  });

  function expandBlock(input) {
    if (input.style.maxHeight == 0 || input.style.maxHeight == '0px') {
      input.style.maxHeight = `${input.scrollHeight}px`;
      setTimeout(() => {
        input.style.maxHeight = '100%';
      }, 250);
    } else if (input.style.maxHeight == '100%') {
      setTimeout(() => {
        if (input.closest('.form__group').classList.contains('form__group--isInvalid')) return;
        if (input.classList.contains('form__tips--info')) return;
        input.style.maxHeight = `${input.scrollHeight}px`;
        input.style.maxHeight = 0;
      }, 250);
    }
  }

  document.querySelectorAll('.tab-triggers__element').forEach((el, index) => {
    el.addEventListener('click', (e) => {
      e.currentTarget.closest('.tab-triggers').querySelectorAll('.tab-triggers__element').forEach((tab, index) => {
        tab.classList.remove('tab-triggers__element--active');
      });
      e.currentTarget.classList.add('tab-triggers__element--active');
      const n = e.currentTarget.getAttribute('data-box');
      const g = e.currentTarget.closest('.tab-triggers').getAttribute('data-group');
      document.querySelectorAll(`.tab-boxes[data-group="${g}"] .tab-boxes__element`).forEach((el, index) => {
        el.classList.add('tab-boxes__element--hidden');
      });
      document.querySelector(`.tab-boxes[data-group="${g}"] .tab-boxes__element[data-box="${n}"]`).classList.remove('tab-boxes__element--hidden');
    });
  });

  document.querySelectorAll('.form__clickable-icon .form__icon').forEach((el, index) => {
    el.addEventListener('click', (e) => {
      const input = e.currentTarget.closest('.form__group').querySelector('.field-input');
      if (input.getAttribute('type') != 'password') {
        input.setAttribute('type', 'password');
      } else {
        input.setAttribute('type', 'text');
      }
      e.currentTarget.closest('.form__clickable-icon').querySelector('.form__clickable-icon .form__icon:not(.form__icon--active)').classList.add('form__icon--active');
      e.currentTarget.classList.remove('form__icon--active');
    });
  });

  document.querySelectorAll('a[data-type="skip"]').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      if (localStorage.getItem('userData')) {
        // document.querySelector('.popup__header').textContent = "Вы успешно вошли";
        // let a = document.createElement('a');
        // a.textContent = "Показать меню";
        // a.setAttribute('aria-label', 'Показать меню');
        // a.setAttribute('href', 'catalog.html');
        // a.classList.add('button');
        // a.classList.add('button--color-6');
        // document.querySelector('.popup__container').appendChild(a);
      } else {
        document.querySelector('.popup__header').textContent = 'Авторизация не удалась, попробуйте позже';
        showPopup();
      }
      switch_login_and_cabinet_init();
    });
  });
});

function resetForms() {
  document.querySelector(".form[data-id='phone']").classList.remove('form--hidden');
  document.querySelector(".form[data-id='phone']").classList.remove('form--hidden-animation');
  document.querySelector(".form[data-id='code']").classList.add('form--hidden');
  document.querySelector(".form[data-id='code']").classList.remove('form--hidden-animation');
  document.querySelector(".form[data-id='code']").querySelectorAll('input').forEach((el) => el.value = '');
  document.querySelector(".form[data-id='name']").classList.add('form--hidden');
  document.querySelector(".form[data-id='name']").classList.remove('form--hidden-animation');
  document.querySelector(".form[data-id='name']").querySelector('input').value = '';
  document.querySelector(".form[data-id='date']").classList.add('form--hidden');
  document.querySelector(".form[data-id='date']").classList.remove('form--hidden-animation');
  document.querySelector(".form[data-id='date']").querySelector('input').value = '';
  document.querySelector(".form[data-id='email']").classList.add('form--hidden');
  document.querySelector(".form[data-id='email']").classList.remove('form--hidden-animation');
  document.querySelector(".form[data-id='email']").querySelector('input').value = '';
}
