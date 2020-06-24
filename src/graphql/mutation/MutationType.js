const { GraphQLObjectType } = require('graphql');
const HierarchyType = require('./HierarchyType');

const MutationType = new GraphQLObjectType({
  name: 'ApiMutation',
  fields: () => ({
    hierarchy: {
      type: HierarchyType,
      resolve() {
        return {};
      },
    },
  }),
});

module.exports = MutationType;
