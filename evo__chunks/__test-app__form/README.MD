 # Чанк __app__form

Чанк - класс форм ввода данных

+ Используется:
    + Авторизация,
    + Редактирование данных в ЛК,
    + Формы ввода комментария и данных друга в корзине,

* inputVisibleTogglePass - функция показа\скрытия видимости пароля для пользователя по нажатию
* inputFlyLabel - функция анимации поднятия\опускания лейбла инпута при фокусе на поле ввода
* validation - функция валидации полей ввода (имени, пароля + повторного ввода пароля, емэйла)
Поле инпута должно быть такого формата: 
 ```
<div class="form__input">
  <label class="form__input-underlined">
    <input class="form__input-area form__input-area--font--normal form__input-area--type--fly-label form__input-area--type--name" minlength="2">
    <span class="form__input-label">{{название лейбла}}</span>
    <ul class="form__input-requirements">
      <li class="form__input-requirement form__input-requirement--type--name">{{строчка ошибки с соответствующим полю названию класса}}</li>
    </ul>
 </label>
</div>
```
в список ul заранее прописываются элементы li по количеству полей ошибок валидации
Внутри функции валидации такого формата: 
```
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

 ```
функция `isInvalid` должна возвращать `boolean`
Каждая строчка имеет свою ошибку валидации. В `element` прописывается в каком поле будет показыватся ошибка
Кнопка по которой отправляются данные должна иметь класс `.form__button` и будет отключена для нажатия при ошибке валидации
