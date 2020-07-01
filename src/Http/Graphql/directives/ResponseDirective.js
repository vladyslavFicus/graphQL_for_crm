const { SchemaDirectiveVisitor } = require('graphql-tools');
const { GraphQLString, GraphQLObjectType, GraphQLList, GraphQLNonNull, GraphQLScalarType } = require('graphql');

const ErrorType = new GraphQLObjectType({
  name: 'Error',
  description: 'User error type 4**',
  fields: () => ({
    error: {
      type: GraphQLString,
      resolve(_) {
        return _.error || _.errorMessage || (typeof _ === 'string' ? _ : null);
      },
    },
    fields_errors: {
      type: new GraphQLScalarType({
        name: 'elements',
        serialize(value) {
          return value;
        },
      }),
    },
    errorParameters: {
      type: new GraphQLScalarType({
        name: 'errorParameters',
        serialize(value) {
          return value;
        },
      }),
    },
  }),
});

/**
 * Response type factory for content types
 *
 * @param ContentType
 * @param typeName
 * @return {GraphQLObjectType}
 * @constructor
 */
const ResponseTypeFactory = (ContentType, typeName) => new GraphQLObjectType({
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
  /**
   * Build type name if exist nested types such as GraphQLNonNull or GraphQLList
   *
   * Example:
   * {
   *  profile: Profile @response // Profile
   *  profile: Profile! @response // NonNull_Profile
   *  profile: [Profile] @response // List_Profile
   *  profile: [Profile]! @response // NonNull_List_Profile
   *  profile: [Profile!]! @response // NonNull_List_NonNull_Profile
   * }
   *
   * @param type
   *
   * @return {string}
   */
  buildTypeName(type) {
    let typeName = '';

    if (type instanceof GraphQLNonNull) {
      typeName += 'NonNull_';
    }

    if (type instanceof GraphQLList) {
      typeName += 'List_';
    }

    if (type.ofType) {
      typeName += this.buildTypeName(type.ofType);
    } else {
      typeName = type.name;
    }

    return typeName;
  }

  visitFieldDefinition(field) {
    const typeName = this.args.type || `Response__${this.buildTypeName(field.type)}`;
    const ResponseType = ResponseTypeFactory(field.type, typeName);

    // Workaround to add new created type on top level of schema
    if (!this.schema._typeMap[ResponseType.name]) {
      this.schema._typeMap[ResponseType.name] = ResponseType;
    }

    field.type = ResponseType;

    const { resolve } = field;

    field.resolve = async (...args) => {
      if (resolve) {
        const data = await resolve(...args);

        return { data };
      }

      return null;
    };
  }
}

module.exports = ResponseDirective;
