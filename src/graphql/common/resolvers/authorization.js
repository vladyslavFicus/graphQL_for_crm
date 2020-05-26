const { signInRequest, chooseDepartmentRequest } = require('../../../utils/authorization');

const signIn = (_, args) => {
  return signInRequest(args);
};

const chooseDepartment = (_, args, { headers: { authorization } }) => {
  return chooseDepartmentRequest(args, authorization);
};

module.exports = {
  signIn,
  chooseDepartment,
};
