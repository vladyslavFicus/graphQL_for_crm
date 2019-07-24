const { GraphQLObjectType, GraphQLList } = require('graphql');
const { GraphQLUpload } = require('apollo-server-express');
const { ResponseType } = require('../../common/types');
const SuccessType = require('../../query/SuccessType');
const {
  upload: { leadCsvUpload },
} = require('../../common/resolvers');

const UploadMutation = new GraphQLObjectType({
  name: 'UploadMutation',
  fields: () => ({
    leadCsvUpload: {
      args: {
        file: { type: GraphQLUpload },
      },
      type: SuccessType,
      resolve: leadCsvUpload,
    },
  }),
});

module.exports = UploadMutation;
