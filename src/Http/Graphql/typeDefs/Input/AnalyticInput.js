const { gql } = require('apollo-server-express');

module.exports = gql`
  input Analytics__Input {
    application: String
    version: String
    eventType: String
    eventAction: String
    eventValue: String
    eventLabel: String
    device: String
    dimension: String
    referer: String
    location: String
  }
`;
