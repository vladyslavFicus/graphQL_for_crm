const { SchemaDirectiveVisitor } = require('graphql-tools');
const maskPhoneField = require('../../../../utils/maskFeedsPhoneField');

/**
 * Directive for masking text depends on auth action
 *
 * Example:
 * type Feed {
 *   details: String @mask_feeds_details_field(),
 * }
 */
class MaskFeedsPhoneField extends SchemaDirectiveVisitor {
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

      return { ...result, content: result.content.map(item => maskPhoneField(item)) };
    };
  }
}

module.exports = MaskFeedsPhoneField;
