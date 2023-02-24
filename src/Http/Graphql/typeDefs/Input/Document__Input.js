const { gql } = require('apollo-server-express');

module.exports = gql`
  input DocumentSearch__Input {
    searchBy: String
    uploadDateRange: Document__Upload__DateRange__Input
    page: Page__Input
  }

  input Document__Upload__DateRange__Input {
    from: String
    to: String
  }

  input Document__Input {
    uuid: String!
    title: String!
    description: String
  }
`;
