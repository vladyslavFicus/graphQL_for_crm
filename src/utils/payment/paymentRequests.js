const fetch = require('../fetch');
const { PAYMENT_TYPES } = require('../../constants/payment');

const getPayments = (args, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/payment/search`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization,
    },
    body: JSON.stringify(args),
  }).then(response => response.json());
};

const createPayment = (paymentType, args, authorization) => {
  let postfix = null;

  if ([PAYMENT_TYPES.DEPOSIT.toLowerCase()].includes(paymentType.toLowerCase())) {
    postfix = '/manual';
  }
  return fetch(`${global.appConfig.apiUrl}/payment/${paymentType.toLowerCase()}${postfix || ''}`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization,
    },
    body: JSON.stringify(args),
  }).then(response => response.json());
};

const getPaymentsStatistics = (data, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/payment/statistics`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(response => response.json());
};

module.exports = {
  getPayments,
  createPayment,
  getPaymentsStatistics,
};
