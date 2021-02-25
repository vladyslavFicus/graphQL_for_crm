const { gql } = require('apollo-server-express');

module.exports = gql`
  type AnalyticsMutation {
    track(args: [Analytics__Input]): Boolean
  }
`;
