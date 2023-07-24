const RESTDataSource = require('@hrzn/apollo-datasource/RESTDataSource');

class PaymentViewAPI extends RESTDataSource {
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
   * Get payments total count
   *
   * @param args
   *
   * @return {Promise}
   */
  paymentsTotalCount(args) {
    return this.post('/payments/count', args);
  }

  /**
   * Get payments statistic
   *
   * @param args
   *
   * @return {Promise}
   */
  getPaymentsGeneralStatistic(args) {
    return this.post('/statistics/general', args);
  }

  /**
   * Get last withdrawals
   *
   * @return {Promise}
   */
  getLastWithdrawals() {
    return this.get('/statistics/withdrawal/latest');
  }

  /**
   * Get last deposits
   *
   * @return {Promise}
   */
  getLastDeposits() {
    return this.get('/statistics/deposit/latest');
  }

  /**
   * Get Deposit Amount Statistic
   *
   * @param args
   *
   * @return {Promise}
   */
  getDepositAmountStatistic(args) {
    return this.post('/statistics/deposit/amount', args);
  }

  /**
   * Get Deposit Count Statistic
   *
   * @param args
   *
   * @return {Promise}
   */
  getDepositCountStatistic(args) {
    return this.post('/statistics/deposit/count', args);
  }


  /**
   * Get Withdrawal Amount Statistic
   *
   * @param args
   *
   * @return {Promise}
   */
  getWithdrawalAmountStatistic(args) {
    return this.post('/statistics/withdrawal/amount', args);
  }

  /**
   * Get Withdrawal Count Statistic
   *
   * @param args
   *
   * @return {Promise}
   */
  getWithdrawalCountStatistic(args) {
    return this.post('/statistics/withdrawal/count', args);
  }

  /**
   * Get Retention Amount Statistic
   *
   * @param args
   *
   * @return {Promise}
   */
  getRetentionAmountStatistic(args) {
    return this.post('/statistics/retention/amount', args);
  }

  /**
   * Retention Count Statistic
   *
   * @param args
   *
   * @return {Promise}
   */
  getRetentionCountStatistic(args) {
    return this.post('/statistics/retention/count', args);
  }

  /**
   * Get FTR Amount Statistic
   *
   * @param args
   *
   * @return {Promise}
   */
  getFtrAmountStatistic(args) {
    return this.post('/statistics/ftr/amount', args);
  }

  /**
   * Get FTR Count Statistic
   *
   * @param args
   *
   * @return {Promise}
   */
  getFtrCountStatistic(args) {
    return this.post('/statistics/ftr/count', args);
  }

  /**
   * Get FTD Amount Statistic
   *
   * @param args
   *
   * @return {Promise}
   */
  getFtdAmountStatistic(args) {
    return this.post('/statistics/ftd/amount', args);
  }

  /**
   * Get FTD Count Statistic
   *
   * @param args
   *
   * @return {Promise}
   */
  getFtdCountStatistic(args) {
    return this.post('/statistics/ftd/count', args);
  }
}

module.exports = PaymentViewAPI;
