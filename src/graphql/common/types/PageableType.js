const { GraphQLObjectType, GraphQLNonNull, GraphQLInt, GraphQLList, GraphQLBoolean } = require('graphql');

const createPageableType = (ContentType, additionalFields = {}, customName = '') =>
  new GraphQLObjectType({
    name: `Pageable__${customName || ContentType.name}`,
    fields: () => ({
      page: {
        type: new GraphQLNonNull(GraphQLInt),
        resolve: ({ page }) => page || 0,
      },
      number: { type: GraphQLInt },
      totalElements: { type: GraphQLInt },
      totalPages: {
        type: GraphQLInt,
        resolve: ({ size, totalElements }) => (totalElements && size ? Math.ceil(totalElements / size) : 0),
      },
      size: { type: new GraphQLNonNull(GraphQLInt) },
      content: { type: new GraphQLList(ContentType) },
      last: {
        type: new GraphQLNonNull(GraphQLBoolean),
        resolve: ({ last, totalElements, totalPages, number }) =>
          last || totalElements === 0 || totalPages - 1 === number,
      },
      ...additionalFields,
    }),
  });

module.exports = createPageableType;
