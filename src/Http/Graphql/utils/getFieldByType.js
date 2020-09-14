const { get } = require('lodash');

/**
 * Helper to get field by uuid, entity type and field name from real entity on BE
 *
 * @param uuid
 * @param field
 * @param type
 * @param dataSources
 *
 * @return {Promise<*>}
 */
module.exports = async (uuid, field, type, dataSources) => {
  let entity;

  if (type === 'PROFILE') {
    entity = await dataSources.ProfileAPI.getByUUID(uuid);
  }

  if (type === 'LEAD') {
    entity = await dataSources.LeadAPI.getLead(uuid);
  }

  return get(entity, field);
};
