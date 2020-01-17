const {
  profile: { getProfileView },
  tradingAccount: { getTradingAccounts },
  operators: { getOperator },
} = require('../../common/resolvers');
const ProfileViewType = require('../ProfileViewType');
const PartnerType = require('../PartnerType');
const TradingAccountType = require('../TradingAccountType');
const { GraphQLObjectType, GraphQLNonNull, GraphQLBoolean, GraphQLID, GraphQLString, GraphQLList } = require('graphql');
const OperatorType = require('../OperatorType');

const AcquisitionType = new GraphQLObjectType({
  name: 'AcquisitionType',
  fields() {
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

const AddressType = new GraphQLObjectType({
  name: 'AddressType',
  fields() {
    return {
      address: { type: GraphQLString },
      city: { type: GraphQLString },
      countryCode: { type: GraphQLString },
      postCode: { type: GraphQLString },
      state: { type: GraphQLString },
    };
  },
});

const AffiliateType = new GraphQLObjectType({
  name: 'AffiliateType',
  fields() {
    return {
      externalId: { type: GraphQLString },
      referral: { type: GraphQLString },
      sms: { type: GraphQLString },
      source: { type: GraphQLString },
      uuid: { type: GraphQLString },
      partner: {
        type: PartnerType,
        resolve({ uuid }, _, { dataloaders }) {
          return dataloaders.partners.load(uuid);
        },
      },
    };
  },
});

const BankDetailsType = new GraphQLObjectType({
  name: 'BankDetailsType',
  fields() {
    return {
      accountHolderName: { type: GraphQLString },
      accountNumber: { type: GraphQLString },
      branchName: { type: GraphQLString },
      city: { type: GraphQLString },
      name: { type: GraphQLString },
      province: { type: GraphQLString },
      swiftCode: { type: GraphQLString },
      withdrawalArea: { type: GraphQLString },
    };
  },
});

const ConfigurationType = new GraphQLObjectType({
  name: 'ConfigurationType',
  fields() {
    return {
      crs: { type: GraphQLBoolean },
      fatca: { type: GraphQLBoolean },
      internalTransfer: { type: GraphQLBoolean },
      gdpr: {
        type: new GraphQLObjectType({
          name: 'GDPR_NEW',
          fields: () => ({
            sms: { type: GraphQLBoolean },
            email: { type: GraphQLBoolean },
            phone: { type: GraphQLBoolean },
            socialMedia: { type: GraphQLBoolean },
          }),
        }),
      },
      subscription: {
        type: new GraphQLObjectType({
          name: 'SPAM_NEW',
          fields: () => ({
            marketNews: { type: GraphQLBoolean },
            information: { type: GraphQLBoolean },
            educational: { type: GraphQLBoolean },
            promosAndOffers: { type: GraphQLBoolean },
            statisticsAndSummary: { type: GraphQLBoolean },
          }),
        }),
      },
      webCookies: {
        type: new GraphQLObjectType({
          name: 'webCookies_NEW',
          fields: () => ({
            enabled: { type: GraphQLBoolean },
          }),
        }),
      },
    };
  },
});

const ContactsType = new GraphQLObjectType({
  name: 'ContactsType',
  fields() {
    return {
      additionalEmail: { type: GraphQLString },
      additionalPhone: { type: GraphQLString },
      email: { type: GraphQLString },
      phone: { type: GraphQLString },
    };
  },
});

const PassportType = new GraphQLObjectType({
  name: 'PassportType',
  fields() {
    return {
      countryOfIssue: { type: GraphQLString },
      countrySpecificIdentifier: { type: GraphQLString },
      countrySpecificIdentifierType: { type: GraphQLString },
      expirationDate: { type: GraphQLString },
      issueDate: { type: GraphQLString },
      number: { type: GraphQLString },
    };
  },
});

const ProfileStatusType = new GraphQLObjectType({
  name: 'ProfileStatusType',
  fields() {
    return {
      changedAt: { type: GraphQLString },
      changedBy: { type: GraphQLString },
      comment: { type: GraphQLString },
      reason: { type: GraphQLString },
      type: { type: GraphQLString },
    };
  },
});

const RegistrationDetailsType = new GraphQLObjectType({
  name: 'RegistrationDetailsType',
  fields() {
    return {
      deviceDetails: {
        type: new GraphQLObjectType({
          name: 'DeviceDetailsType',
          fields() {
            return {
              deviceType: { type: GraphQLString },
              operatingSystem: { type: GraphQLString },
            };
          },
        }),
      },
      inetDetails: {
        type: new GraphQLObjectType({
          name: 'InetDetailsType',
          fields() {
            return {
              host: { type: GraphQLString },
              ipAddress: { type: GraphQLString },
              referer: { type: GraphQLString },
            };
          },
        }),
      },
      locationDetails: {
        type: new GraphQLObjectType({
          name: 'LocationDetailsType',
          fields() {
            return {
              city: { type: GraphQLString },
              countryCode: { type: GraphQLString },
              region: { type: GraphQLString },
            };
          },
        }),
      },
      registeredBy: { type: GraphQLString },
      registrationDate: { type: GraphQLString },
      userAgent: { type: GraphQLString },
    };
  },
});

const NewPlayerProfileType = new GraphQLObjectType({
  name: 'NewPlayerProfile',
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve({ uuid }) {
        return uuid;
      },
    },
    age: { type: GraphQLString },
    profileView: {
      type: ProfileViewType,
      resolve: ({ uuid }, _, { headers: { authorization } }) => {
        return getProfileView(uuid, authorization);
      },
    },
    tradingAccount: {
      type: new GraphQLList(TradingAccountType),
      resolve: ({ uuid }, _, context) => {
        return getTradingAccounts(_, { uuid }, context);
      },
    },
    clientType: { type: GraphQLString },
    convertedFromLeadUuid: { type: GraphQLString },
    identificationNumber: { type: GraphQLString },
    languageCode: { type: GraphQLString },
    lastUpdatedBy: { type: GraphQLString },
    lastUpdatedDate: { type: GraphQLString },
    migrationId: { type: GraphQLString },
    birthDate: { type: GraphQLString },
    brandId: { type: GraphQLString },
    firstName: { type: GraphQLString },
    gender: { type: GraphQLString },
    lastName: { type: GraphQLString },
    status: { type: ProfileStatusType },
    uuid: { type: GraphQLString },
    emailVerified: { type: GraphQLBoolean },
    phoneVerified: { type: GraphQLBoolean },
    profileVerified: { type: GraphQLBoolean },
    acquisition: { type: AcquisitionType },
    address: { type: AddressType },
    affiliate: { type: AffiliateType },
    bankDetails: { type: BankDetailsType },
    configuration: { type: ConfigurationType },
    contacts: { type: ContactsType },
    kyc: {
      type: new GraphQLObjectType({
        name: 'KYC_NEW',
        fields() {
          return {
            status: { type: GraphQLString },
          };
        },
      }),
    },
    passport: { type: PassportType },
    registrationDetails: { type: RegistrationDetailsType },
    verifications: { type: new GraphQLList(GraphQLString) },
  }),
});

module.exports = NewPlayerProfileType;
