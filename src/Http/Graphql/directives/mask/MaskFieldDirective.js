const { SchemaDirectiveVisitor } = require('graphql-tools');
const maskText = require('../../../../utils/maskText');

/**
 * Directive for masking field
 *
 * Example:
 * type Profile {
 *   phone: String @mask_field,
 * }
 */
class MaskFieldDirective extends SchemaDirectiveVisitor {
  /**
   * Directive definition for field resolver
   *
   * Directive mask field value
   *
   * @param field
   */
  visitFieldDefinition(field) {
    const { resolve } = field;

    field.resolve = async (source, args, context, info) => {
      let result;

      // Check if custom resolver available --> wait to resolve promise and set to result variable
      if (resolve) {
        result = await resolve(source, args, context, info);
      } else {
        result = source[field.name];
      }

      return result ? maskText(result, true) : null;
    };
  }
}

module.exports = MaskFieldDirective;
