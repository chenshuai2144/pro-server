'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1528447604752_4743';

  // add your config here
  config.middleware = [];
  config.static = {
    prefix: '/',
  };
  config.security = {
    csrf: {
      enable: false,
    },
  };
  return config;
};
