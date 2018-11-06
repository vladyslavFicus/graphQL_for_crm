const moment = require('moment');
const keyMirror = require('keymirror');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLList,
  GraphQLInt,
} = require('graphql');
const TradingProfileType = require('../TradingProfileType');
const MoneyType = require('../../common/types/MoneyType');
const SignInIpType = require('../PlayerProfileType/SignInIpType');
const getSignInIPs = require('../../../utils/signInIpsHelper');
const LastDepositType = require('./LastDepositType');

const KYCStatuses = keyMirror({
  PENDING: null,
  VERIFIED: null,
  REFUSED: null,
  DOCUMENTS_SENT: null,
});

const ProfilesType = new GraphQLObjectType({
  name: 'Profiles',
  fields: () => ({
    playerUUID: { type: GraphQLNonNull(GraphQLString) },
    kycCompleted: {
      type: GraphQLBoolean,
      resolve: ({ kycPersonalStatus, kycAddressStatus }) =>
        kycPersonalStatus &&
        kycPersonalStatus.status === KYCStatuses.VERIFIED &&
        kycAddressStatus &&
        kycAddressStatus.status === KYCStatuses.VERIFIED,
    },
    age: {
      type: GraphQLInt,
      resolve: ({ birthDate }) => (birthDate ? moment().diff(birthDate, 'years') : null),
    },
    signInIps: {
      type: new GraphQLList(SignInIpType),
      resolve: getSignInIPs,
    },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    currency: { type: GraphQLString },
    fullName: {
      type: GraphQLString,
      resolve: ({ firstName, lastName }) => [firstName, lastName].filter(v => v).join(' '),
    },
    country: { type: new GraphQLNonNull(GraphQLString) },
    affiliateId: { type: GraphQLString },
    username: { type: GraphQLString },
    languageCode: { type: new GraphQLNonNull(GraphQLString) },
    profileStatus: { type: new GraphQLNonNull(GraphQLString) },
    profileStatusDate: { type: GraphQLString },
    tradingProfile: { type: TradingProfileType },
    registrationDate: { type: GraphQLString },
    totalBalance: { type: MoneyType },
    lastDeposit: { type: LastDepositType },
    login: { type: GraphQLString },
  }),
});

module.exports = ProfilesType;
