const { GraphQLObjectType, GraphQLNonNull, GraphQLString } = require('graphql');
const { GraphQLJSONObject } = require('graphql-type-json');
const {
  brandConfig: { createBrandConfig, updateBrandConfig, deleteBrandConfig },
} = require('../../common/resolvers');
const { ResponseType } = require('../../common/types');
const SuccessType = require('../../query/SuccessType');

const BrandConfigMutation = new GraphQLObjectType({
  name: 'BrandConfigMutation',
  fields: () => ({
    create: {
      type: ResponseType(GraphQLJSONObject, 'CreateBrandConfigType'),
      args: {
        brandId: { type: new GraphQLNonNull(GraphQLString) },
        config: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: createBrandConfig,
    },

    update: {
      type: ResponseType(GraphQLJSONObject, 'UpdateBrandConfigType'),
      args: {
        brandId: { type: new GraphQLNonNull(GraphQLString) },
        config: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: updateBrandConfig,
    },

    delete: {
      type: SuccessType,
      args: {
        brandId: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: deleteBrandConfig,
    },
  }),
});

module.exports = BrandConfigMutation;
