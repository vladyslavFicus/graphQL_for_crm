const { gql } = require('apollo-server-express');

module.exports = gql`
  # ============= Directives ============= #
  directive @nested on FIELD_DEFINITION
  directive @pageable on FIELD_DEFINITION
  directive @auth_mask_field(action: String, maskAll: Boolean) on FIELD_DEFINITION
  directive @mask_field on FIELD_DEFINITION
  directive @auth_hide_argument(action: String) on ARGUMENT_DEFINITION
  directive @auth_hide_field(action: String) on FIELD_DEFINITION
  directive @auth_filter_values(action: String) on FIELD_DEFINITION
  directive @auth_hide_not_required_argument(action: String) on ARGUMENT_DEFINITION

  # ============= Scalars ============= #
  scalar Object
  scalar Upload

  schema {
    query: Query
    mutation: Mutation
  }
`;
