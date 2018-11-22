const { getStatistic, normalizeAccumulated } = require('./paymentUtils');

const {
  getTradingPayments,
  getCasinoPayments,
  getPaymentMethods,
  getCasinoPaymentsByUuid,
  getClientPaymentsStatistic,
  createTradingPayment,
  createCasinoPayment,
} = require('./paymentRequests');

module.exports = {
  queries: {
    getTradingPayments,
    getCasinoPayments,
    getPaymentMethods,
    getCasinoPaymentsByUuid,
    getClientPaymentsStatistic,
    createTradingPayment,
    createCasinoPayment,
  },
  getStatistic,
  normalizeAccumulated,
};
