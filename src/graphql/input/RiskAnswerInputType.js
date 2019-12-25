const { GraphQLInputObjectType, GraphQLInt } = require('graphql');

const RiskAnswerInputType = new GraphQLInputObjectType({
  name: 'RiskAnswersInputType',
  fields: () => ({
    questionId: { type: GraphQLInt },
    answerId: { type: GraphQLInt },
  }),
});

module.exports = RiskAnswerInputType;
