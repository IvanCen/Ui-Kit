(function createLoader() {
  const loader = document.querySelector('.loader__text');
  const frases = ['Просеивам муку', 'Раскатываем тесто', 'Разогреваем духовку', 'Обжариваем кофейные зерна', 'Взбиваем сливки'];
  setInterval(() => {
    loader.textContent = frases[Math.floor(Math.random() * frases.length)];
  }, 2000);
}());
