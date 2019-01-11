const fetch = require('./fetch');
const parseJson = require('./parseJson');
const buildQueryString = require('../utils/buildQueryString');

const buildRequestObject = (func, success, error) => ({ func, success, error });

const multipleRequest = array =>
  Promise.all(array.map(({ func }) => func)).then(data => {
    const succeed = [];
    const errors = [];
    data.forEach((res, i) => (res.error ? errors.push(array[i].error || res) : succeed.push(array[i].success || res)));

    return {
      succeed,
      errors,
    };
  });

const createUser = (args, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/trading_hierarchy/user`, {
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

const createBranch = (args, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/trading_hierarchy/branch`, {
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
  return fetch(`${global.appConfig.apiUrl}/trading_hierarchy_updater/user/${userId}`, {
    method: 'GET',
    headers: {
      authorization,
      accept: 'application/json',
      'content-type': 'application/json',
    },
  }).then(response => response.json());
};

const getCustomersSubtree = (userId, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/trading_hierarchy_updater/user/${userId}/customers`, {
    method: 'GET',
    headers: {
      authorization,
      accept: 'application/json',
      'content-type': 'application/json',
    },
  })
    .then(response => response.text())
    .then(response => parseJson(response))
    .then(response => response);
};

const getLeadsSubtree = (userId, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/trading_hierarchy_updater/user/${userId}/leads`, {
    method: 'GET',
    headers: {
      authorization,
      accept: 'application/json',
      'content-type': 'application/json',
    },
  })
    .then(response => response.text())
    .then(response => parseJson(response))
    .then(response => response);
};

const getOperatorsSubtree = (userId, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/trading_hierarchy_updater/user/${userId}/operators`, {
    method: 'GET',
    headers: {
      authorization,
      accept: 'application/json',
      'content-type': 'application/json',
    },
  })
    .then(response => response.text())
    .then(response => parseJson(response))
    .then(response => response);
};

const getHierarchyBranch = (branchId, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/trading_hierarchy_updater/branch/${branchId}`, {
    method: 'GET',
    headers: {
      authorization,
      accept: 'application/json',
      'content-type': 'application/json',
    },
  }).then(response => response.json());
};

const getBranchHierarchyTree = (uuid, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/trading_hierarchy_updater/branch/hierarchy/${uuid}`, {
    method: 'GET',
    headers: {
      authorization: 'asd',
      accept: 'application/json',
      'content-type': 'application/json',
    },
  }).then(response => response.json());
};

const getUserBranchHierarchy = (userId, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/trading_hierarchy_updater/branch/hierarchy/user/${userId}`, {
    method: 'GET',
    headers: {
      authorization,
      accept: 'application/json',
      'content-type': 'application/json',
    },
  }).then(response => response.json());
};

const getUsersByType = (types, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/trading_hierarchy_updater/user/bytype?${buildQueryString({ t: types })}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  }).then(response => response.json());
};

const getBranchHierarchy = ({ operatorId, branchType, ...args }, authorization) => {
  return fetch(
    `${global.appConfig.apiUrl}/trading_hierarchy_updater/branch/hierarchy/user/${operatorId}/${branchType}`,
    {
      method: 'POST',
      headers: {
        accept: 'application/json',
        authorization,
        'content-type': 'application/json',
      },
      body: JSON.stringify(args),
    }
  ).then(response => response.json());
};

const getUsersByBranch = (uuid, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/trading_hierarchy_updater/user/branch/${uuid}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  }).then(response => response.json());
};

const getBranchChildren = (uuid, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/trading_hierarchy_updater/branch/${uuid}/children`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  }).then(response => response.json());
};

const updateUserHierarchy = ({ operatorId, ...args }, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/trading_hierarchy/user/${operatorId}`, {
    method: 'PUT',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => response.json());
};

const updateBranchHierarchy = ({ uuid, ...args }, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/trading_hierarchy/branch/${uuid}`, {
    method: 'PUT',
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

const bulkUpdateHierarchyUser = (args, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/trading_hierarchy/bulk/user`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => response.json());
};

const bulkMassAssignHierarchyUser = (args, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/trading_hierarchy/bulk/user/multi_assign`, {
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

module.exports = {
  buildRequestObject,
  multipleRequest,
  createUser,
  createBranch,
  getHierarchyUser,
  getHierarchyBranch,
  getCustomersSubtree,
  getLeadsSubtree,
  getOperatorsSubtree,
  getUserBranchHierarchy,
  getUsersByType,
  getBranchHierarchy,
  getBranchHierarchyTree,
  getUsersByBranch,
  getBranchChildren,
  updateUserHierarchy,
  updateBranchHierarchy,
  bulkUpdateHierarchyUser,
  bulkMassAssignHierarchyUser,
};
