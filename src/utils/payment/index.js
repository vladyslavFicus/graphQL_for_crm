const {
  getPayments: getPaymentsQuery,
  getPaymentsStatistics: getPaymentsStatisticsQuery,
  createPayment: createPaymentQuery,
  getPaymentMethods: getPaymentMethodsQuery,
  getManualPaymentMethods: getManualPaymentMethodsQuery,
} = require('./paymentRequests');

module.exports = {
  getPaymentsQuery,
  getPaymentsStatisticsQuery,
  createPaymentQuery,
  getPaymentMethodsQuery,
  getManualPaymentMethodsQuery,
};
