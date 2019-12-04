const moment = require('moment');
const { get, isEmpty } = require('lodash');
const fetch = require('../../../utils/fetch');
const Logger = require('../../../utils/logger');
const parseJson = require('../../../utils/parseJson');
const {
  updateQueryTradingProfile,
  updateQueryProfile,
  getQueryNewProfiles,
  getQueryProfileView,
  changeProfileStatusQuery,
} = require('../../../utils/profile');
const { getOperatorByUUID } = require('./operators');
const getPlayerProfileFromESByUUID = require('../../../utils/getPlayerProfileFromESByUUID');
const { statuses } = require('../../../constants/player');

const passwordResetRequest = (_, { brandId, playerUUID }, { headers: { authorization } }) => {
  return fetch(`${global.appConfig.apiUrl}/auth/password/${brandId}/${playerUUID}/reset/request`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      authorization,
      'Content-Type': 'application/json',
    },
  }).then(response => ({ success: response.status === 200 }));
};
const changePassword = (_, { playerUUID, ...args }, { headers: { authorization } }) => {
  return fetch(`${global.appConfig.apiUrl}/auth/credentials/${playerUUID}/password`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      authorization,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => ({ success: response.status === 200 }));
};

const updateBTAG = async function(_, { playerUUID, ...args }, context) {
  const {
    headers: { authorization },
  } = context;

  const response = await fetch(`${global.appConfig.apiUrl}/profile/profiles/${playerUUID}/btag`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      authorization,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(args),
  });

  if (response.status !== 200) {
    return { error: 'error.update.btag' };
  }

  return { data: { playerUUID, ...args } };
};

const updateAffiliate = async function(_, { playerUUID, affiliateId }, context) {
  const {
    headers: { authorization },
  } = context;

  const response = await fetch(`${global.appConfig.apiUrl}/profile/profiles/${playerUUID}/affiliate`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      authorization,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ affiliate: affiliateId }),
  });

  if (response.status !== 200) {
    return { error: 'error.update.affiliateId' };
  }

  return {
    data: {
      playerUUID,
      affiliateId,
    },
  };
};

const updateSubscription = async function(_, { playerUUID, ...args }, context) {
  const {
    headers: { authorization },
  } = context;

  const response = await fetch(`${global.appConfig.apiUrl}/profile/profiles/${playerUUID}/subscription`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      authorization,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(args),
  });

  if (response.status !== 200) {
    return { error: 'error.update.subscription' };
  }

  return { data: { playerUUID, ...args } };
};

const getProfilePolling = async (playerUUID, brandId, attempt = 0) => {
  const response = await getPlayerProfileFromESByUUID(brandId, playerUUID);

  // Return error if ES return error (for example if entity not found)
  if (response.error) {
    Logger.info({ playerUUID, ...response }, 'get profile ES response error');

    return response;
  }

  // Return error if polling attempting overflow
  if (attempt > 10) {
    Logger.error({ playerUUID }, 'profile polling failed');

    return { error: 'polling failed' };
  }

  // Polling if HRZN profile is not created yet
  if (!response.playerUUID || isEmpty(response.tradingProfile)) {
    Logger.info({ playerUUID, attempt: attempt + 1 }, 'profile polling again');

    return new Promise(resolve => {
      setTimeout(() => {
        resolve(getProfilePolling(playerUUID, brandId, attempt + 1));
      }, 1000);
    });
  }

  return response;
};

const getProfileNew = async function(_, args, { headers: { authorization } }) {
  return await getQueryNewProfiles(args, authorization);
};

const getProfileView = async function(uuid, authorization) {
  return await getQueryProfileView(uuid, authorization);
};

