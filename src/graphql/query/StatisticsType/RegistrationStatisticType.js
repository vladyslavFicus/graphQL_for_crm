const { GraphQLInputObjectType, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } = require('graphql');

const AdditionalStatisticFieldValueType = new GraphQLObjectType({
  name: 'AdditionalStatisticFieldValueType',
  fields: () => ({
    value: { type: GraphQLInt },
  }),
});

const AdditionalStatisticType = new GraphQLObjectType({
  name: 'RegistrationAdditionalStatisticInput',
  fields: () => ({
    total: { type: AdditionalStatisticFieldValueType },
    month: { type: AdditionalStatisticFieldValueType },
    today: { type: AdditionalStatisticFieldValueType },
  }),
});

const RegistrationType = new GraphQLObjectType({
  name: 'RegistrationType',
  fields: () => ({
    entries: { type: GraphQLInt },
    entryDate: { type: GraphQLString },
  }),
});

const RegistrationStatisticType = new GraphQLObjectType({
  name: 'RegistrationStatistic',
  fields: () => ({
    additionalStatistics: { type: AdditionalStatisticType },
    registrations: { type: new GraphQLList(RegistrationType) },
  }),
});

const AdditionalStatisticRegistrationInputType = new GraphQLInputObjectType({
  name: 'AdditionalStatisticRegistrationInput',
  fields: () => ({
    from: { type: GraphQLString },
    to: { type: GraphQLString },
  }),
});

module.exports = RegistrationStatisticType;
module.exports.AdditionalStatisticRegistrationInputType = AdditionalStatisticRegistrationInputType;
