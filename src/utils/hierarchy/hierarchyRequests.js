const fetch = require('../fetch');
const parseJson = require('../parseJson');
const buildQueryString = require('../buildQueryString');

const createUser = (args, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/trading_hierarchy_updater/user`, {
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
  return fetch(`${global.appConfig.apiUrl}/trading_hierarchy_updater/branch`, {
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
  return fetch(`${global.appConfig.apiUrl}/trading_hierarchy/user/${userId}`, {
    method: 'GET',
    headers: {
      authorization,
      accept: 'application/json',
      'content-type': 'application/json',
    },
  }).then(response => response.json());
};

const getHierarchyUsers = (userUuids, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/trading_hierarchy/user/search`, {
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
  return fetch(`${global.appConfig.apiUrl}/trading_hierarchy/user/${userId}/customers`, {
    method: 'GET',
    headers: {
      authorization,
      accept: 'application/json',
      'content-type': 'application/json',
    },
  }).then(response => response.json());
};

const getLeadsSubtree = (userId, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/trading_hierarchy/user/${userId}/leads`, {
    method: 'GET',
    headers: {
      authorization,
      accept: 'application/json',
      'content-type': 'application/json',
    },
  }).then(response => response.json());
};

const getOperatorsSubtree = (userId, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/trading_hierarchy/user/${userId}/operators`, {
    method: 'GET',
    headers: {
      authorization,
      accept: 'application/json',
      'content-type': 'application/json',
    },
  }).then(response => response.json());
};

const getPartnersSubtree = (userId, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/trading_hierarchy/user/${userId}/affiliate-partners`, {
    method: 'GET',
    headers: {
      authorization,
      accept: 'application/json',
      'content-type': 'application/json',
    },
  }).then(response => response.json());
};

const getHierarchyBranch = (branchId, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/trading_hierarchy/branch/${branchId}`, {
    method: 'GET',
    headers: {
      authorization,
      accept: 'application/json',
      'content-type': 'application/json',
    },
  }).then(response => response.json());
};

const getBranchHierarchyTree = (uuid, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/trading_hierarchy/branch/hierarchy/${uuid}`, {
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
    `${global.appConfig.apiUrl}/trading_hierarchy/branch/hierarchy/user/${userId}?${buildQueryString({
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
  return fetch(`${global.appConfig.apiUrl}/trading_hierarchy/user/bytype?${buildQueryString({ t: types })}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  }).then(response => response.json());
};

const getBranchHierarchy = ({ operatorId, branchType, ...args }, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/trading_hierarchy/branch/hierarchy/user/${operatorId}/${branchType}`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => response.json());
};

const getUsersByBranch = (uuid, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/trading_hierarchy/user/branch/${uuid}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  }).then(response => response.json());
};

const getBranchChildren = (uuid, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/trading_hierarchy/branch/${uuid}/children`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  }).then(response => response.json());
};

const updateUserBranches = ({ operatorId, ...args }, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/trading_hierarchy_updater/user/${operatorId}/relationship/parent-branch`, {
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
  return fetch(`${global.appConfig.apiUrl}/trading_hierarchy_updater/user/${operatorId}`, {
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
  return fetch(`${global.appConfig.apiUrl}/trading_hierarchy_updater/bulk/user/relationship/parent-user`, {
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
  return fetch(`${global.appConfig.apiUrl}/trading_hierarchy_updater/bulk/user/multi-assignment`, {
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
  return fetch(`${global.appConfig.apiUrl}/trading_hierarchy/branch/brand?${buildQueryString({ brandId })}`, {
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
