const { getTradingPayments, getPaymentsStatistics, createTradingPayment } = require('./paymentRequests');

module.exports = {
  queries: {
    getTradingPayments,
    getPaymentsStatistics,
    createTradingPayment,
  },
};
