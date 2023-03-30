module.exports = {
  // Tables
  lastNotifications(_, __, { dataSources }) {
    return dataSources.NotificationCenterAPI.getLastNotifications();
  },
  lastWithdrawals(_, __, { dataSources }) {
    return dataSources.PaymentViewAPI.getLastWithdrawals();
  },
  lastDeposits(_, __, { dataSources }) {
    return dataSources.PaymentViewAPI.getLastDeposits();
  },
  lastRegistration(_, __, { dataSources }) {
    return dataSources.ProfileViewAPI.getLastRegistration();
  },
  // Charts
  registrationStatistic(_, args, { dataSources }) {
    return dataSources.ProfileViewAPI.getRegistrationsStatistic(args);
  },
  depositAmountStatistic(_, args, { dataSources }) {
    return dataSources.PaymentViewAPI.getDepositAmountStatistic(args);
  },
  depositCountStatistic(_, args, { dataSources }) {
    return dataSources.PaymentViewAPI.getDepositCountStatistic(args);
  },
  withdrawalAmountStatistic(_, args, { dataSources }) {
    return dataSources.PaymentViewAPI.getWithdrawalAmountStatistic(args);
  },
  withdrawalCountStatistic(_, args, { dataSources }) {
    return dataSources.PaymentViewAPI.getWithdrawalCountStatistic(args);
  },
  retentionAmountStatistic(_, args, { dataSources }) {
    return dataSources.PaymentViewAPI.getRetentionAmountStatistic(args);
  },
  retentionCountStatistic(_, args, { dataSources }) {
    return dataSources.PaymentViewAPI.getRetentionCountStatistic(args);
  },
  ftrAmountStatistic(_, args, { dataSources }) {
    return dataSources.PaymentViewAPI.getFtrAmountStatistic(args);
  },
  ftrCountStatistic(_, args, { dataSources }) {
    return dataSources.PaymentViewAPI.getFtrCountStatistic(args);
  },
  ftdAmountStatistic(_, args, { dataSources }) {
    return dataSources.PaymentViewAPI.getFtdAmountStatistic(args);
  },
  ftdCountStatistic(_, args, { dataSources }) {
    return dataSources.PaymentViewAPI.getFtdCountStatistic(args);
  },
};
