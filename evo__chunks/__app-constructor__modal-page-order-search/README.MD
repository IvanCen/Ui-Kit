 # Чанк __app-constructor__page-order-search

## Страница поиска товаров

* наследуется от fifthPage (контейнер) и создается на основе экземпляров компонентов в методе rendering
    * метод rendering принимает два параметра - 
        1. isCategory булево значение, с обозначением категория ли это и 
        2. categoryId id категории 
    * при вводе проверяет условием isCategory, и отправляет введенный текст в один из методов
    в зависимости от истинности 
        1. searchItemCategory
        2. searchItem
        
* searchItemCategory - ищет в конкретной категории 
* searchItem - ищет во всех товарах

