const RESTDataSource = require('@hrzn/apollo-datasource/RESTDataSource');

class PaymentAPI extends RESTDataSource {
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
   * Get payment systems
   *
   * @return {Promise}
   */
  getPaymentSystems() {
    return this.get('/metadata/payment-systems');
  }

  /**
   * Get payments statistic
   *
   * @param args
   *
   * @return {Promise}
   */
  getPaymentsStatistic(args) {
    return this.post('/statistics', args);
  }

  /**
   * Create deposit payment
   *
   * @param args
   *
   * @return {Promise}
   */
  createDepositPayment(args) {
    return this.post('/deposit/manual', args);
  }

  /**
   * Create withdraw payment
   *
   * @param args
   *
   * @return {Promise}
   */
  createWithdrawPayment(args) {
    return this.post('/withdraw', args);
  }

  /**
   * Create transfer payment
   *
   * @param args
   *
   * @return {Promise}
   */
  createTransferPayment(args) {
    return this.post('/transfer', args);
  }

  /**
   * Create credit_in payment
   *
   * @param args
   *
   * @return {Promise}
   */
  createCreditInPayment(args) {
    return this.post('/credit_in', args);
  }

  /**
   * Create credit_out payment
   *
   * @param args
   *
   * @return {Promise}
   */
  createCreditOutPayment(args) {
    return this.post('/credit_out', args);
  }

  /**
   * Create commission payment
   *
   * @param args
   *
   * @return {Promise}
   */
  createCommissionPayment(args) {
    return this.post('/commission', args);
  }

  /**
   * Approve payment
   *
   * @param args
   *
   * @return {Promise}
   */
  approvePayment(args) {
    return this.put('/approve', args);
  }

  /**
   * Reject payment
   *
   * @param args
   *
   * @return {Promise}
   */
  rejectPayment(args) {
    return this.put('/reject', args);
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
   * Change payment status
   *
   * @param paymentId
   * @param args
   *
   * @return {Promise}
   */
  changePaymentStatus({ paymentId, ...args }) {
    return this.put(`/${paymentId}/status`, args);
  }

  /**
   * Change payment system
   *
   * @param paymentId
   * @param args
   *
   * @return {Promise}
   */
  changePaymentSystem({ paymentId, ...args }) {
    return this.put(`/${paymentId}/system`, args);
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

  /**
   * Change creation time
   *
   * @param paymentId
   * @param args
   *
   * @return {Promise}
   */
  changeCreationTime({ paymentId, ...args }) {
    return this.put(`/utils/payment/datetime/${paymentId}`, args);
  }

  /**
   * Enable show ftd to affiliate
   *
   * @param profileUuid
   * @param args
   *
   * @return {Promise}
   */
  enableShowFtdToAffiliate({ profileUuid }) {
    return this.put(`/${profileUuid}/show-ftd-to-affiliate/enabling`);
  }

  /**
   * Disable show ftd to affiliate
   *
   * @param profileUuid
   * @param args
   *
   * @return {Promise}
   */
  disableShowFtdToAffiliate({ profileUuid }) {
    return this.put(`/${profileUuid}/show-ftd-to-affiliate/disabling`);
  }
}

module.exports = PaymentAPI;
