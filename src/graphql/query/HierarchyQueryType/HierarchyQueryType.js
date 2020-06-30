const { GraphQLObjectType, GraphQLNonNull, GraphQLList, GraphQLString, GraphQLBoolean } = require('graphql');
const {
  HierarchyUsersType,
} = require('./HierarchyType');
const ResponseType = require('../../common/types/ResponseType');
const {
  getUsersByType,
} = require('../../../graphql/common/resolvers/hierarchy');

const HierarchyQueryType = new GraphQLObjectType({
  name: 'HierarchyQueryType',
  fields: () => ({
    // # 5
    hierarchyUsersByType: {
      args: {
        userTypes: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
        onlyActive: { type: GraphQLBoolean },
      },
      type: ResponseType(HierarchyUsersType),
      resolve: getUsersByType,
    },
  }),
});

module.exports = HierarchyQueryType;
