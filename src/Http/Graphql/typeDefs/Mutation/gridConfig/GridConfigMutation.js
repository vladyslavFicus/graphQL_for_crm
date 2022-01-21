const { gql } = require('apollo-server-express');

module.exports = gql`
  type GridConfigMutation {
    create(columns: String! type: GridConfig__Types__Enum!): GridConfig
    update(columns: String!, uuid: String!): GridConfig
    delete(uuid: String!): Boolean
  }
`;
