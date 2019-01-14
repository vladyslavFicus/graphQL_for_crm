const { GraphQLObjectType, GraphQLString } = require('graphql');
const {
  HierarchyUsersType: { UserType },
} = require('../HierarchyQueryType/HierarchyType');
const { getHierarchyUser } = require('../../../utils/hierarchyRequests');

module.exports = new GraphQLObjectType({
  name: 'OperatorType',
  fields: () => ({
    country: { type: GraphQLString },
    email: { type: GraphQLString },
    fullName: {
      type: GraphQLString,
      resolve: ({ firstName, lastName }) => [firstName, lastName].filter(v => v).join(' '),
    },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    operatorStatus: { type: GraphQLString },
    phoneNumber: { type: GraphQLString },
    registeredBy: { type: GraphQLString },
    registrationDate: { type: GraphQLString },
    statusChangeAuthor: { type: GraphQLString },
    statusChangeDate: { type: GraphQLString },
    statusReason: { type: GraphQLString },
    uuid: { type: GraphQLString },
    hierarchy: {
      type: UserType,
      resolve: async ({ uuid }, _, { headers: { authorization } }) => {
        const hierarchyUser = await getHierarchyUser(uuid, authorization);
        return hierarchyUser.data;
      },
    },
  }),
});
