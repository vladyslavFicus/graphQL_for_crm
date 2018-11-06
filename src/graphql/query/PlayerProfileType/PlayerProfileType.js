const moment = require('moment');
const keyMirror = require('keymirror');
const { get, isNil } = require('lodash');
const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLID,
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
  GraphQLInt,
} = require('graphql');
const TagType = require('../TagType');
const MoneyType = require('../../common/types/MoneyType');
const {
  payment: { accumulated },
} = require('../../common/resolvers');
const TradingProfileType = require('../TradingProfileType');
const SignInIpType = require('./SignInIpType');
const getSignInIPs = require('../../../utils/signInIpsHelper');

const KYC_STATES = keyMirror({
  VERIFIED: null,
});

const DeviceType = new GraphQLObjectType({
  name: 'Device',
  fields: () => ({
    lastSignInCountryCode: { type: GraphQLString },
    hash: { type: new GraphQLNonNull(GraphQLString) },
    lastSignInDate: { type: new GraphQLNonNull(GraphQLString) },
    lastSignInIP: { type: new GraphQLNonNull(GraphQLString) },
    totalSignIn: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

const AccumulatedType = new GraphQLObjectType({
  name: 'Accumulated',
  fields: () => ({
    baseCurrencyDeposits: { type: MoneyType },
    baseCurrencyWithdraws: { type: MoneyType },
    walletCurrencyDeposits: { type: MoneyType },
    walletCurrencyWithdraws: { type: MoneyType },
  }),
});

const PlayerProfileType = new GraphQLObjectType({
  name: 'PlayerProfile',
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve({ playerUUID }) {
        return playerUUID;
      },
    },
    accumulated: {
      type: AccumulatedType,
      resolve({ playerUUID }, _, context) {
        return accumulated(null, { playerUUID }, context);
      },
    },
    acceptedTermsUUID: { type: new GraphQLNonNull(GraphQLString) },
    address: { type: GraphQLString },
    age: {
      type: GraphQLInt,
      resolve: ({ birthDate }) => (birthDate ? moment().diff(birthDate, 'years') : null),
    },
    weight: {
      type: GraphQLFloat,
      resolve: ({ weight }) => weight || 0,
    },
    btag: { type: GraphQLString },
    signInIps: {
      type: new GraphQLList(SignInIpType),
      resolve: getSignInIPs,
    },
    tags: {
      type: new GraphQLList(TagType),
      resolve({ tags }) {
        return tags || [];
      },
    },
    authorUuid: { type: new GraphQLNonNull(GraphQLString) },
    birthDate: { type: GraphQLString },
    bonusBalance: {
      type: MoneyType,
      resolve: ({ bonusBalance, currency }) =>
        bonusBalance || {
          amount: 0,
          currency,
        },
    },
    brandId: { type: new GraphQLNonNull(GraphQLString) },
    city: { type: GraphQLString },
    device: { type: new GraphQLList(DeviceType) },
    completed: {
      type: new GraphQLNonNull(GraphQLBoolean),
      resolve({ completed, alreadyCompleted }) {
        return !isNil(completed) ? completed : alreadyCompleted;
      },
    },
    country: { type: new GraphQLNonNull(GraphQLString) },
    creationDate: { type: new GraphQLNonNull(GraphQLString) },
    currency: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    firstName: { type: GraphQLString },
    gender: {
      type: GraphQLString,
      resolve({ gender }) {
        if (gender === 'UNDEFINED') {
          return null;
        }

        return gender;
      },
    },
    identifier: { type: GraphQLString },
    ip: { type: new GraphQLNonNull(GraphQLString) },
    languageCode: { type: new GraphQLNonNull(GraphQLString) },
    lastName: { type: GraphQLString },
    login: { type: new GraphQLNonNull(GraphQLString) },
    marketingMail: { type: new GraphQLNonNull(GraphQLBoolean) },
    marketingSMS: { type: new GraphQLNonNull(GraphQLBoolean) },
    tailorMadeEmail: {
      type: new GraphQLNonNull(GraphQLBoolean),
      resolve: root => root.tailorMadeEmail || false,
    },
    tailorMadeSMS: {
      type: new GraphQLNonNull(GraphQLBoolean),
      resolve: root => root.tailorMadeSMS || false,
    },
    phone: {
      type: GraphQLString,
      resolve(
        { phone, phoneNumber },
        _,
        context,
        {
          variableValues: { phone: argPhone },
        }
      ) {
        if (!phone && !phoneNumber && !argPhone) {
          return null;
        }

        if (phone) {
          return phone;
        }

        return argPhone;
      },
    },
    phoneCode: {
      type: GraphQLString,
      resolve(
        { phoneCode, phoneNumber },
        _,
        context,
        {
          variableValues: { phoneCode: argPhoneCode },
        }
      ) {
        if (!phoneCode && !phoneNumber && !argPhoneCode) {
          return null;
        }

        if (phoneCode) {
          return phoneCode;
        }

        return argPhoneCode;
      },
    },
    phoneNumber: {
      type: GraphQLString,
      resolve({ phone, phoneCode, phoneNumber }) {
        if (phoneNumber) {
          return `+${phoneNumber}`;
        }

        if (!phone || !phoneCode) {
          return null;
        }

        return `+${phoneCode}${phone}`;
      },
    },
    phoneNumberVerified: {
      type: new GraphQLNonNull(GraphQLBoolean),
      resolve(object) {
        return object.phoneNumberVerified || false;
      },
    },
    playerUUID: { type: new GraphQLNonNull(GraphQLString) },
    postCode: { type: GraphQLString },
    affiliateId: { type: GraphQLString },
    profileStatus: { type: new GraphQLNonNull(GraphQLString) },
    profileStatusAuthor: { type: GraphQLString },
    profileStatusDate: { type: GraphQLString },
    profileStatusPermanent: { type: GraphQLBoolean },
    profileStatusReason: { type: GraphQLString },
    profileStatusComment: { type: GraphQLString },
    profileVerified: {
      type: new GraphQLNonNull(GraphQLBoolean),
      resolve: root => {
        const personalStatus = get(root, 'kycPersonalStatus.status');
        const addressStatus = get(root, 'kycAddressStatus.status');

        return personalStatus === KYC_STATES.VERIFIED && addressStatus === KYC_STATES.VERIFIED;
      },
    },
    realMoneyBalance: {
      type: MoneyType,
      resolve: ({ realMoneyBalance, currency }) =>
        realMoneyBalance || {
          amount: 0,
          currency,
        },
    },
    registrationDate: {
      type: new GraphQLNonNull(GraphQLString),
    },
    registrationIP: {
      type: new GraphQLNonNull(GraphQLString),
    },
    suspendEndDate: {
      type: GraphQLString,
    },
    totalBalance: {
      type: MoneyType,
      resolve: ({ totalBalance, currency }) =>
        totalBalance || {
          amount: 0,
          currency,
        },
    },
    updatedDate: {
      type: new GraphQLNonNull(GraphQLString),
    },
    username: {
      type: new GraphQLNonNull(GraphQLString),
    },
    withdrawableAmount: {
      type: MoneyType,
      resolve: ({ withdrawableAmount, currency }) =>
        withdrawableAmount || {
          amount: 0,
          currency,
        },
    },
    accumulatedDeposits: {
      type: MoneyType,
      resolve: ({ accumulatedDeposits, currency }) =>
        accumulatedDeposits || {
          amount: 0,
          currency,
        },
    },
    fullName: {
      type: GraphQLString,
      resolve: ({ firstName, lastName }) => [firstName, lastName].filter(v => v).join(' '),
    },
    accumulatedWithdrawals: {
      type: MoneyType,
      resolve: ({ accumulatedWithdrawals, currency }) =>
        accumulatedWithdrawals || {
          amount: 0,
          currency,
        },
    },
    tradingProfile: {
      type: TradingProfileType,
    },
    intendedAmountToSpend: {
      type: GraphQLString,
    },
    temporaryUntil: {
      type: GraphQLString,
    },
    isTest: {
      type: GraphQLBoolean,
      resolve: ({ isTest }) => !!isTest,
    },
  }),
});

module.exports = PlayerProfileType;
