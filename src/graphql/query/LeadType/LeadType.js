const { GraphQLString, GraphQLNonNull, GraphQLObjectType } = require('graphql');
const OperatorType = require('../OperatorType');
const { SalesStatusesEnum } = require('../TradingProfileType/TradingProfileEnums');
const { getOperatorFromCache } = require('../../../utils/operatorUtils');

const leadFields = {
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
    resolve: ({ salesAgent }, _, { headers: { authorization } }) => getOperatorFromCache(salesAgent, authorization),
  },
  salesStatus: { type: SalesStatusesEnum },
  birthDate: { type: GraphQLString },
  affiliate: { type: GraphQLString },
  gender: { type: GraphQLString },
  city: { type: GraphQLString },
  language: { type: GraphQLString },
  registrationDate: { type: new GraphQLNonNull(GraphQLString) },
  statusChangeDate: { type: GraphQLString },
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
