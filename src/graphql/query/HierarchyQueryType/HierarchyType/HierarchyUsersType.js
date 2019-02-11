const { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLList } = require('graphql');
const { userTypes } = require('../../../../constants/hierarchy');
const { getOperator } = require('../../../common/resolvers/operators');
const HierarchyBranchType = require('./HierarchyBranchType');

const UserType = new GraphQLObjectType({
  name: 'HierarchyUserType',
  fields: () => ({
    uuid: { type: new GraphQLNonNull(GraphQLString) },
    userType: { type: new GraphQLNonNull(GraphQLString) },
    parentBranches: { type: new GraphQLList(HierarchyBranchType) },
    parentUsers: { type: new GraphQLList(UserType) },
    fullName: { type: GraphQLString },
    operator: {
      type: require('../../../query/OperatorType'),
      resolve: getOperator('uuid'),
    },
  }),
});

const HierarchyUsersType = new GraphQLObjectType({
  name: 'HierarchyUsersType',
  fields: () =>
    Object.keys(userTypes).reduce(
      (acc, key) => ({
        ...acc,
        [key]: { type: new GraphQLList(UserType) },
      }),
      {}
    ),
});

module.exports = HierarchyUsersType;
module.exports.UserType = UserType;
