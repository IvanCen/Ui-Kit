try {
  const button = document.querySelector('.button');
  button.addEventListener('click', () => {
    const win = window.open('about:blank', '_self');
    win.close();
    window.close();
  });
} catch (e) {
  console.log(e);
}
