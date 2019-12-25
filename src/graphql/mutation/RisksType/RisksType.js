const { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLList, GraphQLInt } = require('graphql');
const RiskAnswerInputType = require('../../input/RiskAnswerInputType');
const RisksType = require('../../query/RisksType');
const { ResponseType } = require('../../common/types');
const {
  risks: { calculateRisk, saveRiskData },
} = require('../../common/resolvers');

const RisksMutation = new GraphQLObjectType({
  name: 'RisksMutation',
  fields: () => ({
    calculateRisk: {
      args: {
        playerUuid: { type: new GraphQLNonNull(GraphQLString) },
        questionnaireId: { type: new GraphQLNonNull(GraphQLInt) },
        answers: { type: new GraphQLList(RiskAnswerInputType) },
      },
      type: ResponseType(RisksType, 'CalculateRiskType'),
      resolve: calculateRisk,
    },
    saveRiskData: {
      args: {
        playerUuid: { type: new GraphQLNonNull(GraphQLString) },
        questionnaireId: { type: new GraphQLNonNull(GraphQLInt) },
        answers: { type: new GraphQLList(RiskAnswerInputType) },
      },
      type: ResponseType(RisksType, 'SaveRiskType'),
      resolve: saveRiskData,
    },
  }),
});

module.exports = RisksMutation;
