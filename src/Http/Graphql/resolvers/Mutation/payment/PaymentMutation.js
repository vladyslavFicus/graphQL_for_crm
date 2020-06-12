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
   * @param args
   * @param dataSources
   *
   * @return {Promise<{boolean}|*>}
   */
  async acceptPayment(_, { typeAcc, ...args }, { dataSources }) {
    switch (typeAcc.toUpperCase()) {
      case 'APPROVE':
        await dataSources.PaymentAPI.approvePayment(args);
        break;

      case 'REJECT':
        await dataSources.PaymentAPI.rejectPayment(args);
        break;

      default:
        return { success: false };
    }

    return { success: true };
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
    return { success: true };
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
    return { success: true };
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
    return { success: true };
  },
};
