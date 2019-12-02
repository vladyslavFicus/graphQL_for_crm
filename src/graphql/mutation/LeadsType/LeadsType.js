const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLString,
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLInputObjectType,
} = require('graphql');
const {
  leads: { bulkLeadPromote, bulkLeadUpdate, updateLeadProfile },
  profile: { createProfile },
} = require('../../common/resolvers');
const CreateProfileInputType = require('../../input/CreateProfileInputType');
const { ResponseType } = require('../../common/types');
const { SalesStatusesEnum } = require('../../query/TradingProfileType/TradingProfileEnums');
const LeadType = require('../../query/LeadType');

const LeadSearchParams = new GraphQLInputObjectType({
  name: 'LeadSearchParams',
  fields: () => ({
    searchKeyword: { type: GraphQLString },
    countries: { type: new GraphQLList(GraphQLString) },
    registrationDateStart: { type: GraphQLString },
    registrationDateEnd: { type: GraphQLString },
    salesStatuses: { type: new GraphQLList(GraphQLString) },
    salesAgents: { type: new GraphQLList(GraphQLString) },
    status: { type: GraphQLString },
    requestId: { type: GraphQLString },
  }),
});

const LeadBulkUpdateType = new GraphQLInputObjectType({
  name: 'LeadBulkUpdateType',
  fields: () => ({
    uuid: { type: new GraphQLNonNull(GraphQLString) },
    unassignFromOperator: { type: GraphQLString },
  }),
});

const PromotedLeadType = new GraphQLObjectType({
  name: 'PromotedLeadType',
  fields: () => ({
    uuid: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

const LeadsMutation = new GraphQLObjectType({
  name: 'LeadsMutation',
  fields: () => ({
    update: {
      args: {
        uuid: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLString },
        surname: { type: GraphQLString },
        phone: { type: GraphQLString },
        mobile: { type: GraphQLString },
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
        args: { type: CreateProfileInputType },
      },
      type: ResponseType(PromotedLeadType),
      resolve: createProfile,
    },
    bulkPromote: {
      // args needs to be fixed according to leadFilters as in bulkLeadUpdate
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
    bulkLeadUpdate: {
      args: {
        teamId: { type: GraphQLString },
        salesRep: { type: new GraphQLList(GraphQLString) },
        salesStatus: { type: GraphQLString },
        type: { type: new GraphQLNonNull(GraphQLString) },
        leads: { type: new GraphQLList(LeadBulkUpdateType) },
        allRowsSelected: { type: GraphQLBoolean },
        totalElements: { type: GraphQLInt },
        searchParams: { type: LeadSearchParams },
      },
      type: ResponseType(GraphQLString, 'leadRepresentativeBulkUpdate'),
      resolve: bulkLeadUpdate,
    },
  }),
});

module.exports = LeadsMutation;
