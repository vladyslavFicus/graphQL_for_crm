const RESTDataSource = require('@hrzn/apollo-datasource/RESTDataSource');

class PaymentAPI extends RESTDataSource {
  /**
   * Get payments
   *
   * @param args
   *
   * @return {Promise}
   */
  getPayments(args) {
    return this.post('/search', args);
  }

  /**
   * Get payment methods
   *
   * @return {Promise}
   */
  getPaymentMethods() {
    return this.get('/metadata/payment-methods');
  }

  /**
   * Get manual payment methods
   *
   * @return {Promise}
   */
  getManualPaymentMethods() {
    return this.get('/metadata/manual-payment-methods');
  }

  /**
   * Get payments statistics
   *
   * @param args
   *
   * @return {Promise}
   */
  // # TODO
  getPaymentsStatistics(args) {
    return this.post('/statistics', args);
  }

  /**
   * Create payment
   *
   * @param args
   * @param postfix ('', '/manual') - needed for Deposit by Operator (manual)
   * @param paymentType (DEPOSIT, WITHDRAW, TRANSFER, CREDIT_IN, CREDIT_OUT)
   *
   * @return {Promise}
   */
  createPayment(args, postfix, paymentType) {
    return this.post(`/${paymentType.toLowerCase()}${postfix}`, args);
  }

  /**
   * Approve or Reject payment
   *
   * @param args
   * @param typeAcc ('approve', 'reject')
   *
   * @return {Promise}
   */
  acceptPayment({ typeAcc, ...args }) {
    return this.put(`/${typeAcc}`, args);
  }

  /**
   * Change payment method
   *
   * @param paymentId
   * @param args
   *
   * @return {Promise}
   */
  changePaymentMethod({ paymentId, ...args }) {
    return this.put(`/${paymentId}/method`, args);
  }

  /**
   * Change original agent
   *
   * @param paymentId
   * @param args
   *
   * @return {Promise}
   */
  changeOriginalAgent({ paymentId, ...args }) {
    return this.put(`/${paymentId}/agent`, args);
  }
}

module.exports = PaymentAPI;
