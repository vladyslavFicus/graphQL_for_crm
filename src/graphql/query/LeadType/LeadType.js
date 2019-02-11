const { GraphQLString, GraphQLNonNull, GraphQLObjectType } = require('graphql');
const { getOperator } = require('../../common/resolvers/operators');
const OperatorType = require('../OperatorType');
const { SalesStatusesEnum } = require('../TradingProfileType/TradingProfileEnums');

const leadFields = {
  _id: {
    type: new GraphQLNonNull(GraphQLString),
    resolve: ({ id }) => id,
  },
  id: { type: new GraphQLNonNull(GraphQLString) },
  brandId: { type: new GraphQLNonNull(GraphQLString) },
  name: { type: new GraphQLNonNull(GraphQLString) },
  surname: { type: new GraphQLNonNull(GraphQLString) },
  phone: { type: new GraphQLNonNull(GraphQLString) },
  mobile: { type: GraphQLString },
  status: { type: GraphQLString },
  email: { type: new GraphQLNonNull(GraphQLString) },
  country: { type: GraphQLString },
  source: { type: GraphQLString },
  salesAgent: {
    type: OperatorType,
    resolve: getOperator('salesAgent'),
  },
  salesStatus: { type: SalesStatusesEnum },
  birthDate: { type: GraphQLString },
  affiliate: { type: GraphQLString },
  convertedByOperatorUuid: { type: GraphQLString },
  convertedToClientUuid: { type: GraphQLString },
  gender: { type: GraphQLString },
  city: { type: GraphQLString },
  language: { type: GraphQLString },
  registrationDate: { type: new GraphQLNonNull(GraphQLString) },
  statusChangedDate: { type: GraphQLString },
};

const LeadType = new GraphQLObjectType({
  name: 'Lead',
  fields: () => leadFields,
});

const LeadUploadType = new GraphQLObjectType({
  name: 'LeadUpload',
  fields: () => ({
    ...leadFields,
    salesAgent: { type: GraphQLString },
  }),
});

module.exports = LeadType;
module.exports.LeadUploadType = LeadUploadType;
