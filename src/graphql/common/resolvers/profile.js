const moment = require('moment');
const fetch = require('../../../utils/fetch');
const parseJson = require('../../../utils/parseJson');
const getBaseUrl = require('../../../utils/getBaseUrl');
const {
  updateQueryTradingProfile,
  getQueryNewProfiles,
  getQueryProfileView,
  changeProfileStatusQuery,
} = require('../../../utils/profile');
const { getOperatorByUUID } = require('./operators');
const { statuses } = require('../../../constants/player');

const getProfileNew = async (_, { playerUUID }, { headers: { authorization } }) => {
  return await getQueryNewProfiles(playerUUID, authorization);
};

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

const verifyProfile = async (_, { playerUUID, ...args }, context) => {
  const {
    headers: { authorization },
  } = context;
  const response = await fetch(`${getBaseUrl('profile')}/verification/${playerUUID}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      authorization,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(args),
  });

  if (response.status !== 200) {
    return { error: 'error.verify.profile' };
  }

  return {
    data: {
      playerUUID,
      profileStatus: statuses.VERIFIED,
    },
  };
};

const markIsTest = async (_, { playerUUID, isTest }, { headers: { authorization } }) => {
  const response = await fetch(`${getBaseUrl('profile')}/profiles/${playerUUID}/is-test`, {
    method: isTest ? 'POST' : 'DELETE',
    headers: {
      Accept: 'application/json',
      authorization,
      'Content-Type': 'application/json',
    },
  });

  if (response.status !== 200) {
    return { error: 'error.mark.is-test' };
  }

  return {
    data: {
      playerUUID,
      isTest,
    },
  };
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
    error: updateProfile.error || updateTradingProfile.error || null,
  };
};

const limitedUpdateProfile = async (_, args, { headers: { authorization } }) => {
  return fetch(`${getBaseUrl('trading-profile')}/v2/limited/update`, {
    method: 'PUT',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => (response.status === 200 ? { success: true } : { error: 'error' }));
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

const updateRegulated = (_, args, { headers: { authorization }, brand: { id: brandId } }) => {
  return fetch(`${getBaseUrl('trading-profile')}/regulated`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      authorization,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ brandId, ...args }),
  }).then(response => ({ success: response.status === 200 }));
};

module.exports = {
  updateProfile,
  verifyPhone,
  updateEmail,
  markIsTest,
  clickToCall,
  updateRegulated,
  limitedUpdateProfile,
  getProfileNew,
  updatePersonalInformation,
  updateKYCStatus,
  updateConfiguration,
  updateContacts,
  updateAddress,
  verifyEmail,
  verifyProfile,
  changeProfileStatus,
  getProfileView,
};
