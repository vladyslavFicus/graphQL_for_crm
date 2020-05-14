const { SchemaDirectiveVisitor } = require('graphql-tools');
const { GraphQLObjectType, GraphQLList } = require('graphql');
const ErrorType = require('../../../graphql/common/types/ErrorType');

/**
 * Response type factory for content types
 *
 * @param ContentType
 * @param typeName
 * @return {GraphQLObjectType}
 * @constructor
 */
const ResponseTypeFactory = (ContentType, typeName) =>
  new GraphQLObjectType({
    name: typeName,
    fields: () => ({
      error: { type: ErrorType },
      errors: { type: new GraphQLList(ErrorType) },
      ...(ContentType && {
        data: {
          type: ContentType,
          resolve(_) {
            return Array.isArray(_) ? _ : _.data;
          },
        },
      }),
    }),
  });

/**
 * Directive for ResponseType
 *
 * Example:
 * type Query {
 *   options: Options @response, // Result type: Response_Options
 *   profile: Profile @response("ResponseProfileType"), // Result type: ResponseProfileType
 * }
 */
class ResponseDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve } = field;
    const ResponseType = ResponseTypeFactory(field.type, this.args.type || `Response__${field.type}`);

    // Workaround to add new created type on top level of schema
    if (!this.schema._typeMap[ResponseType.name]) {
      this.schema._typeMap[ResponseType.name] = ResponseType;
    }

    field.type = ResponseType;

    field.resolve = async (...args) => {
      if (resolve) {
        const data = await resolve(...args);

        return { data };
      }
    };
  }
}

module.exports = ResponseDirective;
