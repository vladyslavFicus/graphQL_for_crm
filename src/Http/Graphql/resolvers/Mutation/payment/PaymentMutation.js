module.exports = {
  /**
   * Create payment
   *
   * @param _
   * @param paymentType
   * @param args
   * @param dataSources
   *
   * @return {Promise<{paymentId: string|*>}
   */
  createPayment(_, { paymentType, ...args }, { dataSources }) {
    const postfix = paymentType === 'DEPOSIT' ? '/manual' : '';
    return dataSources.PaymentAPI.createPayment(args, postfix, paymentType);
  },

  /**
   * Approve or Reject payment
   *
   * @param _
   * @param args
   * @param dataSources
   *
   * @return {Promise<{boolean}|*>}
   */
  async acceptPayment(_, args, { dataSources }) {
    await dataSources.PaymentAPI.acceptPayment(args);
    return true;
  },

  /**
   * Change payment method
   *
   * @param _
   * @param args
   * @param dataSources
   *
   * @return {Promise<{boolean}|*>}
   */
  async changePaymentMethod(_, args, { dataSources }) {
    await dataSources.PaymentAPI.changePaymentMethod(args);
    return true;
  },

  /**
   * Change payment status
   *
   * @param _
   * @param args
   * @param dataSources
   *
   * @return {Promise<{boolean}|*>}
   */
  async changePaymentStatus(_, args, { dataSources }) {
    await dataSources.PaymentAPI.changePaymentStatus(args);
    return true;
  },

  /**
   * Change original agent
   *
   * @param _
   * @param args
   * @param dataSources
   *
   * @return {Promise<{boolean}|*>}
   */
  async changeOriginalAgent(_, args, { dataSources }) {
    await dataSources.PaymentAPI.changeOriginalAgent(args);
    return true;
  },
};
