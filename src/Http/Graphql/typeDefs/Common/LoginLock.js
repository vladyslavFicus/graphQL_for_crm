const { gql } = require('apollo-server-express');

module.exports = gql`
  type LockInfo {
    lockReason: String
    unlockTime: String
  }

  type LoginLock {
    isLocked: Boolean!
    locks: [LockInfo!]!
  }
`;
