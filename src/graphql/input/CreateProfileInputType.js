const { GraphQLInputObjectType, GraphQLBoolean, GraphQLString } = require('graphql');

const CreateProfileInputType = new GraphQLInputObjectType({
  name: 'CreateProfileInputType',
  fields: () => ({
    address: {
      type: new GraphQLInputObjectType({
        name: 'CreateProfileInputTypeAddress',
        fields: () => ({
          countryCode: { type: GraphQLString },
          city: { type: GraphQLString },
          state: { type: GraphQLString },
          postCode: { type: GraphQLString },
          address: { type: GraphQLString },
        }),
      }),
    },
    brandId: { type: GraphQLString },
    contacts: {
      type: new GraphQLInputObjectType({
        name: 'CreateProfileInputTypeContacts',
        fields: () => ({
          email: { type: GraphQLString },
          phone: { type: GraphQLString },
          additionalEmail: { type: GraphQLString },
          additionalPhone: { type: GraphQLString },
        }),
      }),
    },
    firstName: { type: GraphQLString },
    languageCode: { type: GraphQLString },
    lastName: { type: GraphQLString },
    password: { type: GraphQLString },
    gender: { type: GraphQLString },
    birthDate: { type: GraphQLString },
    affiliate: {
      type: new GraphQLInputObjectType({
        name: 'CreateProfileInputTypeAffiliate',
        fields: () => ({
          source: { type: GraphQLString },
          referral: { type: GraphQLString },
          sms: { type: GraphQLString },
        }),
      }),
    },
    configuration: {
      type: new GraphQLInputObjectType({
        name: 'CreateProfileInputTypeConfiguration',
        fields: () => ({
          internalTransfer: { type: GraphQLBoolean },
          crs: { type: GraphQLBoolean },
          fatca: { type: GraphQLBoolean },
        }),
      }),
    },
  }),
});

module.exports = CreateProfileInputType;
