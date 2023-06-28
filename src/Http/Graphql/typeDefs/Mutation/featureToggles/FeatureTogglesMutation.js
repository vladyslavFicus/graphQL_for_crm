const { gql } = require('apollo-server-express');

module.exports = gql`
  type FeatureTogglesMutation {
    updateFeatureToggles(
      restrictedCountries: [String!]!
      paymentAmounts: [Float!]!
      platformMaxAccounts: [FeatureTogglesUpdate__PlatformMaxAccountsDto__Input!]!
      notificationCleanUpDays: Int!
      hideChangePasswordCp: Boolean!
      paymentDeposits: [FeatureTogglesUpdate__PaymentDeposit__Input!]!
      referralEnable: Boolean!
      affiliateClientAutoLogoutEnable: Boolean!
      affiliateClientAutoLogoutMinutes: Int
      accountAutoCreations: [FeatureTogglesUpdate__AccountAutoCreation__Input!]!
      profileDepositEnable: Boolean!
      version: Int!
  ): FeatureToggles
}
`;
