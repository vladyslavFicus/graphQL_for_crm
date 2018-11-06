const { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLList } = require('graphql');
const { userTypes } = require('../../../../constants/hierarchy');

const UserType = new GraphQLObjectType({
  name: 'HierarchyUserType',
  fields: () => ({
    uuid: { type: new GraphQLNonNull(GraphQLString) },
    userType: { type: new GraphQLNonNull(GraphQLString) },
    parentBranches: { type: new GraphQLList(GraphQLString) },
    parentUsers: { type: new GraphQLList(GraphQLString) },
    fullName: { type: GraphQLString },
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
