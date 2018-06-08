'use strict';

const {
  app,
  assert,
} = require('egg-mock/bootstrap');
const Mock = require('../../../mock/index');

describe('test/app/controller/api.test.js', () => {

  it('should assert', function* () {
    const pkg = require('../../../package.json');
    assert(app.config.keys.startsWith(pkg.name));

    // const ctx = app.mockContext({});
    // yield ctx.service.xx();
  });

  it('should GET /api', () => {
    let isOK = true;
    Object.keys(Mock).keys(url => {
      const urlParams = url.split(' ');
      const status = app.httpRequest()
        .get(urlParams[0])
        .expect(Mock[url])
        .expect(200);
      if (!status) {
        isOK = false;
      }
    });
    return isOK;
  });
});
