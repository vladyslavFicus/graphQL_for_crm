const { SchemaDirectiveVisitor } = require('graphql-tools');

/**
 * Directive to remove argument depends on auth action
 *
 * Example:
 * type Lead {
 *   mobile: String @auth_hide_not_required_argument(action: "lead.field.mobile"),
 * }
 */
class AuthHideNotRequiredArgumentDirective extends SchemaDirectiveVisitor {
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
      // Check if user hasn't access to field or field is null then remove from arguments object
      if (context.auth.denies(this.args.action) || args[argument.name] === null) {
        delete args[argument.name];
      }

      // Check if field is empty then change it to null value
      if (args[argument.name] === '') { 
        args[argument.name] = null;
      }

      return resolve(source, args, context, info);
    };
  }
}

module.exports = AuthHideNotRequiredArgumentDirective;
