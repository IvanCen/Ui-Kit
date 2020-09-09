(async () => {
  const request = {
    method: 'get-app',
    outputFormat: 'json',
    mode: 'no-cors',
  };
  const rawResponse = await fetch('https://test-app.xleb.ru/api.html', {
    method: 'POST',

    headers: {
      'Content-Type': 'text/html',

    },
    body: JSON.stringify(request),
  });
  const bodyRes = JSON.parse(await rawResponse.text());
  console.log(bodyRes);

  let styles = '';
  let scripts = '';

  bodyRes.successData.styles.forEach((style) => styles += style);
  bodyRes.successData.scripts.forEach((script) => scripts += script);

  const styleEl = document.createElement('style');
  const scriptEl = document.createElement('script');

  styleEl.textContent = styles;
  scriptEl.textContent = scripts;

  document.head.appendChild(styleEl);
  document.body.appendChild(scriptEl);
})();
