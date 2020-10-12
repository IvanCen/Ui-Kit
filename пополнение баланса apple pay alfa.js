if (typeof ApplePay !== 'undefined' && typeof ApplePay.makePaymentRequest === 'function') {
  ApplePay.makePaymentRequest(
    {
      items: [

        {
          label: 'Balance recharge 10',
          amount: 10.00,
        },
      ],
      shippingMethods: [
      ],
      supportedNetworks: ['visa', 'masterCard', 'discover'],
      merchantCapabilities: ['3ds', 'debit', 'credit'],
      merchantIdentifier: 'merchant.ru.xleb.app',
      currencyCode: 'RUB',
      countryCode: 'RU',
      billingAddressRequirement: 'none',
      shippingAddressRequirement: 'none',
      shippingType: 'shipping',
    },
  )
    .then((paymentResponse) => {
      // alert('OKDATA:'+JSON.stringify(token.paymentData));
      (async () => {
        const request = {
          method: 'recharge_the_balance',
          user: '+79522655566',
          amount: 10,
          creditCardProvider: 'AlfaApplePay',
          paymentToken: token.paymentData,
          outputFormat: 'json',
        };
        const rawResponse = await fetch('[~30~]', {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'text/html',
          },
          body: JSON.stringify(request),
        });
        const textResponse = await rawResponse.text();
        // alert(textResponse);
        const jsResponse = JSON.parse(textResponse);
        if (jsResponse.success) {
          ApplePay.completeLastTransaction('success');
        } else {
          ApplePay.completeLastTransaction('failure');
        }
        //   console.log(JSON.parse(await rawResponse.text()));
      })();
    })
    .catch((e) => {
      alert('Не удалось пополнить баланс с помощью apple pay');
    });
}
