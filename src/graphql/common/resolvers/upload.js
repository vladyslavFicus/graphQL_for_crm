const FormData = require('form-data');
const fetch = require('../../../utils/fetch');
const getBaseUrl = require('../../../utils/getBaseUrl');
const buildQueryString = require('../../../utils/buildQueryString');

const leadCsvUpload = (_, { file }, { headers: { authorization }, brand: { id } }) => {
  return new Promise(async resolve => {
    const { filename, createReadStream } = await file;

    const buffer = [];
    const stream = createReadStream();

    stream.on('data', chunk => {
      buffer.push(chunk);
    });

    stream.on('end', async () => {
      const formData = new FormData();
      formData.append('file', Buffer.concat(buffer), filename);

      const response = await fetch(`${getBaseUrl('lead-updater')}/lead/csv?${buildQueryString({ brandId: id })}`, {
        method: 'POST',
        headers: {
          authorization,
          ...formData.getHeaders(),
        },
        body: formData,
      });

      resolve(response);
    });
  })
    .then(response => response.json())
    .then(data => ({ success: !!data.data, error: data.error }));
};

module.exports = {
  leadCsvUpload,
};
