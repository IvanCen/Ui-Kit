(function createLoader() {
  const loader = document.querySelector('.loader__text');
  const phrases = ['Просеивам муку', 'Раскатываем тесто', 'Разогреваем духовку', 'Обжариваем кофейные зерна', 'Взбиваем сливки'];
  setInterval(() => {
    loader.textContent = phrases[Math.floor(Math.random() * phrases.length)];
  }, 2000);
}());
