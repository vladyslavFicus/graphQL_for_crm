const { createCall: createCallRequest } = require('../../../utils/asteriskRequests');
const { getOperatorByUUID } = require('./operators');

const createCall = async (_, args, context) => {
  const {
    data: { sip },
  } = await getOperatorByUUID(_, { uuid: context.userUUID }, context);

  const { data } = await createCallRequest({
    ...args,
    brand: context.brand.id,
    sip,
  });

  return data;
};

module.exports = {
  createCall,
};
