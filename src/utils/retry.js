/**
 * Delay code execution for some timeout
 *
 * @param tiemout {number} Delay on timeout in ms
 *
 * @return {Promise<any>}
 */
const delay = tiemout => new Promise(resolve => setTimeout(resolve, tiemout));

/**
 * Retry function N times with timeout if validator function return === false
 *
 * @param fn {function} Source function to execute
 * @param validator {function} Validator function to check result source function validity
 * @param maxTries {number} Max count of tries
 * @param timeout {number} Timeout to delay retry function execution again
 *
 * @return {Promise<*>}
 */
const retry = async (fn, validator, maxTries, timeout = 1000) => {
  const result = await fn();

  // Return result if result of source function is valid or max tries exceeded
  if (validator(result) || maxTries === 0) {
    if (result instanceof Error) {
      throw result;
    }

    return result;
  }

  await delay(timeout);

  return retry(fn, validator, maxTries - 1, timeout);
};

module.exports = {
  delay,
  retry,
};
