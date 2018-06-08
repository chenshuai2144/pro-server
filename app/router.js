'use strict';

const mock = require('../mock/index');
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const {
    router,
  } = app;
  Object.keys(mock).forEach(url => {
    const urlParams = url.split(' ');
    if (urlParams[0] === 'GET') {
      router.get(urlParams[1], 'api.index');
    }
    if (urlParams[0] === 'POST') {
      router.post(urlParams[1], 'api.index');
    }
  });
};
