const FormData = require('form-data');
const fetch = require('./fetch');

const createCall = ({ brand, sip, number, prefix }) => {
  const { asterisk } = global.appConfig.brands[brand].clickToCall;

  const formData = new FormData();

  formData.append('sip', sip);
  formData.append('number', number);
  formData.append('prefix', prefix);

  return fetch(`${asterisk.url}/api/call/create?token=${asterisk.token}`, {
    method: 'POST',
    headers: formData.getHeaders(),
    body: formData,
  }).then(response => response.json());
};

module.exports = {
  createCall,
};
