const { gql } = require('apollo-server-express');

module.exports = gql`
  input IpWhitelistSearch__Input {
    ip: String
    creationDateRange: IpWhitelist__Creation__DateRange__Input
    page: Page__Input
  }

  input IpWhitelist__Creation__DateRange__Input {
    from: String
    to: String
  }
`;
