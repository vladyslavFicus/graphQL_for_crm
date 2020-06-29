const { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLBoolean } = require('graphql');
const { DeskTypeEnum } = require('./HierarchyEnums');
const { getOperator } = require('../../../common/resolvers/operators');

const HierarchyBranchType = new GraphQLObjectType({
  name: 'HierarchyBranchType',
  fields: () => ({
    uuid: { type: new GraphQLNonNull(GraphQLString) },
    branchType: { type: new GraphQLNonNull(GraphQLString) },
    brandId: { type: GraphQLString },
    name: { type: new GraphQLNonNull(GraphQLString) },
    country: { type: GraphQLString },
    defaultUser: { type: GraphQLString },
    parentBranch: { type: HierarchyBranchType },
    deskType: { type: DeskTypeEnum },
    language: { type: GraphQLString },
    defaultBranch: { type: GraphQLString },
    isDefault: { type: GraphQLBoolean },
    manager: { type: GraphQLString },
    operator: {
      type: require('../../OperatorType'),
      resolve: getOperator('manager'),
    },
  }),
});

module.exports = HierarchyBranchType;
