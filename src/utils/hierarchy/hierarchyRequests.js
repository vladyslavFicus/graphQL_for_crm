const fetch = require('../fetch');
const parseJson = require('../parseJson');
const getBaseUrl = require('../getBaseUrl');
const buildQueryString = require('../buildQueryString');

const createUser = (args, authorization) => {
  return fetch(`${getBaseUrl('hierarchy-updater')}/user`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => response.json());
};

const createBranch = (args, authorization) => {
  return fetch(`${getBaseUrl('hierarchy-updater')}/branch`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  })
    .then(response => response.text())
    .then(response => parseJson(response))
    .then(response => response);
};

const getHierarchyUser = (userId, authorization) => {
  return fetch(`${getBaseUrl('hierarchy')}/user/${userId}`, {
    method: 'GET',
    headers: {
      authorization,
      accept: 'application/json',
      'content-type': 'application/json',
    },
  }).then(response => response.json());
};

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

const getBranchHierarchyTree = (uuid, authorization) => {
  return fetch(`${getBaseUrl('hierarchy')}/branch/hierarchy/${uuid}`, {
    method: 'GET',
    headers: {
      authorization,
      accept: 'application/json',
      'content-type': 'application/json',
    },
  }).then(response => response.json());
};

const getUserBranchHierarchy = (userUUID, authorization, brandId) => {
  return fetch(
    `${getBaseUrl('hierarchy')}/branch/hierarchy/user/${userUUID}?${buildQueryString({
      brandId,
    })}`,
    {
      method: 'GET',
      headers: {
        authorization,
        accept: 'application/json',
        'content-type': 'application/json',
      },
    }
  ).then(response => response.json());
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

const getBranchHierarchy = ({ branchType, ...args }, userUUID, authorization) => {
  return fetch(`${getBaseUrl('hierarchy')}/branch/hierarchy/user/${userUUID}/${branchType}`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => response.json());
};

const getUsersByBranch = (args, authorization) => {
  return fetch(`${getBaseUrl('hierarchy')}/user/search/hierarchy`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
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

const updateUserBranches = ({ operatorId, ...args }, authorization) => {
  return fetch(`${getBaseUrl('hierarchy-updater')}/user/${operatorId}/relationship/parent-branch`, {
    method: 'PUT',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => response.json());
};

const updateHierarchyUser = ({ operatorId, ...args }, authorization) => {
  return fetch(`${getBaseUrl('hierarchy-updater')}/user/${operatorId}`, {
    method: 'PUT',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => response.json());
};

const getBrand = (brandId, authorization) => {
  return fetch(`${getBaseUrl('hierarchy')}/branch/brand?${buildQueryString({ brandId })}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  }).then(response => response.json());
};

const addBranchManager = ({ branchUuid, ...args }, authorization) => {
  return fetch(`${getBaseUrl('hierarchy-updater')}/branch/${branchUuid}/manager`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => response.json());
};

const removeBranchManager = (branchUuid, authorization) => {
  return fetch(`${getBaseUrl('hierarchy-updater')}/branch/${branchUuid}/manager`, {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  }).then(response => ({ success: response.status === 200 }));
};

module.exports = {
  createUser,
  createBranch,
  addBranchManager,
  removeBranchManager,
  getHierarchyUser,
  getHierarchyUsers,
  getHierarchyBranch,
  getCustomersSubtree,
  getLeadsSubtree,
  getOperatorsSubtree,
  getPartnersSubtree,
  getUserBranchHierarchy,
  getUsersByType,
  getBranchHierarchy,
  getBranchHierarchyTree,
  getUsersByBranch,
  getBranchChildren,
  getBrand,
  updateUserBranches,
  updateHierarchyUser,
};
