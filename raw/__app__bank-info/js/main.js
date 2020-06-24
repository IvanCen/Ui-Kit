/*if (/\?refer=alfa.*!/.test(window.location.search)) {
  const win = window.open('about:blank', '_self');
  win.close();
}*/

try {
  const win = window.open('about:blank', '_self');
  win.close();
  window.close()
} catch (e) {
  console.log(e);
}
