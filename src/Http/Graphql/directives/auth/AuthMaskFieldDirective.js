const { SchemaDirectiveVisitor } = require('graphql-tools');
const maskText = require('../../../../utils/maskText');

/**
 * Directive for masking text depends on auth action
 *
 * Example:
 * type Profile {
 *   phone: String @auth_mask_field(action: "profile.field.phone"),
 * }
 */
class AuthMaskFieldDirective extends SchemaDirectiveVisitor {
  /**
   * Directive definition for field resolver
   *
   * Directive mask field value if it's string and length more than 5 symbols
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

      // Check if result is string type and user hasn't access to field
      if (typeof result === 'string' && context.auth.denies(this.args.action)) {
        return maskText(result);
      }

      return result;
    };
  }
}

module.exports = AuthMaskFieldDirective;
