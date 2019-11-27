const { signInRequest, chooseDepartmentRequest } = require('../../../utils/authorization');
const { getAuthorities } = require('../../../utils/auth');

const signIn = async function(_, args) {
  return await signInRequest(args);
};

const chooseDepartment = async function(_, args, { headers: { authorization } }) {
  return await chooseDepartmentRequest(args, authorization);
};

module.exports = {
  signIn,
  chooseDepartment,
};
