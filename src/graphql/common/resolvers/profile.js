const moment = require('moment');
const fetch = require('../../../utils/fetch');
const getBaseUrl = require('../../../utils/getBaseUrl');
const {
  updateQueryTradingProfile,
  getQueryNewProfiles,
  getQueryProfileView,
  changeProfileStatusQuery,
} = require('../../../utils/profile');
const { getOperatorByUUID } = require('./operators');

// # Can be removed after NewPlayerProfileType will be removed
const getProfileView = async (uuid, authorization) => {
  return await getQueryProfileView(uuid, authorization);
};

const updatePersonalInformation = async (_, { playerUUID, ...args }, { headers: { authorization } }) => {
  await fetch(`${getBaseUrl('profile')}/admin/profiles/${playerUUID}/personal-information`, {
    method: 'PUT',
    headers: {
      authorization,
      accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  });

  // Этот запрос не нужен так как в респонсе после апдейта приходит информация по юзеру
  return getQueryNewProfiles(playerUUID, authorization);
};

const updateKYCStatus = (_, args, { headers: { authorization } }) => {
  return fetch(`${getBaseUrl('profile')}/admin/profiles/${args.playerUUID}/kyc/status`, {
    method: 'PUT',
    headers: {
      authorization,
      accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => ({ success: response.status === 200 }));
};

const updateConfiguration = (_, args, { headers: { authorization } }) => {
  return fetch(`${getBaseUrl('profile')}/admin/profiles/${args.playerUUID}/configuration`, {
    method: 'PUT',
    headers: {
      authorization,
      accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => ({ success: response.status === 200 }));
};

const updateContacts = async (_, { playerUUID, ...args }, { headers: { authorization } }) => {
  await fetch(`${getBaseUrl('profile')}/admin/profiles/${playerUUID}/contacts`, {
    method: 'PUT',
    headers: {
      authorization,
      accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  });

  // Прикол в том, что тут возникает проблема с отображением обновленных данных в personal-information. Лучше на фронте просто сделать refetch
  return getQueryNewProfiles(playerUUID, authorization);
};

const updateAddress = async (_, { playerUUID, ...args }, { headers: { authorization } }) => {
  await fetch(`${getBaseUrl('profile')}/admin/profiles/${playerUUID}/address`, {
    method: 'PUT',
    headers: {
      authorization,
      accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  });

  // Прикол в том, что тут возникает проблема с отображением обновленных данных в personal-information. Лучше на фронте просто сделать refetch
  return getQueryNewProfiles(playerUUID, authorization);
};

const changeProfileStatus = (_, args, { headers: { authorization } }) => {
  return changeProfileStatusQuery(args, authorization);
};

const verifyPhone = (_, { playerUUID, ...args }, { headers: { authorization } }) => {
  return fetch(`${getBaseUrl('profile')}/admin/profiles/${playerUUID}/verification/phone`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      authorization,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => response.json());
};

const updateEmail = async (_, { playerUUID, ...args }, { headers: { authorization } }) => {
  return fetch(`${getBaseUrl('profile')}/admin/profiles/${playerUUID}/contacts/email`, {
    method: 'PUT',
    headers: {
      authorization,
      accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => response.json());
};

const verifyEmail = (_, { playerUUID, ...args }, { headers: { authorization } }) => {
  return fetch(`${getBaseUrl('profile')}/admin/profiles/${playerUUID}/verification/email`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      authorization,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => response.json());
};

const updateProfile = async (_, { playerUUID, ...args }, { headers: { authorization }, brand }) => {
  const { passportNumber, passportIssueDate, expirationDate, countryOfIssue, ...dataProfile } = args;

  const updateTradingProfile = await updateQueryTradingProfile(
    {
      profileId: playerUUID,
      brandId: brand.id,
      passport: {
        passportNumber,
        passportIssueDate,
        expirationDate,
        countryOfIssue,
      },
      ...dataProfile,
    },
    authorization
  );

  return {
    data: dataProfile,
    // updateProfile.error какая то дичь
    error: updateProfile.error || updateTradingProfile.error || null,
  };
};

const clickToCall = async (_, args, context) => {
  const {
    data: { phoneNumber },
  } = await getOperatorByUUID(_, { uuid: context.userUUID }, context);

  const { didlogic } = context.brand.clickToCall;

  return fetch(didlogic.url, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      authorization: context.headers.authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify({ agent: phoneNumber, ...args }),
  }).then(response => ({ success: response.status === 204 }));
};

module.exports = {
  updateProfile,
  verifyPhone,
  updateEmail,
  clickToCall,
  updatePersonalInformation,
  updateKYCStatus,
  updateConfiguration,
  updateContacts,
  updateAddress,
  verifyEmail,
  changeProfileStatus,
  getProfileView,
};
