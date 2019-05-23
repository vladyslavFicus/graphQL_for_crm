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
const getLastProfileData = (_, args, { headers: { authorization } }) => {
  return getLastProfileDataRequest(args.profileUUID, authorization);
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
