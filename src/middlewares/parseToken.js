const jwtDecode = require('jwt-decode');
const { INTERNAL } = require('../constants/errors');

module.exports = (req, res, next) => {
  const authorization = req.header('authorization');
  const [, token] = authorization ? authorization.split(' ') : [, null];

  req.auth = {
    token,
    department: null,
    brandId: null,
    uuid: null,
  };

  if (req.auth.token) {
    try {
      const decodedToken = jwtDecode(req.auth.token);

      if (decodedToken) {
        req.auth.department = decodedToken.department;
        req.auth.brandId = decodedToken.brandId;
        req.auth.uuid = decodedToken.user_uuid;
      }
    } catch (e) {
      return res
        .status(500)
        .json({ error: INTERNAL })
        .send();
    }
  }

  next();
};
