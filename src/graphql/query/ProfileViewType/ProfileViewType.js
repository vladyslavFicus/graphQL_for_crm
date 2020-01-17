const { GraphQLObjectType, GraphQLNonNull, GraphQLInt, GraphQLString, GraphQLList } = require('graphql');
const OperatorType = require('../OperatorType');
const PartnerType = require('../PartnerType');
const { getOperator } = require('../../common/resolvers/operators');

const ProfileViewAcquisition = new GraphQLObjectType({
  name: 'ProfileViewAcquisition',
  fields: () => {
    return {
      acquisitionStatus: { type: GraphQLString },
      retentionRepresentative: { type: GraphQLString },
      retentionStatus: { type: GraphQLString },
      retentionOperator: {
        type: OperatorType,
        resolve: getOperator('retentionRepresentative'),
      },
      salesRepresentative: { type: GraphQLString },
      salesStatus: { type: GraphQLString },
      salesOperator: {
        type: OperatorType,
        resolve: getOperator('salesRepresentative'),
      },
    };
  },
});

const ProfileViewAddressType = new GraphQLObjectType({
  name: 'ProfileViewAddressType',
  fields: () => {
    return {
      countryCode: { type: GraphQLString },
    };
  },
});

const ProfileViewAffiliate = new GraphQLObjectType({
  name: 'ProfileViewAffiliate',
  fields: () => {
    return {
      uuid: { type: GraphQLNonNull(GraphQLString) },
      source: { type: GraphQLString },
      campaignId: { type: GraphQLString },
      partner: {
        type: PartnerType,
        resolve({ uuid }, _, { dataloaders }) {
          return dataloaders.partners.load(uuid);
        },
      },
    };
  },
});

const ProfileViewBalanceType = new GraphQLObjectType({
  name: 'ProfileViewBalanceType',
  fields: () => {
    return {
      amount: { type: GraphQLString },
      currency: { type: GraphQLString },
      credit: { type: GraphQLString },
    };
  },
});

const ProfileViewLastNote = new GraphQLObjectType({
  name: 'ProfileViewLastNote',
  fields: () => {
    return {
      changedAt: { type: GraphQLString },
      content: { type: GraphQLString },
      uuid: { type: GraphQLNonNull(GraphQLString) },
    };
  },
});

const ProfileViewPaymentDetails = new GraphQLObjectType({
  name: 'ProfileViewPaymentDetails',
  fields: () => {
    return {
      depositsCount: { type: GraphQLInt },
      lastDepositTime: { type: GraphQLString },
    };
  },
});

const ProfileViewStatus = new GraphQLObjectType({
  name: 'ProfileViewStatus',
  fields: () => {
    return {
      changedAt: { type: GraphQLString },
      type: { type: GraphQLString },
    };
  },
});

const ProfileViewSessions = new GraphQLObjectType({
  name: 'ProfileViewSessions',
  fields: () => {
    return {
      countryCode: { type: GraphQLString },
      ip: { type: GraphQLString },
      startedAt: { type: GraphQLString },
    };
  },
});

const ProfileViewRegistrationDetails = new GraphQLObjectType({
  name: 'ProfileViewRegistrationDetails',
  fields: () => {
    return {
      registeredBy: { type: GraphQLString },
      registrationDate: { type: GraphQLString },
    };
  },
});

const ProfileViewType = new GraphQLObjectType({
  name: 'ProfileViewType',
  fields: () => {
    return {
      acquisition: { type: ProfileViewAcquisition },
      address: { type: ProfileViewAddressType },
      affiliate: { type: ProfileViewAffiliate },
      balance: { type: ProfileViewBalanceType },
      firstName: { type: GraphQLString },
      lastName: { type: GraphQLString },
      fullName: {
        type: GraphQLString,
        resolve: ({ firstName, lastName }) => [firstName, lastName].filter(v => v).join(' '),
      },
      lastNote: { type: ProfileViewLastNote },
      languageCode: { type: new GraphQLNonNull(GraphQLString) },
      paymentDetails: { type: ProfileViewPaymentDetails },
      status: { type: ProfileViewStatus },
      lastSignInSessions: { type: new GraphQLList(ProfileViewSessions) },
      registrationDetails: { type: ProfileViewRegistrationDetails },
      uuid: { type: GraphQLNonNull(GraphQLString) },
    };
  },
});

module.exports = ProfileViewType;
