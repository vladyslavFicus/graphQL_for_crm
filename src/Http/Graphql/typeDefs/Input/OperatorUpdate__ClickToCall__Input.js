const { gql } = require('apollo-server-express');

module.exports = gql`  
  input OperatorUpdate__ClickToCall__Input {
    didlogicPhone: String
    asteriskPhone: String
    commpeakPhone: String
    coperatoPhone: String
  }
`;
