const FormData = require('form-data');
const fetch = require('../../../utils/fetch');

const leadCsvUpload = async (_, { file }, { headers: { authorization }, brand: { id: brandId } }) => {
  const fileStream = await file;

  return new Promise(resolve => {
    const buffs = [];
    const readStream = fileStream.createReadStream();

    readStream.on('data', d => {
      buffs.push(d);
    });

    readStream.on('end', () => {
      let bufferedFile = Buffer.concat(buffs);
      const formData = new FormData();
      formData.append('file', bufferedFile, fileStream.filename);
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
