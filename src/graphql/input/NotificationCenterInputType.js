const { GraphQLInputObjectType, GraphQLBoolean, GraphQLString, GraphQLList } = require('graphql');

const PageInputType = require('./PageInputType');

const NotificationCenterInputType = new GraphQLInputObjectType({
  name: 'NotificationCenterInputType',
  fields: () => ({
    hierarchical: { type: GraphQLBoolean },
    searchKeyword: { type: GraphQLString },
    notificationTypes: { type: new GraphQLList(GraphQLString) },
    notificationSubtypes: { type: new GraphQLList(GraphQLString) },
    priorities: { type: new GraphQLList(GraphQLString) },
    creationDateRange: {
      type: new GraphQLInputObjectType({
        name: 'NotificationCenterDateRange',
        fields: () => ({
          from: { type: GraphQLString },
          to: { type: GraphQLString },
        }),
      }),
    },
    operators: { type: new GraphQLList(GraphQLString) },
    operatorTeams: { type: new GraphQLList(GraphQLString) },
    operatorDesks: { type: new GraphQLList(GraphQLString) },
    page: { type: PageInputType },
  }),
});

module.exports = NotificationCenterInputType;
