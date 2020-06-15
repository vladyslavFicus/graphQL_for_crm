const { gql } = require('apollo-server-express');

module.exports = gql`
  type LoginLock {
    lock: Boolean
    lockReason: String
    lockExpirationDate: String
  }
`;
