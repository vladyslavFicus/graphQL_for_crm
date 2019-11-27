const {
  getCallbacks: getCallbacksRequest,
  updateCallback: updateCallbackRequest,
  createCallback: createCallbackRequest,
} = require('../../../utils/callbackRequests');

const getCallbacks = async (_, args, { headers: { authorization }, hierarchy, userUUID: operatorId }) => {
  const operatorIds = await hierarchy.getOperatorsIds();
  const _args = { ...args, operatorIds, operatorId };

  // If operatorId arg exist and hierarchy exist --> filter by hierarchy ids
  if (_args.operatorId && _args.operatorIds) {
    _args.operatorIds = [_args.operatorIds.find(id => id === _args.operatorId)];

    // If administration -> just get a callback
  } else if (_args.operatorId) {
    _args.operatorIds = [_args.operatorId];
  }

  return getCallbacksRequest(_args, authorization);
};

const getCallback = async (...args) => {
  const { data, error } = await getCallbacks(...args);

  if (error) {
    return { error };
  }

  return { data: data.content[0] };
};

const updateCallback = async (_, args, { headers: { authorization } }) => {
  const success = await updateCallbackRequest(args, authorization);

  if (!success) {
    return { error: 'error.update.callback' };
  }

  const callbacks = await getCallbacksRequest({ id: args.callbackId }, authorization);

  if (callbacks.error) {
    return callbacks;
  }

  return { data: callbacks.data.content[0] };
};

const createCallback = async (_, args, { headers: { authorization } }) => {
  const callback = await createCallbackRequest(args, authorization);

  if (callback.error) {
    return { error: 'error.create.callback' };
  }

  return callback;
};

module.exports = {
  getCallbacks,
  getCallback,
  updateCallback,
  createCallback,
};
