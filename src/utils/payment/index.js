const {
  getTradingPayments,
  getCasinoPayments,
  getPaymentMethods,
  getCasinoPaymentsByUuid,
  getPaymentsStatistics,
  createTradingPayment,
  createCasinoPayment,
} = require('./paymentRequests');

module.exports = {
  queries: {
    getTradingPayments,
    getCasinoPayments,
    getPaymentMethods,
    getCasinoPaymentsByUuid,
    getPaymentsStatistics,
    createTradingPayment,
    createCasinoPayment,
  },
};
