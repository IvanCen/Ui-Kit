/**
 * Функция создания пре-лоадера
 * @return {HTMLDivElement}
 */
function createPreLoader() {
  const preLoader = document.createElement('div');
  const template = `
  <svg class="preLoader__logo" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.38 1.84009C12.36 1.84009 9.29002 5.16009 8.56002 9.19009C8.54002 9.31009 8.38002 9.33009 8.33002 9.22009C7.95002 8.33009 7.74002 7.36009 7.74002 6.34009C7.74002 4.72009 8.27002 3.22009 9.16002 2.02009C8.67002 1.90009 8.15002 1.84009 7.62002 1.84009C3.91002 1.84009 0.900024 4.85009 0.900024 8.56009C0.900024 14.4801 12 22.1601 12 22.1601C12 22.1601 23.1 14.4801 23.1 8.56009C23.1 4.85009 20.09 1.84009 16.38 1.84009ZM16.38 11.1501C14.95 11.1501 13.79 9.99009 13.79 8.56009C13.79 7.13009 14.95 5.97009 16.38 5.97009C17.81 5.97009 18.97 7.13009 18.97 8.56009C18.97 9.99009 17.81 11.1501 16.38 11.1501Z" fill="#ffffff"/>
  </svg>
  <div class="preLoader__text preLoader__text--animation"></div>
  `;
  preLoader.classList.add('preLoader');
  preLoader.insertAdjacentHTML('beforeend', template);
  return preLoader;
}

/**
 * Функция установки случайной фразы пре-лоадеру
 * @param preLoader элемент пре-лоадер
 */
function setRandomPhrasesPreLoader(preLoader) {
  const preLoaderText = preLoader.querySelector('.preLoader__text');
  const phrases = ['Просеивам муку', 'Раскатываем тесто', 'Разогреваем духовку', 'Обжариваем кофейные зерна', 'Взбиваем сливки'];
  setInterval(() => {
    preLoaderText.textContent = phrases[Math.floor(Math.random() * phrases.length)];
  }, 2000);
}

/**
 * Создает экземпляр пре-лоадера, добавляет в DOM и запускает функция установки случайной фразы
 */
function renderPreLoader() {
  const preLoader = createPreLoader();
  document.body.append(preLoader);
  setRandomPhrasesPreLoader(preLoader);
}

/**
 * Функция запускающая пре-лоадер
 */
function runPreloader() {
  renderPreLoader();
}

/**
 * Функция скрывающая пре-лоадер
 */
function stopPreloader() {
  const preLoader = document.querySelector('.preLoader');
  preLoader.classList.add('preLoader--hide');
}
