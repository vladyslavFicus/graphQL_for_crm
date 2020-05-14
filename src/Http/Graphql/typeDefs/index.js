const { gql } = require('apollo-server-express');

module.exports = gql`
  # ============= Directives ============= #
  directive @nested on FIELD_DEFINITION
  directive @pageable on FIELD_DEFINITION
  directive @response(type: String) on FIELD_DEFINITION

  # ============= Scalars ============= #
  scalar Object
  scalar Upload

  schema {
    query: Query
    mutation: Mutation
  }
`;
