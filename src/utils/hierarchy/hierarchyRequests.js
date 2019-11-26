const fetch = require('../fetch');
const parseJson = require('../parseJson');
const buildQueryString = require('../buildQueryString');

const createUser = (args, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/hierarchy-updater/user`, {
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
  return fetch(`${global.appConfig.apiUrl}/hierarchy-updater/branch`, {
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
  return fetch(`${global.appConfig.apiUrl}/hierarchy/user/${userId}`, {
    method: 'GET',
    headers: {
      authorization,
      accept: 'application/json',
      'content-type': 'application/json',
    },
  }).then(response => response.json());
};

const getHierarchyUsers = (userUuids, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/hierarchy/user/search`, {
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
  return fetch(`${global.appConfig.apiUrl}/hierarchy/user/${userId}/customers`, {
    method: 'GET',
    headers: {
      authorization,
      accept: 'application/json',
      'content-type': 'application/json',
    },
  }).then(response => response.json());
};

const getLeadsSubtree = (userId, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/hierarchy/user/${userId}/leads`, {
    method: 'GET',
    headers: {
      authorization,
      accept: 'application/json',
      'content-type': 'application/json',
    },
  }).then(response => response.json());
};

const getObserverForSubtree = (userId, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/hierarchy/user/${userId}/observer-for`, {
    method: 'GET',
    headers: {
      authorization,
      accept: 'application/json',
      'content-type': 'application/json',
    },
  }).then(response => response.json());
};

const getOperatorsSubtree = (userId, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/hierarchy/user/${userId}/operators`, {
    method: 'GET',
    headers: {
      authorization,
      accept: 'application/json',
      'content-type': 'application/json',
    },
  }).then(response => response.json());
};

const getPartnersSubtree = (userId, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/hierarchy/user/${userId}/affiliate-partners`, {
    method: 'GET',
    headers: {
      authorization,
      accept: 'application/json',
      'content-type': 'application/json',
    },
  }).then(response => response.json());
};

const checkAccess = (uuid, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/hierarchy/user/${uuid}/check-access`, {
    method: 'GET',
    headers: {
      authorization,
      accept: 'application/json',
      'content-type': 'application/json',
    },
  }).then(response => response.status !== 403);
};

const getHierarchyBranch = (branchId, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/hierarchy/branch/${branchId}`, {
    method: 'GET',
    headers: {
      authorization,
      accept: 'application/json',
      'content-type': 'application/json',
    },
  }).then(response => response.json());
};

const getBranchHierarchyTree = (uuid, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/hierarchy/branch/hierarchy/${uuid}`, {
    method: 'GET',
    headers: {
      authorization,
      accept: 'application/json',
      'content-type': 'application/json',
    },
  }).then(response => response.json());
};

const getUserBranchHierarchy = (userId, authorization, brandId) => {
  return fetch(
    `${global.appConfig.apiUrl}/hierarchy/branch/hierarchy/user/${userId}?${buildQueryString({
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
  return fetch(`${global.appConfig.apiUrl}/hierarchy/user/bytype?${buildQueryString({ t: types })}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  }).then(response => response.json());
};

const getBranchHierarchy = ({ operatorId, branchType, ...args }, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/hierarchy/branch/hierarchy/user/${operatorId}/${branchType}`, {
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
  return fetch(`${global.appConfig.apiUrl}/hierarchy/user/search/hierarchy`, {
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
  return fetch(`${global.appConfig.apiUrl}/hierarchy/branch/${uuid}/children`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  }).then(response => response.json());
};

const updateUserBranches = ({ operatorId, ...args }, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/hierarchy-updater/user/${operatorId}/relationship/parent-branch`, {
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
  return fetch(`${global.appConfig.apiUrl}/hierarchy-updater/user/${operatorId}`, {
    method: 'PUT',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => response.json());
};

const bulkUpdateHierarchyUser = (args, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/hierarchy-updater/bulk/user/relationship/parent-user`, {
    method: 'PUT',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => response.json());
};

const bulkMassAssignHierarchyUser = (args, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/hierarchy-updater/bulk/user/multi-assignment`, {
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
  return fetch(`${global.appConfig.apiUrl}/hierarchy/branch/brand?${buildQueryString({ brandId })}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  }).then(response => response.json());
};

module.exports = {
  createUser,
  createBranch,
  getHierarchyUser,
  getHierarchyUsers,
  getHierarchyBranch,
  getCustomersSubtree,
  getLeadsSubtree,
  getOperatorsSubtree,
  getPartnersSubtree,
  getObserverForSubtree,
  checkAccess,
  getUserBranchHierarchy,
  getUsersByType,
  getBranchHierarchy,
  getBranchHierarchyTree,
  getUsersByBranch,
  getBranchChildren,
  bulkUpdateHierarchyUser,
  bulkMassAssignHierarchyUser,
  getBrand,
  updateUserBranches,
  updateHierarchyUser,
};
