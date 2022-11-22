const { gql } = require('apollo-server-express');

module.exports = gql`
  type SmsMutation {
    fullSms: FullSmsMutation @nested
  }
`;
