const { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLInt } = require('graphql');

const FeedType = new GraphQLObjectType({
  name: 'Feed',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    authorFullName: { type: new GraphQLNonNull(GraphQLString) },
    authorUuid: { type: new GraphQLNonNull(GraphQLString) },
    brandId: { type: GraphQLString },
    creationDate: { type: new GraphQLNonNull(GraphQLString) },
    details: { type: GraphQLString },
    ip: { type: GraphQLString },
    targetFullName: { type: GraphQLString },
    targetUuid: { type: new GraphQLNonNull(GraphQLString) },
    uuid: { type: GraphQLString },
    type: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

const FeedTypes = new GraphQLObjectType({
  name: 'FeedTypes',
  fields: () => ({
    PLAYER_PROFILE_CHANGED: { type: GraphQLString },
    RESET_PASSWORD: { type: GraphQLString },
    LOG_IN: { type: GraphQLString },
    CHANGE_PASSWORD: { type: GraphQLString },
    PLAYER_PROFILE_REGISTERED: { type: GraphQLString },
    LOG_OUT: { type: GraphQLString },
    FAILED_LOGIN_ATTEMPT: { type: GraphQLString },
  }),
});

module.exports = {
  FeedType,
  FeedTypes,
};
