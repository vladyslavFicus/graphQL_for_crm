module.exports = (params, joinArray = false) =>
  Object.keys(params)
    .filter(value => params[value] !== undefined && params[value] !== '')
    .map(key => {
      const value = params[key];

      if (typeof value === 'object' && value) {
        if (Array.isArray(value) && joinArray) {
          return `${key}=${value.join(',')}`;
        }

        return Object.keys(value)
          .map(
            val =>
              `${encodeURIComponent(key)}${Array.isArray(value) ? '' : `[${val}]`}=${encodeURIComponent(value[val])}`
          )
          .join('&');
      }

      return `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`;
    })
    .join('&');
