const {
  getCallbacks: getCallbacksRequest,
  updateCallback: updateCallbackRequest,
} = require('../../../utils/callbackRequests');
const { getOperatorFromCache } = require('../../../utils/operatorUtils');
const getPlayerProfileFromESByUUID = require('../../../utils/getPlayerProfileFromESByUUID');

const getCallbacks = async (_, args, { headers: { authorization }, hierarchy }) => {
  const _args = hierarchy.buildQueryArgs(args, { operatorIds: hierarchy.getOperatorsIds() });

  const callbacks = await getCallbacksRequest(_args, authorization);

  if (callbacks.error || callbacks.jwtError) {
    return { error: callbacks };
  }

  return { data: callbacks };
};

// Get operator by callback source
const getOperator = ({ operatorId }, _, { headers: { authorization } }) => {
  return getOperatorFromCache(operatorId, authorization);
};

// Get client by callback source
const getClient = ({ userId }, _, { brand: { id: brandId } }) => {
  return getPlayerProfileFromESByUUID(brandId, userId);
};

const updateCallback = async (_, args, { headers: { authorization } }) => {
  const success = await updateCallbackRequest(args, authorization);

  if (!success) {
    return { error: 'error.update.callback' };
  }

  const callbacks = await getCallbacksRequest({ id: args.callbackId }, authorization);

  if (callbacks.error || callbacks.jwtError) {
    return { error: callbacks };
  }

  return { data: callbacks.content[0] };
};

module.exports = {
  getCallbacks,
  getOperator,
  getClient,
  updateCallback,
};
