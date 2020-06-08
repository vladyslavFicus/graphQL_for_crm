const { gql } = require('apollo-server-express');

module.exports = gql`
  type FilterSetMutation {
    create(fields: String!, name: String!, type: String!, favourite: Boolean!): FilterSet__Option @response
    update(fields: String!, name: String!, uuid: String!): Success
    updateFavourite(favourite: Boolean!, uuid: String!): Success
    delete(uuid: String!): Success
  }
`;
