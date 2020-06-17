const { GraphQLInputObjectType, GraphQLObjectType, GraphQLBoolean, GraphQLNonNull, GraphQLString } = require('graphql');
const ResponseType = require('../../common/types/ResponseType');
const NewPlayerProfileType = require('../../query/NewPlayerProfileType');
const SuccessType = require('../../query/SuccessType');
const {
  profile: {
    changeProfileStatus,
    verifyPhone,
    verifyEmail,
    verifyProfile,
    updateEmail,
    updateProfile,
    markIsTest,
    clickToCall,
    updateRegulated,
    limitedUpdateProfile,
    updatePersonalInformation,
    updateKYCStatus,
    updateConfiguration,
    updateContacts,
    updateAddress,
  },
} = require('../../common/resolvers');

const passportInput = new GraphQLInputObjectType({
  name: 'PassportInput',
  fields: () => ({
    number: { type: GraphQLString },
    issueDate: { type: GraphQLString },
    expirationDate: { type: GraphQLString },
    countryOfIssue: { type: GraphQLString },
    countrySpecificIdentifier: { type: GraphQLString },
    countrySpecificIdentifierType: { type: GraphQLString },
  }),
});

const PlayerMutation = new GraphQLObjectType({
  name: 'PlayerMutation',
  fields: () => ({
    changeProfileStatus: {
      args: {
        playerUUID: { type: new GraphQLNonNull(GraphQLString) },
        comment: { type: GraphQLString },
        reason: { type: new GraphQLNonNull(GraphQLString) },
        status: { type: new GraphQLNonNull(GraphQLString) },
      },
      type: ResponseType(NewPlayerProfileType, 'changeProfileStatus'),
      resolve: changeProfileStatus,
    },
    update: {
      args: {
        terms: {
          type: GraphQLBoolean,
        },
        brandId: {
          type: GraphQLString,
        },
        currency: {
          type: GraphQLString,
        },
        firstName: {
          type: GraphQLString,
        },
        lastName: {
          type: GraphQLString,
        },
        birthDate: {
          type: GraphQLString,
        },
        languageCode: {
          type: GraphQLString,
        },
        login: {
          type: GraphQLString,
        },
        phone1: {
          type: GraphQLString,
        },
        phone2: {
          type: GraphQLString,
        },
        address: {
          type: GraphQLString,
        },
        city: {
          type: GraphQLString,
        },
        country: {
          type: GraphQLString,
        },
        postCode: {
          type: GraphQLString,
        },
        gender: {
          type: GraphQLString,
        },
        identifier: {
          type: GraphQLString,
        },
        playerUUID: {
          type: new GraphQLNonNull(GraphQLString),
        },
        passportNumber: {
          type: GraphQLString,
        },
        passportIssueDate: {
          type: GraphQLString,
        },
        expirationDate: {
          type: GraphQLString,
        },
        countryOfIssue: {
          type: GraphQLString,
        },
        kycStatus: {
          type: GraphQLString,
        },
        countrySpecificIdentifier: {
          type: GraphQLString,
        },
        countrySpecificIdentifierType: {
          type: GraphQLString,
        },
        enableInternalTransfer: {
          type: GraphQLBoolean,
        },
      },
      type: ResponseType(NewPlayerProfileType, 'UpdatePlayer'),
      resolve: updateProfile,
    },
    limitedUpdate: {
      args: {
        profileId: {
          type: new GraphQLNonNull(GraphQLString),
        },
        phone2: {
          type: GraphQLString,
        },
        email2: {
          type: GraphQLString,
        },
      },
      type: SuccessType,
      resolve: limitedUpdateProfile,
    },
    updateEmail: {
      args: {
        email: {
          type: GraphQLString,
        },
        playerUUID: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      type: ResponseType(null, 'updateEmailType'),
      resolve: updateEmail,
    },
    verifyPhone: {
      args: {
        playerUUID: {
          type: new GraphQLNonNull(GraphQLString),
        },
        phone: {
          type: GraphQLString,
        },
      },
      type: ResponseType(NewPlayerProfileType, 'verifyPhoneNewPlayerProfile'),
      resolve: verifyPhone,
    },
    verifyEmail: {
      args: {
        playerUUID: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      type: ResponseType(NewPlayerProfileType, 'verifyEmailNewPlayerProfile'),
      resolve: verifyEmail,
    },
    verifyProfile: {
      args: {
        playerUUID: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      type: ResponseType(NewPlayerProfileType, 'VerifyPlayerProfile'),
      resolve: verifyProfile,
    },
    markIsTest: {
      args: {
        playerUUID: { type: new GraphQLNonNull(GraphQLString) },
        isTest: { type: new GraphQLNonNull(GraphQLBoolean) },
      },
      type: ResponseType(NewPlayerProfileType, 'MarkAsTest'),
      resolve: markIsTest,
    },
    clickToCall: {
      args: {
        number: { type: new GraphQLNonNull(GraphQLString) },
      },
      type: SuccessType,
      resolve: clickToCall,
    },
    updateRegulated: {
      args: {
        profileId: { type: new GraphQLNonNull(GraphQLString) },
        fatca: { type: new GraphQLNonNull(GraphQLBoolean) },
        crs: { type: GraphQLBoolean },
      },
      type: SuccessType,
      resolve: updateRegulated,
    },
    updateKYCStatus: {
      args: {
        playerUUID: {
          type: new GraphQLNonNull(GraphQLString),
        },
        kycStatus: {
          type: GraphQLString,
        },
      },
      type: SuccessType,
      resolve: updateKYCStatus,
    },
    updateConfiguration: {
      args: {
        playerUUID: {
          type: new GraphQLNonNull(GraphQLString),
        },
        internalTransfer: {
          type: GraphQLBoolean,
        },
        crs: {
          type: GraphQLBoolean,
        },
        fatca: {
          type: GraphQLBoolean,
        },
      },
      type: SuccessType,
      resolve: updateConfiguration,
    },
    updateContacts: {
      args: {
        playerUUID: {
          type: new GraphQLNonNull(GraphQLString),
        },
        phone: {
          type: GraphQLString,
        },
        additionalEmail: {
          type: GraphQLString,
        },
        additionalPhone: {
          type: GraphQLString,
        },
        email: {
          type: GraphQLString,
        },
      },
      type: ResponseType(NewPlayerProfileType, 'updatedContactsNewPlayerProfile'),
      resolve: updateContacts,
    },
    updateAddress: {
      args: {
        playerUUID: {
          type: new GraphQLNonNull(GraphQLString),
        },
        countryCode: {
          type: GraphQLString,
        },
        city: {
          type: GraphQLString,
        },
        state: {
          type: GraphQLString,
        },
        postCode: {
          type: GraphQLString,
        },
        address: {
          type: GraphQLString,
        },
      },
      type: ResponseType(NewPlayerProfileType, 'UpdatePlayerProfileAddressType'),
      resolve: updateAddress,
    },
    updatePersonalInformation: {
      args: {
        playerUUID: {
          type: new GraphQLNonNull(GraphQLString),
        },
        firstName: {
          type: GraphQLString,
        },
        lastName: {
          type: GraphQLString,
        },
        languageCode: {
          type: GraphQLString,
        },
        gender: {
          type: GraphQLString,
        },
        birthDate: {
          type: GraphQLString,
        },
        passport: {
          type: passportInput,
        },
        identificationNumber: {
          type: GraphQLString,
        },
        timeZone: {
          type: GraphQLString,
        },
      },
      type: ResponseType(NewPlayerProfileType, 'UpdatePlayerPersonalInformationType'),
      resolve: updatePersonalInformation,
    },
  }),
});

module.exports = PlayerMutation;
