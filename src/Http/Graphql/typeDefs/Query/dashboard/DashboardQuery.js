const { gql } = require('apollo-server-express');

module.exports = gql`
  type DashboardQuery {
    lastNotification: [LastNotification]
  }
`;
