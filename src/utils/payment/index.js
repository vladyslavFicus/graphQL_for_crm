const { getPayments, getPaymentsStatistics, createPayment } = require('./paymentRequests');

module.exports = {
  queries: {
    getPayments,
    getPaymentsStatistics,
    createPayment,
  },
};
