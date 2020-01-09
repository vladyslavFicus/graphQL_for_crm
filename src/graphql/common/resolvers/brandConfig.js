const {
  getBrandConfigRequest,
  createBrandConfigRequest,
  updateBrandConfigRequest,
  deleteBrandConfigRequest,
} = require('../../../utils/brandConfigRequests');

const getBrandConfig = async (_, { brandId }, { brand, headers: { authorization } }) => {
  // crutch for handling 404 error:
  let res = null;
  try {
    res = await getBrandConfigRequest(brandId || brand.id, authorization);
  } catch (e) {
    res = {
      error: `Entity with id: ${brandId} not found`,
    };
  }

  return res;
};

const createBrandConfig = (_, args, { headers: { authorization } }) => {
  return createBrandConfigRequest(args, authorization);
};

const updateBrandConfig = (_, args, { headers: { authorization } }) => {
  return updateBrandConfigRequest(args, authorization);
};

const deleteBrandConfig = (_, { brandId }, { headers: { authorization } }) => {
  return deleteBrandConfigRequest(brandId, authorization);
};

module.exports = {
  getBrandConfig,
  createBrandConfig,
  updateBrandConfig,
  deleteBrandConfig,
};
