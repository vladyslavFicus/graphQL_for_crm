const fetch = require('./fetch');
const getBaseUrl = require('./getBaseUrl');

const getBrandConfigRequest = (brandId, authorization) =>
  fetch(`${getBaseUrl('brand-config-service')}/brand/${brandId}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  }).then(response => response.json());

const createBrandConfigRequest = (args, authorization) =>
  fetch(`${getBaseUrl('brand-config-service')}/brand`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => response.json());

const updateBrandConfigRequest = (args, authorization) =>
  fetch(`${getBaseUrl('brand-config-service')}/brand`, {
    method: 'PUT',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => response.json());

const deleteBrandConfigRequest = (brandId, authorization) =>
  fetch(`${getBaseUrl('brand-config-service')}/brand/${brandId}`, {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(response => (response.error ? response : { success: true }));

module.exports = {
  getBrandConfigRequest,
  createBrandConfigRequest,
  updateBrandConfigRequest,
  deleteBrandConfigRequest,
};
