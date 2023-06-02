const { gql } = require('apollo-server-express');

module.exports = gql`
  input FeatureTogglesUpdate__PlatformMaxAccountsDto__Input {
    platformType: PlatformType__Enum!
    maxLiveAccounts: Int!
  }

  input FeatureTogglesUpdate__PaymentDeposit__Input {
    min: Int!
    max: Int!
    currency: String!
  }

  input FeatureTogglesUpdate__AccountAutoCreation__Input {
    accountCurrency: String!
    createOnRegistration: Boolean!
    platformType: PlatformType__Enum!
  }
`;
