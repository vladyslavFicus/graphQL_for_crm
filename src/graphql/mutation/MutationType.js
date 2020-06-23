const { GraphQLObjectType } = require('graphql');
const UploadType = require('./UploadType');
const HierarchyType = require('./HierarchyType');
const RulesType = require('./RulesType');
const ClientsType = require('./ClientsType');

const MutationType = new GraphQLObjectType({
  name: 'ApiMutation',
  fields: () => ({
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
