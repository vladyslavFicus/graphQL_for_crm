const { SchemaDirectiveVisitor } = require('graphql-tools');

/**
 * Directive to remove argument depends on auth action
 *
 * Example:
 * type Profile {
 *   phone: String @auth_hide_argument(action: "profile.field.phone"),
 * }
 */
class AuthHideArgumentDirective extends SchemaDirectiveVisitor {
  /**
   * Directive definition for argument field
   *
   * Directive removed argument value if user hasn't permission to change this field
   *
   * @param argument
   * @param field
   */
  visitArgumentDefinition(argument, { field }) {
    const { resolve } = field;

    field.resolve = (source, args, context, info) => {
      // Check if user hasn't access to field then remove from arguments object
      if (context.auth.denies(this.args.action)) {
        delete args[argument.name];
      }

      return resolve(source, args, context, info);
    };
  }
}

module.exports = AuthHideArgumentDirective;
