const { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLInt, GraphQLNonNull } = require('graphql');
const SuccessType = require('../../query/SuccessType');
const { updateNotificationCenter } = require('../../common/resolvers/notificationCenter');

const NotificationCenterType = new GraphQLObjectType({
  name: 'NotificationCenterMutation',
  fields: () => ({
    update: {
      args: {
        incUuids: { type: new GraphQLList(GraphQLString) },
        excUuids: { type: new GraphQLList(GraphQLString) },
        totalElements: { type: new GraphQLNonNull(GraphQLInt) },
      },
      type: SuccessType,
      resolve: updateNotificationCenter,
    },
  }),
});

module.exports = NotificationCenterType;
