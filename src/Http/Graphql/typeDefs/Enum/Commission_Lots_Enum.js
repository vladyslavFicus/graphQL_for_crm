const { gql } = require('apollo-server-express');

module.exports = gql`
  enum Commission_Lots_Enum {
    LOT
    DEAL
  }
`;
