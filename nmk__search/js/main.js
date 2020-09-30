let AllItemsForSearch; let
  AllModifiersForSearch;

document.addEventListener('DOMContentLoaded', onDOMContentLoaded);

function onDOMContentLoaded() {
  console.log('onDOMContentLoaded', allItems);
  const searchBtn = document.querySelector('.catalog__categories-element--search');
  if (!searchBtn) return;
  const search = document.querySelector('.search');
  const closeBtn = document.querySelector('.search__close');
  const clearBtn = document.querySelector('.search__form-input-clear');
  const searchField = document.querySelector('.search__form-input');
  const searchResult = document.querySelector('.search__result');
  const searchCount = document.querySelector('.search__result-count');
  searchBtn.addEventListener('click', () => {
    showSearch();
    search.classList.add('search--opened');
  });
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      search.classList.remove('search--opened');
    });
  }
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      clearBtn.parentElement.querySelector('input').value = '';
      searchResult.querySelector('.search__result-container').innerHTML = '';
      searchResult.classList.add('search__result--empty');
    });
  }
  if (searchField) {
    searchField.addEventListener('input', () => {
      const founded = {};
      for (const id in AllItemsForSearch) {
        console.log(searchField.value.toLowerCase(), id, id.indexOf(searchField.value));
        if (id.indexOf(searchField.value.toLowerCase()) != -1) {
          founded[id] = AllItemsForSearch[id];
        }
      }
      if (isEmptyObj(founded) || searchField.value == '') {
        searchResult.querySelector('.search__result-container').innerHTML = '';
        searchResult.classList.add('search__result--empty');
      } else {
        searchResult.classList.remove('search__result--empty');
        let count = 0;
        for (const id in AllItemsForSearch) {
          if (id.indexOf(searchField.value) != -1) {
            count++;
            founded[id] = AllItemsForSearch[id];
          }
        }
        searchCount.textContent = `${count} товаров`;
        console.log(founded);
        searchResult.querySelector('.search__result-container').innerHTML = '';
        createFoundedElements(founded);
      }
    });
  }
}

function createFoundedElements(founded) {
  const container = document.querySelector('.search__result-container');
  for (const id in founded) {
    const item = founded[id];
    console.log(item);

    const element = document.createElement('div');
    element.classList.add('search__list-element');

    const image = document.createElement('div');
    image.classList.add('search__list-element-image');
    image.style.backgroundImage = `url(${item.mainPhoto.name})`;

    const detail = document.createElement('div');
    detail.classList.add('search__list-element-detail');

    element.append(image, detail);

    const title = document.createElement('div');
    title.classList.add('search__list-element-title');
    const name = document.createElement('div');
    name.classList.add('search__list-element-name');
    name.textContent = item.name;
    const price = document.createElement('div');
    price.classList.add('search__list-element-price');
    price.textContent = `${item.price} ₽`;
    title.append(name, price);

    const additional = document.createElement('div');
    additional.classList.add('search__list-element-additional');
    const weight = document.createElement('div');
    weight.classList.add('search__list-element-name');
    if (item.volume || item.netWeight) weight.textContent = item.volume ? `${item.volume} мл` : `${item.netWeight} г`;
    const plus = document.createElement('div');
    plus.classList.add('search__list-element-plus');
    plus.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle opacity="0.12" cx="12.0001" cy="12" r="12" fill="#E6551E"></circle>
                            <path d="M12.0001 6.75V17.25" stroke="#E6551E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path d="M6.75006 12H17.2501" stroke="#E6551E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>`;
    additional.append(weight, plus);

    detail.append(title, additional);

    container.append(element);
  }
}

function showSearch() {
  (async () => {
    if (allItems) {
      AllItemsForSearch = { ...allItems };
      AllModifiersForSearch = { ...allMidifiers };
    } else {
      const request = {
        method: 'get-catalog',
        view: 'tree',
        outputFormat: 'json',
      };
      const rawResponse = await fetch('[~30~]', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/html',
        },
        body: JSON.stringify(request),
      });
      const { successData } = JSON.parse(await rawResponse.text());
      AllItemsForSearch = await successData.items;
      AllModifiersForSearch = await successData.modifiers;
    }
    const newAllItemsForSearch = {};
    for (const id in AllItemsForSearch) {
      newAllItemsForSearch[AllItemsForSearch[id].name.toLowerCase()] = AllItemsForSearch[id];
    }
    AllItemsForSearch = newAllItemsForSearch;
  })();
}

window.showSearch = showSearch;

// function activeMapTouch(container) {
//     let dragStart = 0;
//     let dragEnd = 0;
//     let offsetY = 0;
//     let offsetYOnStart = 0;
//     let isOpen = false;
//     const isMapOpen = localStorage.getItem('isMapListOpen');
//
//     if (isMapOpen === 'false') {
//         offsetY = container.offsetHeight - 43;
//         offsetYOnStart = container.offsetHeight - 43;
//         container.style.transform = translate3d(0,${offsetY}px,0);
//     }
//
//     function mapAnimation(action) {
//         if (offsetY > 50 && !isOpen && action === 'end') {
//             offsetY = container.offsetHeight - 43;
//             offsetYOnStart = container.offsetHeight - 43;
//             isOpen = !isOpen;
//             localStorage.setItem('isMapListOpen', 'false');
//         } else if (offsetY > (container.offsetHeight - 43) && action === 'move' && isOpen) {
//             offsetY = container.offsetHeight - 43;
//             offsetYOnStart = container.offsetHeight - 43;
//         } else if (offsetY < (container.offsetHeight - 100) && action === 'end' && isOpen) {
//             offsetY = 0;
//             offsetYOnStart = 0;
//             isOpen = !isOpen;
//             localStorage.setItem('isMapListOpen', 'true');
//         }
//         if (offsetY < 0) {
//             // тут действия, если тянется дальше максимума
//             if (action === 'end') {
//                 offsetY = 0;
//                 dragStart = 0;
//                 dragEnd = 0;
//                 offsetYOnStart = 0;
//             } else if (action === 'move') {
//                 offsetY = 0;// уменьшапем скорость смещения в 2 раза
//             }
//         }
//         // console.log(offsetY, dragStart, dragEnd, offsetYOnStart);
//
//         container.style.transform = translate3d(0,${offsetY}px,0);
//     }
//
//     const panelTouch = container.querySelector('.top-bar-search--size--small');
//     panelTouch.addEventListener('touchstart', (event) => {
//         dragStart = event.touches[0].clientY;
//         container.classList.add('map--with-animation');
//     }, { passive: false });
//
//     panelTouch.addEventListener('touchmove', (event) => {
//         dragEnd = event.touches[0].clientY;
//         offsetY = offsetYOnStart + dragEnd - dragStart;
//         mapAnimation('move');
//     }, { passive: false });
//
//     panelTouch.addEventListener('touchend', (event) => {
//         offsetYOnStart = offsetY;
//         container.classList.add('map--with-animation');
//         mapAnimation('end');
//     }, { passive: false });
// }
