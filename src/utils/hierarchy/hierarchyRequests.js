const fetch = require('../fetch');
const getBaseUrl = require('../getBaseUrl');
const buildQueryString = require('../buildQueryString');

const getHierarchyUsers = (userUuids, authorization) => {
  return fetch(`${getBaseUrl('hierarchy')}/user/search`, {
    method: 'POST',
    headers: {
      authorization,
      accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify({ userUuids }),
  }).then(response => response.json());
};

const getCustomersSubtree = (userId, authorization) => {
  return fetch(`${getBaseUrl('hierarchy')}/user/${userId}/customers`, {
    method: 'GET',
    headers: {
      authorization,
      accept: 'application/json',
      'content-type': 'application/json',
    },
  }).then(response => response.json());
};

const getLeadsSubtree = (userId, authorization) => {
  return fetch(`${getBaseUrl('hierarchy')}/user/${userId}/leads`, {
    method: 'GET',
    headers: {
      authorization,
      accept: 'application/json',
      'content-type': 'application/json',
    },
  }).then(response => response.json());
};

// # Implemented in HierarchyAPI
// # Can be removed after getOperators request refactoring
const getOperatorsSubtree = (userId, authorization) => {
  return fetch(`${getBaseUrl('hierarchy')}/user/${userId}/operators`, {
    method: 'GET',
    headers: {
      authorization,
      accept: 'application/json',
      'content-type': 'application/json',
    },
  }).then(response => response.json());
};

const getPartnersSubtree = (userId, authorization) => {
  return fetch(`${getBaseUrl('hierarchy')}/user/${userId}/affiliate-partners`, {
    method: 'GET',
    headers: {
      authorization,
      accept: 'application/json',
      'content-type': 'application/json',
    },
  }).then(response => response.json());
};

const getHierarchyBranch = (branchId, authorization) => {
  return fetch(`${getBaseUrl('hierarchy')}/branch/${branchId}`, {
    method: 'GET',
    headers: {
      authorization,
      accept: 'application/json',
      'content-type': 'application/json',
    },
  }).then(response => response.json());
};

const getUsersByType = (types, authorization) => {
  return fetch(`${getBaseUrl('hierarchy')}/user/bytype?${buildQueryString({ t: types })}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  }).then(response => response.json());
};

const getBranchChildren = (uuid, authorization) => {
  return fetch(`${getBaseUrl('hierarchy')}/branch/${uuid}/children`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  }).then(response => response.json());
};

module.exports = {
  getHierarchyUsers,
  getHierarchyBranch,
  getCustomersSubtree,
  getLeadsSubtree,
  getOperatorsSubtree,
  getPartnersSubtree,
  getUsersByType,
  getBranchChildren,
};
