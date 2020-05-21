const { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLInt } = require('graphql');
const ProfileViewType = require('../ProfileViewType');
const OperatorType = require('../OperatorType');
const {
  operators: { getOperatorByUUID },
} = require('../../common/resolvers');

const NotificationCenterDetailsType = new GraphQLObjectType({
  name: 'NotificationCenterDetailsType',
  fields: () => ({
    login: { type: GraphQLInt },
    platformType: { type: GraphQLString },
    amount: { type: GraphQLString },
    currency: { type: GraphQLString },
    callbackTime: { type: GraphQLString },
  }),
});

const NotificationCenterType = new GraphQLObjectType({
  name: 'NotificationCenterType',
  fields: () => ({
    read: { type: GraphQLBoolean },
    uuid: { type: GraphQLString },
    priority: { type: GraphQLString },
    client: {
      type: ProfileViewType,
      resolve: ({ profileUuid }, _, { dataloaders }) => {
        return profileUuid ? dataloaders.clientsPersonalInfo.load(profileUuid) : null;
      },
    },
    agent: {
      type: OperatorType,
      resolve: ({ operatorUuid }, _, { dataloaders }) => dataloaders.operators.load(operatorUuid),
    },
    createdAt: { type: GraphQLString },
    type: { type: GraphQLString },
    subtype: { type: GraphQLString },
    details: {
      type: NotificationCenterDetailsType,
    },
  }),
});

module.exports = NotificationCenterType;
