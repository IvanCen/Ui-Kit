(async () => {
  const request = {
    method: 'get-shops',
    outputFormat: 'json',
  };
  const rawResponse = await fetch('[~30~]', {
    method: 'POST',
    headers: {
      'Content-Type': 'text/html',
    },
    body: JSON.stringify(request),
  });
  console.log(JSON.parse(await rawResponse.text()));
})();
(async () => {
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
  console.log(JSON.parse(await rawResponse.text()));
})();
(async () => {
  const request = {
    method: 'get-promo',
    offset: 0,
    length: 2,
    outputFormat: 'json',
  };
  const rawResponse = await fetch('[~30~]', {
    method: 'POST',
    headers: {
      'Content-Type': 'text/html',
    },
    body: JSON.stringify(request),
  });
  console.log(JSON.parse(await rawResponse.text()));
})();
(async () => {
  const request = {
    method: 'get-posts',
    offset: 0,
    length: 1,
    outputFormat: 'json',
  };
  const rawResponse = await fetch('[~30~]', {
    method: 'POST',
    headers: {
      'Content-Type': 'text/html',
    },
    body: JSON.stringify(request),
  });
  console.log(JSON.parse(await rawResponse.text()));
})();
