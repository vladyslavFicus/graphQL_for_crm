const { GraphQLObjectType, GraphQLList } = require('graphql');
const { GraphQLUpload } = require('apollo-upload-server');
const { ResponseType } = require('../../common/types');
const LeadType = require('../../query/LeadType');
const {
  upload: { leadCsvUpload },
} = require('../../common/resolvers');

const LeadCsvType = new GraphQLObjectType({
  name: 'LeadCSV',
  fields: () => ({
    leads: { type: new GraphQLList(LeadType) },
  }),
});

const UploadMutation = new GraphQLObjectType({
  name: 'UploadMutation',
  fields: () => ({
    leadCsvUpload: {
      args: {
        file: { type: GraphQLUpload },
      },
      type: ResponseType(new GraphQLList(LeadType), 'LeadCsvUpload'),
      resolve: leadCsvUpload,
    },
  }),
});

module.exports = UploadMutation;
