const { gql } = require('apollo-server-express');

module.exports = gql`  
  type GridConfig {
    uuid: String
    columns: [String]
    type: GridConfig__Types__Enum
  }
`;
