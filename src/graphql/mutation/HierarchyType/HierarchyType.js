const { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLList } = require('graphql');
const {
  hierarchy: { createOffice, createDesk, createTeam },
} = require('../../common/resolvers');
const { DeskTypeEnum } = require('../../query/HierarchyQueryType/HierarchyType/HierarchyEnums');

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
    createOffice: {
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        country: { type: new GraphQLNonNull(GraphQLString) },
        officeManager: { type: new GraphQLNonNull(GraphQLString) },
        operatorId: { type: new GraphQLNonNull(GraphQLString) },
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
        operatorId: { type: new GraphQLNonNull(GraphQLString) },
      },
      type: HierarchyResponseType('CreateDesk'),
      resolve: createDesk,
    },
    createTeam: {
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        deskId: { type: new GraphQLNonNull(GraphQLString) },
        operatorId: { type: new GraphQLNonNull(GraphQLString) },
      },
      type: HierarchyResponseType('CreateTeam'),
      resolve: createTeam,
    },
  }),
});

module.exports = HierarchyMutation;
