const { GraphQLString, GraphQLID, GraphQLNonNull, GraphQLList } = require('graphql');
const {
  HierarchyUsersType: { UserType },
} = require('../HierarchyQueryType/HierarchyType');
const { AuthorityType } = require('../AuthType');
const { getAuthorities: getAuthoritiesRequest } = require('../../../utils/auth');
const ResponseType = require('../../common/types/ResponseType');

module.exports = {
  _id: { type: new GraphQLNonNull(GraphQLID), resolve: ({ uuid }) => uuid },
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
    resolve: ({ uuid }, _, { dataloaders }) => {
      return dataloaders.usersHierarchy.load(uuid);
    },
  },
  authorities: {
    type: ResponseType(new GraphQLList(AuthorityType), 'AuthoritiesListType'),
    resolve: ({ uuid }, _, { headers: { authorization } }) => getAuthoritiesRequest(uuid, authorization),
  },
};
