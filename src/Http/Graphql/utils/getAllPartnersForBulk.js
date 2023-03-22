/**
 * Helper function for find all partners? filter and get selected uuids
 *
 * @params {uuids, bulkSize, searchParams, sorts, dataSources}
 *
 * @return {Promise<*>}
 */
module.exports = async (props) => {
  const { uuids, bulkSize, searchParams, sorts, dataSources } = props;

  const { content = [] } = await dataSources.AffiliateAPI.getPartners({
    ...(searchParams && searchParams),
    page: {
      from: 0,
      size: bulkSize + uuids.length,
      ...(sorts && { sorts }),
    },
  });

  return content
    .map(({ uuid }) => uuid)
    .filter(item => !uuids.includes(item));
};
