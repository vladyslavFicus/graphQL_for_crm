const { GraphQLInputObjectType, GraphQLList, GraphQLInt } = require('graphql');

const SortInputType = require('./SortsInputType');

const PageInputType = new GraphQLInputObjectType({
  name: 'PageInputType',
  fields: () => ({
    from: { type: GraphQLInt },
    size: { type: GraphQLInt },
    sorts: { type: new GraphQLList(SortInputType) },
  }),
});

module.exports = PageInputType;
