const { gql } = require('apollo-server-express');

module.exports = gql`
   type IpWhitelistMutation {
    add(ip: String!, description: String!): Boolean 
    delete(uuid: String!): Boolean
    deleteMany(uuids: [String]!): Boolean
    edit(uuid: String, description: String!): Boolean
  }
`;
