const { GraphQLObjectType, GraphQLNonNull, GraphQLInt, GraphQLList, GraphQLBoolean } = require('graphql');

const createPageableType = (ContentType, additionalFields = {}, customName = '') =>
  new GraphQLObjectType({
    name: `Pageable__${customName || ContentType.name}`,
    fields: () => ({
      page: {
        type: new GraphQLNonNull(GraphQLInt),
        resolve(object) {
          return object.page || 0;
        },
      },
      number: { type: GraphQLInt },
      totalElements: { type: GraphQLInt },
      totalPages: {
        type: GraphQLInt,
        resolve({ size, totalElements }) {
          return totalElements && size ? Math.ceil(totalElements / size) : 0;
        },
      },
      size: { type: new GraphQLNonNull(GraphQLInt) },
      content: { type: new GraphQLList(ContentType) },
      last: {
        type: new GraphQLNonNull(GraphQLBoolean),
        resolve(object) {
          return object.last || object.content.length === 0 || object.content.length < object.size;
        },
      },
      ...additionalFields,
    }),
  });

module.exports = createPageableType;
