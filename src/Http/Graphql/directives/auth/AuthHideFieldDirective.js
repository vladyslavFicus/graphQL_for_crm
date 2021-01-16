const { SchemaDirectiveVisitor } = require('graphql-tools');

/**
 * Directive for hiding field depends on auth action
 *
 * Example:
 * type Profile {
 *   phone: String @auth_hide_field(action: "profile.referrer.field.uuid"),
 * }
 */
class AuthHideFieldDirective extends SchemaDirectiveVisitor {
  /**
   * Directive definition for field resolver
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

      // Check if user hasn't access to field
      if (context.auth.denies(this.args.action)) {
        return null;
      }

      return result;
    };
  }
}

module.exports = AuthHideFieldDirective;
