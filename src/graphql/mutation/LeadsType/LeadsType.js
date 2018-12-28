const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLString,
  GraphQLBoolean,
  GraphQLNonNull,
} = require('graphql');
const {
  leads: { bulkLeadPromote, promoteLeadToClient, updateLeadProfile },
} = require('../../common/resolvers');
const { ResponseType } = require('../../common/types');
const { SalesStatusesEnum } = require('../../query/TradingProfileType/TradingProfileEnums');
const LeadType = require('../../query/LeadType');

const PromotedLeadType = new GraphQLObjectType({
  name: 'PromotedLeadType',
  fields: () => ({
    playerUUID: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

const LeadsMutation = new GraphQLObjectType({
  name: 'LeadsMutation',
  fields: () => ({
    update: {
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        surname: { type: new GraphQLNonNull(GraphQLString) },
        phone: { type: new GraphQLNonNull(GraphQLString) },
        mobile: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLString },
        country: { type: GraphQLString },
        birthDate: { type: GraphQLString },
        gender: { type: GraphQLString },
        city: { type: GraphQLString },
      },
      type: ResponseType(LeadType, 'UpdateLeadType'),
      resolve: updateLeadProfile,
    },
    promote: {
      args: {
        password: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) },
        country: { type: new GraphQLNonNull(GraphQLString) },
        city: { type: GraphQLString },
        phone: { type: new GraphQLNonNull(GraphQLString) },
        languageCode: { type: new GraphQLNonNull(GraphQLString) },
      },
      type: ResponseType(PromotedLeadType),
      resolve: promoteLeadToClient,
    },
    bulkPromote: {
      args: {
        allRecords: { type: GraphQLBoolean },
        leadIds: { type: new GraphQLList(GraphQLString) },
        countries: { type: new GraphQLList(GraphQLString) },
        searchKeyword: { type: GraphQLString },
        registrationDateEnd: { type: GraphQLString },
        registrationDateStart: { type: GraphQLString },
        salesStatus: { type: SalesStatusesEnum },
        totalRecords: { type: GraphQLInt },
      },
      type: ResponseType(new GraphQLList(GraphQLString)),
      resolve: bulkLeadPromote,
    },
  }),
});

module.exports = LeadsMutation;
