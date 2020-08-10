 # Чанк __app-template__main-page

* Все чанки подключаются сюда в main.html
* Вся первоначальная логика по запросам к серверу идет отсюда
* Все экземпляры страниц (page) для дальнейшей работы создаются здесь
* Данные пришедшие от сервера хранятся в соответствующих переменных 
или берутся или локалстораджа и в последующем могут 
использоваться в любом месте приложения (посмотреть так же что в них 
хранится можно по названию в консоли)
* Происходит предварительный рендер страниц (категории) для их хэширования 
(функция renderHashOrderCategoryPage)
* Конструкция сделана для проверки извлеченных данных из локал стораджа:
``` 
Пример: 
let userAchievementsLet;
try {
  userAchievementsLet = JSON.parse(localStorage.getItem('userAchievements')) || {};
} catch (e) {
  userAchievementsLet = {};
  api.sendDebugMessage(e);
}
const userAchievements = userAchievementsLet;
```
