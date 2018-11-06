const { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLID } = require('graphql');
const BigInt = require('graphql-bigint');
const { MoneyType } = require('../../common/types');
const { types } = require('../../../constants/limits');
const { NoteType } = require('../NoteType');

const PaymentLimitType = new GraphQLObjectType({
  name: 'PaymentLimit',
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLID), resolve: ({ uuid }) => uuid },
    uuid: { type: new GraphQLNonNull(GraphQLID) },
    playerUUID: { type: new GraphQLNonNull(GraphQLString) },
    creationDate: { type: new GraphQLNonNull(GraphQLString) },
    startDate: { type: new GraphQLNonNull(GraphQLString) },
    expirationDate: { type: GraphQLString },
    status: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: ({ status }) => (status ? status.replace('_DGA', '') : status),
    },
    author: { type: new GraphQLNonNull(GraphQLString) },
    statusAuthor: { type: new GraphQLNonNull(GraphQLString) },
    period: { type: BigInt },
    type: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: () => types.REGULATION,
    },
    value: {
      type: new GraphQLObjectType({
        name: 'PaymentLimitValue',
        fields: () => ({
          type: { type: new GraphQLNonNull(GraphQLString) },
          limit: { type: MoneyType },
          used: { type: MoneyType },
          left: { type: MoneyType },
        }),
      }),
    },
    note: { type: NoteType },
  }),
});

module.exports = PaymentLimitType;
