const { gql } = require('apollo-server-express');

module.exports = gql`
  enum Feed__AuditCategory__Enum {
    WHITELIST
    RBAC
  }
`;
