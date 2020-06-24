const { GraphQLObjectType } = require('graphql');
const HierarchyType = require('./HierarchyType');
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
    clients: {
      type: ClientsType,
      resolve() {
        return {};
      },
    },
  }),
});

module.exports = MutationType;
