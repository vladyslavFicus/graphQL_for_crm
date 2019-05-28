const fetch = require('../fetch');
const parseJson = require('../parseJson');
const buildQueryString = require('../buildQueryString');
const { PAYMENT_TYPES } = require('../../constants/payment');

// weird behaviour, need to check
const paymentTypeUrlMatcher = {
  deposit: 'deposit/manual',
  withdraw: 'withdraw',
  confiscate: 'confiscate',
};

const getUrlFromPaymentType = paymentType => paymentTypeUrlMatcher[paymentType.toLowerCase()];

const getTradingPayments = (args, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/trading_payment/search`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization,
    },
    body: JSON.stringify(args),
  }).then(response => response.json());
};

const getCasinoPayments = (args, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/payment_view/payments?${buildQueryString(args, true)}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  })
    .then(response => response.text())
    .then(response => parseJson(response));
};

const getPaymentMethods = (args, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/payment/methods?${buildQueryString(args)}`, {
    method: 'GET',
    headers: {
      authorization,
    },
  })
    .then(response => response.text())
    .then(response => parseJson(response));
};

const getCasinoPaymentsByUuid = ({ playerUUID, ...args }, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/payment_view/payments/${playerUUID}?${buildQueryString(args)}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  })
    .then(response => response.text())
    .then(response => parseJson(response));
};

const getPaymentsStatistics = (data, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/trading_payment/statistics`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(response => response.json());
};

const createTradingPayment = (paymentType, args, authorization) => {
  let postfix = null;

  if ([PAYMENT_TYPES.DEPOSIT.toLowerCase()].includes(paymentType.toLowerCase())) {
    postfix = '/manual';
  }

  return fetch(`${global.appConfig.apiUrl}/trading_payment/${paymentType.toLowerCase()}${postfix || ''}`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization,
    },
    body: JSON.stringify(args),
  }).then(response => response.json());
};

const createCasinoPayment = ({ playerUUID, paymentType, ...args }, authorization) => {
  const url = getUrlFromPaymentType(paymentType);
  return fetch(`${global.appConfig.apiUrl}/payment/payments/${playerUUID}/${url}`, {
    method: 'PUT',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  })
    .then(response => response.text())
    .then(response => parseJson(response))
    .then(response => response);
};

module.exports = {
  getTradingPayments,
  getCasinoPayments,
  getPaymentMethods,
  getCasinoPaymentsByUuid,
  getPaymentsStatistics,
  createTradingPayment,
  createCasinoPayment,
};
