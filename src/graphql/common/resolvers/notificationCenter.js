const {
  updateNotificationCenterRequest,
  getNotificationCenterRequest,
  getNotificationCenterTypesRequest,
  getNotificationCenterUnreadRequest,
  getNotificationCenterSubtypesRequest,
} = require('../../../utils/notificationCenterRequests');

const getNotificationCenter = function(_, { args }, { headers: { authorization } }) {
  const { hierarchical, ...argsBody } = args || {};

  return getNotificationCenterRequest({ ...argsBody, hierarchical: !!hierarchical }, authorization);
};

const updateNotificationCenter = async (_, { incUuids, excUuids, totalElements }, { headers: { authorization } }) => {
  let notificationUuids = incUuids;

  if (excUuids) {
    const { data, error } = await getNotificationCenterRequest(
      { page: { size: totalElements }, hierarchical: false },
      authorization
    );

    if (error) {
      return error;
    }

    notificationUuids = data.content.map(({ uuid }) => uuid).filter(uuid => !excUuids.includes(uuid));
  }

  return updateNotificationCenterRequest({ read: true, notificationUuids }, authorization);
};

const getNotificationCenterTypes = (_, __, { headers: { authorization } }) => {
  return getNotificationCenterTypesRequest(authorization);
};

const getNotificationCenterSubtypes = (_, __, { headers: { authorization } }) => {
  return getNotificationCenterSubtypesRequest(authorization);
};

const getNotificationCenterUnread = (_, __, { headers: { authorization } }) => {
  return getNotificationCenterUnreadRequest(authorization);
};

module.exports = {
  updateNotificationCenter,
  getNotificationCenter,
  getNotificationCenterTypes,
  getNotificationCenterUnread,
  getNotificationCenterSubtypes,
};
