const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLFloat,
  GraphQLBoolean,
} = require('graphql');

const RiskAnswerType = new GraphQLObjectType({
  name: 'RiskAnswerType',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    title: { type: GraphQLString },
    selected: { type: GraphQLBoolean },
  }),
});

const RiskQuestionType = new GraphQLObjectType({
  name: 'RiskQuestionType',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    type: { type: GraphQLString },
    title: { type: GraphQLString },
    answers: { type: new GraphQLList(RiskAnswerType) },
  }),
});

const RiskQuestionnaireSubGroupType = new GraphQLObjectType({
  name: 'RiskQuestionnaireSubGroupType',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    title: { type: GraphQLString },
    questions: { type: new GraphQLList(RiskQuestionType) },
  }),
});

const RiskQuestionnaireGroupType = new GraphQLObjectType({
  name: 'RiskQuestionnaireGroupType',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    title: { type: GraphQLString },
    score: { type: GraphQLFloat },
    questionSubGroups: { type: new GraphQLList(RiskQuestionnaireSubGroupType) },
  }),
});

const RiskQuestionnaireType = new GraphQLObjectType({
  name: 'RiskQuestionnaireType',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    questionGroups: { type: new GraphQLList(RiskQuestionnaireGroupType) },
  }),
});

const RisksType = new GraphQLObjectType({
  name: 'RisksType',
  fields: () => ({
    uuid: { type: GraphQLString },
    playerUuid: { type: new GraphQLNonNull(GraphQLString) },
    brandId: { type: GraphQLString },
    totalScore: { type: GraphQLFloat },
    riskCategory: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    createdBy: { type: GraphQLString },
    questionnaire: { type: RiskQuestionnaireType },
  }),
});

module.exports = RisksType;
