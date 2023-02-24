const { gql } = require('apollo-server-express');

module.exports = gql`
  enum Feed__AuditCategory__Enum {
    BRAND_DOCUMENTS
    RBAC
    WHITELIST
  }
`;
