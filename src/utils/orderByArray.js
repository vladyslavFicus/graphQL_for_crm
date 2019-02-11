/**
 * Need right order for dataloaders (DB or API can retrieve data in random order)
 *
 * @param ids
 * @param values
 * @param field
 * @return {any[]}
 * @private
 */
module.exports = (ids, values, field) => {
  const sortedResult = new Map();
  ids.forEach(id => sortedResult.set(id.toString(), null));

  values.forEach(item => {
    sortedResult.set(item[field].toString(), item);
  });

  return Array.from(sortedResult.values());
};
