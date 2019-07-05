const { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLList, GraphQLBoolean } = require('graphql');
const {
  hierarchy: { createUser, createOffice, createDesk, createTeam, addOperatorToBranch, updateHierarchyUser },
} = require('../../common/resolvers');
const { DeskTypeEnum } = require('../../query/HierarchyQueryType/HierarchyType/HierarchyEnums');
const ResponseType = require('../../common/types/ResponseType');

const HierarchyResponseType = customName =>
  new GraphQLObjectType({
    name: `HierarchyResponse${customName}`,
    fields: () => ({
      data: { type: new GraphQLList(GraphQLString) },
      error: { type: new GraphQLList(GraphQLString) },
    }),
  });

const HierarchyMutation = new GraphQLObjectType({
  name: 'HierarchyMutation',
  fields: () => ({
    createUser: {
      args: {
        userId: { type: new GraphQLNonNull(GraphQLString) },
        userType: { type: new GraphQLNonNull(GraphQLString) },
        branchId: { type: GraphQLString },
      },
      type: ResponseType(null, 'createdHierarchyUserType'),
      resolve: createUser,
    },
    createOffice: {
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        country: { type: new GraphQLNonNull(GraphQLString) },
      },
      type: HierarchyResponseType('CreateOffice'),
      resolve: createOffice,
    },
    createDesk: {
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        deskType: { type: new GraphQLNonNull(DeskTypeEnum) },
        language: { type: new GraphQLNonNull(GraphQLString) },
        officeId: { type: new GraphQLNonNull(GraphQLString) },
      },
      type: HierarchyResponseType('CreateDesk'),
      resolve: createDesk,
    },
    createTeam: {
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        deskId: { type: new GraphQLNonNull(GraphQLString) },
      },
      type: HierarchyResponseType('CreateTeam'),
      resolve: createTeam,
    },
    addOperatorToBranch: {
      args: {
        branchId: { type: new GraphQLNonNull(GraphQLString) },
        operatorId: { type: new GraphQLNonNull(GraphQLString) },
      },
      type: ResponseType(GraphQLBoolean, 'SuccessAddedOperatorToBranch'),
      resolve: addOperatorToBranch,
    },
    updateUser: {
      args: {
        operatorId: { type: new GraphQLNonNull(GraphQLString) },
        userType: { type: GraphQLString },
        assignToBranch: { type: GraphQLString },
        assignToOperator: { type: GraphQLString },
        parentBranches: { type: new GraphQLList(GraphQLString) },
        parentUsers: { type: new GraphQLList(GraphQLString) },
        unassignFromBranch: { type: GraphQLString },
        unassignFromOperator: { type: GraphQLString },
      },
      type: ResponseType(null, 'updateHierarchyOperatorType'),
      resolve: updateHierarchyUser,
    },
  }),
});

module.exports = HierarchyMutation;
