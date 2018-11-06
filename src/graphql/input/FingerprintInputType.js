const { GraphQLInt, GraphQLString, GraphQLList, GraphQLInputObjectType } = require('graphql');

const getFingerprintListType = Type => new GraphQLList(new GraphQLList(Type));

const FingerprintParamsType = new GraphQLInputObjectType({
  name: 'FingerprintParamsInput',
  fields() {
    return {
      available_resolution: { type: getFingerprintListType(GraphQLInt) },
      color_depth: { type: new GraphQLList(GraphQLString) },
      cpu_class: { type: new GraphQLList(GraphQLString) },
      do_not_track: { type: new GraphQLList(GraphQLString) },
      hardware_concurrency: { type: new GraphQLList(GraphQLString) },
      language: { type: new GraphQLList(GraphQLString) },
      navigator_platform: { type: new GraphQLList(GraphQLString) },
      pixel_ratio: { type: new GraphQLList(GraphQLString) },
      regular_plugins: { type: getFingerprintListType(GraphQLString) },
      resolution: { type: getFingerprintListType(GraphQLInt) },
      timezone_offset: { type: new GraphQLList(GraphQLInt) },
      user_agent: { type: new GraphQLList(GraphQLString) },
    };
  },
});

const FingerprintType = new GraphQLInputObjectType({
  name: 'FingerprintInput',
  fields() {
    return {
      hash: { type: GraphQLString },
      params: {
        type: FingerprintParamsType,
      },
    };
  },
});

FingerprintType.getFingerprintListType = getFingerprintListType;
FingerprintType.FingerprintParamsType = FingerprintParamsType;

module.exports = FingerprintType;
