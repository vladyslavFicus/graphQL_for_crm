const { SchemaDirectiveVisitor } = require('graphql-tools');

/**
 * Directive to filter list of items depends on auth actions
 *
 * The action name should contain wildcard to values, like: payment.field.manual-methods.values.*
 * where "*" will be replaced to real value from resolver result and check permission on auth.
 *
 * Example:
 * type Query {
 *   manualPaymentMethods: [String] @auth_filter_values(action: "payment.field.manual-methods.values.*")
 * }
 */
class AuthFilterValuesDirective extends SchemaDirectiveVisitor {
  /**
   * Directive definition for field resolver
   *
   * Directive filter list of items depends on auth actions
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

      // If provided is an array then filter result depends on auth action
      if (Array.isArray(result)) {
        return result.filter(value => context.auth.allows(this.args.action.replace('*', value)));
      }

      return result;
    };
  }
}

module.exports = AuthFilterValuesDirective;
