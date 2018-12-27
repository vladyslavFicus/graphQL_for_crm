const moment = require('moment');
const { get } = require('lodash');
const fetch = require('../../../utils/fetch');
const accessValidate = require('../../../utils/accessValidate');
const parseJson = require('../../../utils/parseJson');
const { updateQueryTradingProfile, updateQueryProfile } = require('../../../utils/profile');
const getPlayerProfileFromESByUUID = require('../../../utils/getPlayerProfileFromESByUUID');
const { statuses } = require('../../../constants/player');

const signUpOptions = function(_, { brandId }) {
  return fetch(`${global.appConfig.apiUrl}/profile/public/signup?brandId=${brandId}`, { method: 'OPTIONS' })
    .then(response => response.text())
    .then(response => parseJson(response));
};

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
const sendActivationLink = (_, { brandId, playerUUID }, { headers: { authorization } }) => {
  return fetch(`${global.appConfig.apiUrl}/profile/profiles/${playerUUID}/send-activation-link`, {
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

const getProfile = async function(_, { playerUUID }, context) {
  const access = await accessValidate(context, playerUUID);

  if (access.error) {
    return access;
  }

  const response = await getPlayerProfileFromESByUUID(context.brand.id, playerUUID);
  const error = get(response, 'error');

  // Polling if HRZN profile is not created yet
  if (!response.playerUUID) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(getProfile(_, { playerUUID }, context));
      }, 1000);
    });
  }

  if (!error) {
    return { data: response };
  }

  return response;
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

const block = function(_, { playerUUID, ...args }, { headers: { authorization } }) {
  return fetch(`${global.appConfig.apiUrl}/profile/profiles/${playerUUID}/block`, {
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

const verifyPhone = async function(_, { playerUUID, ...args }, context) {
  const {
    headers: { authorization },
  } = context;
  const response = await fetch(`${global.appConfig.apiUrl}/profile/verification/${playerUUID}/phone`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      authorization,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(args),
  });

  if (response.status !== 200) {
    return { error: 'error.verify.phone' };
  }

  return {
    data: {
      playerUUID,
      phoneNumberVerified: true,
    },
  };
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
  const { phone1, phone2, ...dataProfile } = args;

  const updateProfile = await updateQueryProfile(dataProfile, playerUUID, authorization);
  const updateTradingProfile = await updateQueryTradingProfile(
    {
      phone1,
      phone2,
      profileId: playerUUID,
      brandId: brand.id,
    },
    authorization
  );

  const profile = await getPlayerProfileFromESByUUID(brand.id, playerUUID);

  return {
    data: {
      ...profile,
      ...args,
      tradingProfile: {
        ...profile.tradingProfile,
        phone1,
        phone2,
      },
    },
    error: updateProfile.error || updateTradingProfile.error || null,
  };
};

module.exports = {
  signUp: {
    options: signUpOptions,
  },
  updateSubscription,
  resume,
  sendActivationLink,
  unblock,
  suspendProlong,
  suspend,
  updateProfile,
  verifyProfile,
  verifyPhone,
  updateEmail,
  block,
  passwordResetRequest,
  getProfile,
  changePassword,
  updateBTAG,
  updateAffiliate,
  markIsTest,
};
