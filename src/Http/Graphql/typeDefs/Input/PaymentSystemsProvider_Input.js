const { gql } = require('apollo-server-express');

module.exports = gql`
  input PaymentSystemsProvider_Input {
    searchBy: String
    favourite: Boolean
    withFavouriteStatus: Boolean!
    page: Page__Input
  }
`;
