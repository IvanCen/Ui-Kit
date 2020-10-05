//document.addEventListener('DOMContentLoaded', BindingHistoryApi);

function BindingHistoryApi() {
  window.onpopstate = function (event) {
    // console.log(event.state);
    renderRoute();
  };

  function alwaysCloseHash() {
    toggleModalPage.closePage();
    toggleModalPage.deletePage();
    toggleModalPageOrderReview.closePage();
    toggleModalPageOrderReview.deletePage();
    toggleModalPageOrderPayment.closePage();
    toggleModalPageOrderPayment.deletePage();
    toggleModalPageSignIn.closePage();
    toggleModalPageSignIn.deletePage();
    toggleModalPageStoresSearch.closePage();
    toggleModalPageStoresSearch.deletePage();
  }

  const routes = [
    {
      path: '',
      content: () => {
        closePages();
      },
    },
    {
      path: '#',
      content: () => {
        closePages();
      },
    },
    {
      path: '#page',
      content: () => {
        toggleSubPage.closePage();
        toggleSubPage.deletePage();
        alwaysCloseHash();
      },
    },
    {
      path: '#page-order',
      content: () => {
        toggleSubPage.closePage();
        toggleSubPage.deletePage();
        alwaysCloseHash();
      },
    },
    {
      path: '#subpage',
      content: () => {
        toggleThirdPage.closePage();
        toggleThirdPage.deletePage();
        alwaysCloseHash();
      },
    },
    {
      path: '#page-third',
      content: () => {
        alwaysCloseHash();
      },
    },
    {
      path: '#modal-page-stores',
      content: () => {
        toggleModalPageStoresSearch.closePage();
        toggleModalPageStoresSearch.deletePage();
      },
    },
    {
      path: '#modal-page-order-review',
      content: () => {
        toggleModalPageOrderPayment.closePage();
        toggleModalPageOrderPayment.deletePage();
      },
    },
    {
      path: '#modal-page-order-payment',
      content: () => {
        toggleModalPage.closePage();
        toggleModalPage.deletePage();
      },
    },
  ];

  // Вспомогательная функция
  function renderRoute() {
    console.log('renderRoutes');

    function isUndefined(z) {
      return typeof z === 'undefined'; // Только строгое сравнение
      // Если undefined, то функция вернет "true"
    }

    // const url = router.getURL(); // По сути let url = window.location.hash.slice(1)

    const route = routes.find((r) => r.path === window.location.hash);
    // console.log(url, route);
    // Перебираем массив "routes" и ищем роут с "path", равным переменной "url"
    try {
      route.content();
    } catch (e) {
      console.log(e);
    }

    // if (isUndefined(route)) {
    //     // И снова перебор
    //     route = routes.find(r => r.path === "***");
    //     // Если роута с таким "path" нет, то адрес сменится на "***", это страница 404
    // }

    // // Создаем переменную "routerView" с нужным нам для рендера элементом
    // var routerView = document.querySelector("#router-view");
    //
    // // Проверяем наличие нужного нам элемента в файле html
    // if (!view) {
    //     console.log("Не удалось найти view-элемент!") // Если элемента нет
    // } else {
    //     routerView.innerHTML = route.content; // Если элемент есть
    // }
  }
}
