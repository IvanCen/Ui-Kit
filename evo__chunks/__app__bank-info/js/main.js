const button = document.querySelector('.button');

button.addEventListener('click', (e) => {
  e.preventDefault();
  if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    const link = document.querySelector('.link');
    link.href = 'ionic://localhost';
    link.click();
  } else {
    const win = window.open('about:blank', '_self');
    win.close();
    window.close();
  }
});
