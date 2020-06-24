const { GraphQLObjectType } = require('graphql');
const HierarchyType = require('./HierarchyType');
const RulesType = require('./RulesType');

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
  }),
});

module.exports = MutationType;
