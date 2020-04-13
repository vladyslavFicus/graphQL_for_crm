const { signInRequest, chooseDepartmentRequest } = require('../../../utils/authorization');

const signIn = async (_, args) => {
  return await signInRequest(args);
};

const chooseDepartment = async (_, args, { headers: { authorization } }) => {
  return await chooseDepartmentRequest(args, authorization);
};

module.exports = {
  signIn,
  chooseDepartment,
};
