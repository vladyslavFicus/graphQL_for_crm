const { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLID, GraphQLList, GraphQLBoolean } = require('graphql');
const { AuthorityType } = require('../AuthType');
const { getAuthorities: getAuthoritiesRequest } = require('../../../utils/auth');
const ResponseType = require('../../common/types/ResponseType');

const PartnerPermissionType = new GraphQLObjectType({
  name: 'PartnerPermissionType',
  fields: () => ({
    showNotes: { type: GraphQLBoolean },
    showFTDAmount: { type: GraphQLBoolean },
    showSalesStatus: { type: GraphQLBoolean },
    forbiddenCountries: { type: new GraphQLList(GraphQLString) },
    allowedIpAddresses: { type: new GraphQLList(GraphQLString) },
  }),
});

const PartnerType = new GraphQLObjectType({
  name: 'PartnerType',
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: ({ uuid }) => uuid,
    },
    uuid: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    fullName: {
      type: GraphQLString,
      resolve: ({ firstName, lastName }) => `${firstName} ${lastName}`,
    },
    email: { type: GraphQLString },
    externalAffiliateId: { type: GraphQLString },
    affiliateType: { type: GraphQLString },
    phone: { type: GraphQLString },
    country: { type: GraphQLString },
    status: { type: GraphQLString },
    statusChangeDate: { type: GraphQLString },
    statusChangeAuthor: { type: GraphQLString },
    statusReason: { type: GraphQLString },
    createdBy: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    permission: { type: PartnerPermissionType },
    authorities: {
      type: ResponseType(new GraphQLList(AuthorityType), 'PartnerAuthoritiesList'),
      resolve: ({ uuid }, _, { headers: { authorization } }) => getAuthoritiesRequest(uuid, authorization),
    },
  }),
});

module.exports = PartnerType;
