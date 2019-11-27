const { get } = require('lodash');
const {
  getLastProfileData: getLastProfileDataRequest,
  changeStatus: changeStatusRequest,
} = require('../../../utils/questionnaireRequests');

/**
 * Get last questionnaire data for profile
 *
 * @param _
 * @param args
 * @param authorization
 *
 * @return {Promise<*>}
 */
const getLastProfileData = async (_, args, { headers: { authorization } }) => {
  try {
    return await getLastProfileDataRequest(args.profileUUID, authorization);
  } catch (e) {
    if (get(e, 'response.status') === 404) {
      return { error: 'error.entity.not.found' };
    }
  }
};

/**
 * Change questionnaire status
 *
 * @param _
 * @param args
 * @param authorization
 *
 * @return {Promise<*>}
 */
const changeQuestionnaireStatus = async (_, args, { headers: { authorization } }) => {
  const { error } = await changeStatusRequest(args, authorization);

  return {
    success: !error,
    error,
  };
};

module.exports = {
  getLastProfileData,
  changeQuestionnaireStatus,
};
