/**
 * Функция отправляющая запрос к основному API
 * @param method обязательный параметр {string}
 * @param request {object} параметры запроса (необязательная, по умолчанию {object})
 * @param outputFormat {string} (необязательная, по умолчанию 'json')
 * @return {promise}
 * */

async function makeApiRequest(method, request = {}, outputFormat = 'json') {
  request.outputFormat = outputFormat;
  request.method = method;
  try {
    const rawResponse = await fetch('[~30~]', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/html',
      },
      body: JSON.stringify(request),
    });

    const response = await rawResponse.text();
    if (response) {
      if (outputFormat !== 'json') {
        return response;
      }
      return JSON.parse(response);
    }
    return false;
  } catch (e) {
    catchError(e);
    return false;
  }
}
