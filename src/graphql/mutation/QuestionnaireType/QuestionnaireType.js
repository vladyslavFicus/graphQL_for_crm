const { GraphQLBoolean, GraphQLObjectType, GraphQLNonNull, GraphQLString } = require('graphql');
const SuccessType = require('../../query/SuccessType');
const { changeQuestionnaireStatus } = require('../../common/resolvers/questionnaire');

const QuestionnaireMutation = new GraphQLObjectType({
  name: 'QuestionnaireMutation',
  fields: () => ({
    changeStatus: {
      args: {
        questionnaireUUID: { type: new GraphQLNonNull(GraphQLString) },
        status: { type: new GraphQLNonNull(GraphQLString) },
      },
      type: SuccessType,
      resolve: changeQuestionnaireStatus,
    },
  }),
});

module.exports = QuestionnaireMutation;
