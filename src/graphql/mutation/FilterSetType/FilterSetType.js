const { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLBoolean } = require('graphql');
const {
  filterSet: { createFilterSet, updateFilterSet, updateFilterFavourite, deleteFilterSet },
} = require('../../common/resolvers');
const { ResponseType } = require('../../common/types');
const SuccessType = require('../../query/SuccessType');
const { FilterType } = require('../../query/FilterSetType');

const FilterSetMutation = new GraphQLObjectType({
  name: 'FilterSetMutation',
  fields: () => ({
    create: {
      args: {
        type: { type: new GraphQLNonNull(GraphQLString) },
        fields: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        favourite: { type: new GraphQLNonNull(GraphQLBoolean) },
      },
      type: ResponseType(FilterType, 'FilterCreatedTypeMutation'),
      resolve: createFilterSet,
    },
    update: {
      args: {
        fields: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        uuid: { type: new GraphQLNonNull(GraphQLString) },
      },
      type: SuccessType,
      resolve: updateFilterSet,
    },
    updateFavourite: {
      args: {
        favourite: { type: new GraphQLNonNull(GraphQLBoolean) },
        uuid: { type: new GraphQLNonNull(GraphQLString) },
      },
      type: SuccessType,
      resolve: updateFilterFavourite,
    },
    delete: {
      args: {
        uuid: { type: new GraphQLNonNull(GraphQLString) },
      },
      type: ResponseType(
        new GraphQLObjectType({
          name: 'DeletedFilterSetType',
          fields: () => ({
            uuid: { type: GraphQLString },
          }),
        })
      ),
      resolve: deleteFilterSet,
    },
  }),
});

module.exports = FilterSetMutation;