const updatePersonalInformation = function(_, args, { headers: { authorization } }) {
  return fetch(`${global.appConfig.apiUrl}/profile/admin/profiles/${args.playerUUID}/personal-information`, {
    method: 'PUT',
    headers: {
      authorization,
      accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => ({ success: response.status === 200 }));
};

const updateKYCStatus = function(_, args, { headers: { authorization } }) {
  return fetch(`${global.appConfig.apiUrl}/profile/admin/profiles/${args.playerUUID}/kyc/status`, {
    method: 'PUT',
    headers: {
      authorization,
      accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => ({ success: response.status === 200 }));
};

const updateConfiguration = function(_, args, { headers: { authorization } }) {
  return fetch(`${global.appConfig.apiUrl}/profile/admin/profiles/${args.playerUUID}/configuration`, {
    method: 'PUT',
    headers: {
      authorization,
      accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => ({ success: response.status === 200 }));
};

const updateContacts = function(_, args, { headers: { authorization } }) {
  return fetch(`${global.appConfig.apiUrl}/profile/admin/profiles/${args.playerUUID}/contacts`, {
    method: 'PUT',
    headers: {
      authorization,
      accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => ({ success: response.status === 200 }));
};

const updateAddress = function(_, args, { headers: { authorization } }) {
  return fetch(`${global.appConfig.apiUrl}/profile/admin/profiles/${args.playerUUID}/address`, {
    method: 'PUT',
    headers: {
      authorization,
      accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => ({ success: response.status === 200 }));
};

const getProfile = async function(_, { playerUUID, accountType }, context) {
  const access = await accessValidate(context, playerUUID);

  if (access.error) {
    return access;
  }

  const allowed = await context.hierarchy.checkAccess(playerUUID);

  if (!allowed) {
    return {
      data: null,
      error: {
        error: 'Not Found',
      },
    };
  }

  const response = await getProfilePolling(playerUUID, context.brand.id);
  const error = get(response, 'error');

  if (!error) {
    if (accountType && response.tradingProfile.mt4Users) {
      response.tradingProfile.mt4Users = response.tradingProfile.mt4Users.filter(
        mt4User => mt4User.accountType === accountType
      );
    }

    return { data: response };
  }

  return response;
};

const createProfile = function(_, { args }, { headers: { authorization } }) {
  return fetch(`${global.appConfig.apiUrl}/profile/admin/profiles`, {
    method: 'POST',
    headers: {
      authorization,
      accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => response.json());
};

const resume = function(_, { playerUUID, ...args }, { headers: { authorization } }) {
  return fetch(`${global.appConfig.apiUrl}/profile/profiles/${playerUUID}/resume`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      authorization,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(args),
  })
    .then(response => response.text())
    .then(response => parseJson(response))
    .then(response => ({
      data: !response.error ? { playerUUID, ...response } : null,
      error: response.error || null,
    }));
};

const changeProfileStatus = async function(_, args, { headers: { authorization } }) {
  return await changeProfileStatusQuery(args, authorization);
};

const unblock = function(_, { playerUUID, ...args }, { headers: { authorization } }) {
  return fetch(`${global.appConfig.apiUrl}/profile/profiles/${playerUUID}/unblock`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      authorization,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(args),
  })
    .then(response => response.text())
    .then(response => parseJson(response))
    .then(response => ({
      data: !response.error ? { playerUUID, ...response } : null,
      error: response.error || null,
    }));
};

const suspend = function(_, { playerUUID, duration, ...args }, { headers: { authorization } }) {
  const requestBody = { ...args };

  if (duration) {
    requestBody.durationAmount = duration.amount;
    requestBody.durationUnit = duration.unit;
  }

  return fetch(`${global.appConfig.apiUrl}/profile/profiles/${playerUUID}/suspend`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      authorization,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  })
    .then(response => response.text())
    .then(response => parseJson(response))
    .then(response => ({
      data: !response.error
        ? {
            playerUUID,
            ...response,
            profileStatusDate: moment().toISOString(),
          }
        : null,
      error: response.error || null,
    }));
};

const suspendProlong = function(_, { playerUUID, duration, ...args }, { headers: { authorization } }) {
  const requestBody = { ...args };

  if (duration) {
    requestBody.durationAmount = duration.amount;
    requestBody.durationUnit = duration.unit;
  }

  return fetch(`${global.appConfig.apiUrl}/profile/profiles/${playerUUID}/suspend/prolong`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      authorization,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  })
    .then(response => response.text())
    .then(response => parseJson(response))
    .then(response => ({
      data: !response.error
        ? {
            playerUUID,
            ...response,
            profileStatusDate: moment().toISOString(),
          }
        : null,
      error: response.error || null,
    }));
};

const updateEmail = async function(_, { playerUUID, ...args }, context) {
  const {
    headers: { authorization },
  } = context;

  const response = await fetch(`${global.appConfig.apiUrl}/profile/profiles/${playerUUID}/email`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      authorization,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(args),
  });

  if (response.status !== 200) {
    return { error: 'error.update.email' };
  }

  return {
    data: {
      playerUUID,
      ...args,
      profileStatus: statuses.INACTIVE,
    },
  };
};

const verifyPhone = async function(_, { playerUUID, ...args }, { headers: { authorization } }) {
  return await fetch(`${global.appConfig.apiUrl}/profile/admin/profiles/${playerUUID}/verification/phone`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      authorization,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => ({ success: response.status === 200 }));
};

const verifyEmail = async function(_, { playerUUID, ...args }, { headers: { authorization } }) {
  return await fetch(`${global.appConfig.apiUrl}/profile/admin/profiles/${playerUUID}/verification/email`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      authorization,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => ({ success: response.status === 200 }));
};

const verifyProfile = async function(_, { playerUUID, ...args }, context) {
  const {
    headers: { authorization },
  } = context;
  const response = await fetch(`${global.appConfig.apiUrl}/profile/verification/${playerUUID}`, {
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
      profileStatus: statuses.ACTIVE,
    },
  };
};

const markIsTest = async function(_, { playerUUID, isTest }, { headers: { authorization } }) {
  const response = await fetch(`${global.appConfig.apiUrl}/profile/profiles/${playerUUID}/is-test`, {
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

const updateProfile = async function(_, { playerUUID, ...args }, { headers: { authorization }, brand }) {
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

  const profile = await getPlayerProfileFromESByUUID(brand.id, playerUUID);

  return {
    data: {
      ...profile,
      ...dataProfile,
      tradingProfile: {
        ...profile.tradingProfile,
        ...dataProfile,
      },
    },
    error: updateProfile.error || updateTradingProfile.error || null,
  };
};

const limitedUpdateProfile = async (_, args, { headers: { authorization } }) => {
  return fetch(`${global.appConfig.apiUrl}/trading-profile/v2/limited/update`, {
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

  return fetch(global.appConfig.brands[context.brand.id].clickToCallUrl, {
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
  return fetch(`${global.appConfig.apiUrl}/trading-profile/regulated`, {
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
  createProfile,
  updateSubscription,
  resume,
  unblock,
  suspendProlong,
  suspend,
  updateProfile,
  verifyPhone,
  updateEmail,
  passwordResetRequest,
  getProfile,
  changePassword,
  updateBTAG,
  updateAffiliate,
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
