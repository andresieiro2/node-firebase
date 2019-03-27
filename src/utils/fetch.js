const parseString = require('xml2js').parseString;
const stripPrefix = require('xml2js').processors.stripPrefix;
const fetch = require('isomorphic-fetch');

const callService = (url, method, params, customheader = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    'Accept-Charset': 'utf-8',
    ...customheader,
  };

  const configHeaders = {
    method,
    headers,
  };

  if (method === 'POST') {
    configHeaders.body = JSON.stringify(params);
  }

  return new Promise((resolve, reject) =>
    fetch(url, configHeaders)
      .then(response => {
        response
          .json()
          .then(json => {
            if (response.ok) {
              resolve(json);
            } else {
              reject(json);
            }
          })
          .catch(e => reject(e));
      })
      .catch(message => reject(message))
  );
};

const callSoap = (url, method, params, customheader = {}) => {
  const headers = {
    'Content-Type': 'text/xml; charset=utf-8',
    'cache-control': 'no-cache',
    ...customheader,
  };

  const configHeaders = {
    method,
    headers,
  };

  if (method === 'POST') {
    configHeaders.body = params;
  }

  return new Promise((resolve, reject) =>
    fetch(url, configHeaders)
      .then(response => {
        response
          .text()
          .then(xml => {
            if (response.ok) {
              parseString(
                xml,
                {
                  normalize: true,
                  tagNameProcessors: [stripPrefix],
                  ignoreAttrs: true,
                  mergeAttrs: true,
                  charkey: 'value',
                  explicitArray: false,
                },
                (err, result) => {
                  resolve(result);
                }
              );
            } else {
              reject(xml);
            }
          })
          .catch(e => reject(e));
      })
      .catch(message => reject(message))
  );
};

module.exports = {
  callService,
  callSoap,
};
