const FormData = require('form-data');
const fetch = require('../../../utils/fetch');

const leadCsvUpload = async (_, { file }, { headers: { authorization }, brand: { id: brandId } }) => {
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
      formData.append('brandId', brandId);

      fetch(`${global.appConfig.apiUrl}/lead-updater/lead/csv`, {
        method: 'POST',
        headers: {
          authorization,
          ...formData.getHeaders(),
        },
        body: formData,
      })
        .then(res => res.json())
        .then(response => resolve({ success: !!response.data, ...response }));
    });
  });
};

module.exports = {
  leadCsvUpload,
};
