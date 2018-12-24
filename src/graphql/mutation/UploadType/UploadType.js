const { GraphQLObjectType, GraphQLList } = require('graphql');
const { GraphQLUpload } = require('apollo-upload-server');
const { ResponseType } = require('../../common/types');
const { LeadUploadType } = require('../../query/LeadType');
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
      type: ResponseType(new GraphQLList(LeadUploadType), 'LeadCsvUpload'),
      resolve: leadCsvUpload,
    },
  }),
});

module.exports = UploadMutation;
