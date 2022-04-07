const { gql } = require('apollo-server-express');

module.exports = gql`
  input FeedCategorySearch_Input {
    auditCategory: Feed__AuditCategory__Enum
  }
`;
