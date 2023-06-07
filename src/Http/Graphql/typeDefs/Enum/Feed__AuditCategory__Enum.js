const { gql } = require('apollo-server-express');

module.exports = gql`
  enum Feed__AuditCategory__Enum {
    BRAND_DOCUMENTS
    FAVOURITE_PAYMENT_SYSTEMS
    RBAC
    WHITELIST
    BRAND_CONFIG
  }
`;
