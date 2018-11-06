const { GraphQLString, GraphQLNonNull, GraphQLObjectType } = require('graphql');
const { SalesStatusesEnum } = require('../TradingProfileType/TradingProfileEnums');

const LeadType = new GraphQLObjectType({
  name: 'Lead',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    brandId: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    surname: { type: new GraphQLNonNull(GraphQLString) },
    phoneCode: { type: new GraphQLNonNull(GraphQLString) },
    phoneNumber: { type: GraphQLString },
    phone: { type: new GraphQLNonNull(GraphQLString) },
    mobileCode: { type: new GraphQLNonNull(GraphQLString) },
    mobileNumber: { type: GraphQLString },
    mobile: { type: new GraphQLNonNull(GraphQLString) },
    status: { type: GraphQLString },
    email: { type: GraphQLString },
    country: { type: GraphQLString },
    source: { type: GraphQLString },
    salesAgent: { type: GraphQLString },
    salesStatus: { type: SalesStatusesEnum },
    birthDate: { type: GraphQLString },
    affiliate: { type: GraphQLString },
    gender: { type: GraphQLString },
    city: { type: GraphQLString },
    language: { type: GraphQLString },
    registrationDate: { type: new GraphQLNonNull(GraphQLString) },
    statusChangeDate: { type: GraphQLString },
  }),
});

module.exports = LeadType;
