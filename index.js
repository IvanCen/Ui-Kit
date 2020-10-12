function createApp() {
  let styles = '';
  let scripts = '';
  let stylesAndScriptsLet;
  try {
    stylesAndScriptsLet = JSON.parse(localStorage.getItem('stylesAndScripts'));
  } catch (e) {
    stylesAndScriptsLet = [];
  }
  const stylesAndScripts = stylesAndScriptsLet;
  console.log(stylesAndScripts);
  stylesAndScripts.styles.forEach((style) => styles += style);
  stylesAndScripts.scripts.forEach((script) => scripts += script);

  const styleEl = document.createElement('style');
  const scriptEl = document.createElement('script');

  styleEl.textContent = styles;
  scriptEl.textContent = scripts;

  document.head.appendChild(styleEl);
  document.body.appendChild(scriptEl);
}

(async () => {
  const request = {
    method: 'get-app',
    outputFormat: 'json',
    mode: 'no-cors',
  };
  try {
    const rawResponse = await fetch('https://test-app.xleb.ru/api.html', {
      method: 'POST',

      headers: {
        'Content-Type': 'text/html',

      },
      body: JSON.stringify(request),
    });
    const bodyRes = JSON.parse(await rawResponse.text());
    console.log(bodyRes);
    if (bodyRes.success) {
      localStorage.setItem('stylesAndScripts', JSON.stringify(bodyRes.successData));
    }
    createApp();
  } catch (e) {
    createApp();
  }
})();
