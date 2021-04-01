/**
 * Mask text under the ***
 *
 * Example:
 *   Input: +38050505050
 *   Output; +38*******50
 *
 * @param value Text to masking
 * @param maskAll
 *
 * @return {string}
 */
module.exports = (value, maskAll) => {
  if (maskAll) {
    return '*'.repeat(value.length);
  }

  if (!value || value.length <= 5) {
    return value;
  }

  return value.substr(0, 3) + '*'.repeat(value.length - 5) + value.substr(-2);
};
