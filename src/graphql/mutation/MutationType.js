const { GraphQLObjectType } = require('graphql');
const ProfileType = require('./ProfileType');
const UploadType = require('./UploadType');
const HierarchyType = require('./HierarchyType');
const RulesType = require('./RulesType');
const ClientsType = require('./ClientsType');

const MutationType = new GraphQLObjectType({
  name: 'ApiMutation',
  fields: () => ({
    profile: {
      type: ProfileType,
      resolve() {
        return {};
      },
    },
    upload: {
      type: UploadType,
      resolve() {
        return {};
      },
    },
    hierarchy: {
      type: HierarchyType,
      resolve() {
        return {};
      },
    },
    rules: {
      type: RulesType,
      resolve() {
        return {};
      },
    },
    clients: {
      type: ClientsType,
      resolve() {
        return {};
      },
    },
  }),
});

module.exports = MutationType;
