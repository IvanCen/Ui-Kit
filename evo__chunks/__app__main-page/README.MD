 # Чанк __app-template__main-page

* Все чанки подключаются сюда в main.html
* Вся первоначальная логика по запросам к серверу идет отсюда
* Все экземпляры страниц (page) для дальнейшей работы создаются здесь
* Данные пришедшие от сервера хранятся в соответствующих переменных 
или берутся или локалстораджа и в последующем могут 
использоваться в любом месте приложения (посмотреть так же что в них 
хранится можно по названию в консоли)
``` 
let orderInfo;
let orderPayInfo;
let orderComment;
let userMessages;
const itemsArray = JSON.parse(localStorage.getItem('items')) || [];
const basketArray = JSON.parse(localStorage.getItem('basket')) || [];
const userDataObj = JSON.parse(localStorage.getItem('userData')) || {};
const applicationDataObj = JSON.parse(localStorage.getItem('applicationData')) || {};
const storesDataObj = JSON.parse(localStorage.getItem('storesData')) || {};
const userInfoObj = JSON.parse(localStorage.getItem('userInfo')) || {};
const userLastOrdersObj = JSON.parse(localStorage.getItem('userLastOrders')) || {};
const userStore = JSON.parse(localStorage.getItem('userStore')) || {};
const userBalanceLog = JSON.parse(localStorage.getItem('userBalanceLog')) || {};
const userBonusLog = JSON.parse(localStorage.getItem('userBonusLog')) || {};
const dataProductApi = JSON.parse(localStorage.getItem('productData')) || {};
const userFavoriteStore = JSON.parse(localStorage.getItem('userFavoriteStore')) || {};
```
