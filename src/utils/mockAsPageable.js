module.exports = content => ({
  content: Array.isArray(content) ? content : [],
  page: 0,
  number: 0,
  totalElements: Array.isArray(content) ? content.length : 0,
  size: Array.isArray(content) ? content.length : 0,
  first: true,
  last: true,
});
