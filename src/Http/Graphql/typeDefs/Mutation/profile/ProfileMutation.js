const { gql } = require('apollo-server-express');

module.exports = gql`
  type ProfileMutation {
    createProfile(args: CreateProfileInputType): CreatedProfile
  }
`;
