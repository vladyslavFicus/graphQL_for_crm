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
    switch (paymentType.toUpperCase()) {
      case 'DEPOSIT':
        return dataSources.PaymentAPI.createDepositPayment(args);

      case 'WITHDRAW':
        return dataSources.PaymentAPI.createWithdrawPayment(args);

      case 'TRANSFER':
        return dataSources.PaymentAPI.createTransferPayment(args);

      case 'CREDIT_IN':
        return dataSources.PaymentAPI.createCreditInPayment(args);

      case 'CREDIT_OUT':
        return dataSources.PaymentAPI.createCreditOutPayment(args);

      default:
        return null;
    }
  },

  /**
   * Approve or Reject payment
   *
   * @param _
   * @param typeAcc
   * @param args
   * @param dataSources
   *
   * @return {Promise}
   */
  async acceptPayment(_, { typeAcc, ...args }, { dataSources }) {
    const action = typeAcc.toUpperCase();

    if (action === 'APPROVE') {
      await dataSources.PaymentAPI.approvePayment(args);
    }

    if (action === 'REJECT') {
      await dataSources.PaymentAPI.rejectPayment(args);
    }
  },

  /**
   * Change payment method
   *
   * @param _
   * @param args
   * @param dataSources
   *
   * @return {Promise}
   */
  async changePaymentMethod(_, args, { dataSources }) {
    await dataSources.PaymentAPI.changePaymentMethod(args);
  },

  /**
   * Change payment status
   *
   * @param _
   * @param args
   * @param dataSources
   *
   * @return {Promise}
   */
  async changePaymentStatus(_, args, { dataSources }) {
    await dataSources.PaymentAPI.changePaymentStatus(args);
  },

  /**
   * Change original agent
   *
   * @param _
   * @param args
   * @param dataSources
   *
   * @return {Promise}
   */
  async changeOriginalAgent(_, args, { dataSources }) {
    await dataSources.PaymentAPI.changeOriginalAgent(args);
  },
};
