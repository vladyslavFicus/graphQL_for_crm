const { gql } = require('apollo-server-express');

module.exports = gql`
   type IpWhitelistMutation {
    add(ip: String!, description: String): IpWhitelistAddress 
    delete(uuid: String!): Boolean
    edit(uuid: String, description: String): IpWhitelistAddress
  }
`;
