const { gql } = require('apollo-server-express');

module.exports = gql`
  type SmsMutation {
    coperato: CoperatoSmsMutation @nested
  }
`;
