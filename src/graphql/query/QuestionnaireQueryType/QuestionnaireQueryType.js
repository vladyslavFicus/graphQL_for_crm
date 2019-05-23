const { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLInt, GraphQLFloat } = require('graphql');
const ResponseType = require('../../common/types/ResponseType');
const { getLastProfileData } = require('../../../graphql/common/resolvers/questionnaire');

const QuestionnaireQueryProfileData = new GraphQLObjectType({
  name: 'QuestionnaireQueryProfileData',
  fields: () => ({
    uuid: { type: new GraphQLNonNull(GraphQLString) },
    status: { type: new GraphQLNonNull(GraphQLString) },
    score: { type: new GraphQLNonNull(GraphQLFloat) },
    level: { type: new GraphQLNonNull(GraphQLString) },
    version: { type: new GraphQLNonNull(GraphQLInt) },
    reviewedBy: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  }),
});

const QuestionnaireQueryType = new GraphQLObjectType({
  name: 'QuestionnaireQueryType',
  fields: () => ({
    lastProfileData: {
      args: {
        profileUUID: { type: new GraphQLNonNull(GraphQLString) },
      },
      type: ResponseType(QuestionnaireQueryProfileData),
      resolve: getLastProfileData,
    },
  }),
});

module.exports = QuestionnaireQueryType;
