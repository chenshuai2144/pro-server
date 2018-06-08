'use strict';

const data = require('../../mock/index');
const Controller = require('egg').Controller;

class APiController extends Controller {
  async index() {
    const url = this.ctx.request.URL.pathname;
    const metch = this.ctx.request.method.toLocaleUpperCase();
    const body = data[metch + ' ' + url];
    if (!body) {
      this.ctx.body = url;
      return '';
    }
    if ('$body' in body) {
      this.ctx.body = body.$body;
      return;
    }
    if (typeof body === 'function') {
      const res = {
        send: data => {
          this.ctx.body = data;
        },
        json: data => {
          this.ctx.body = data;
        },
      };
      body({
        query: this.ctx.query,
        body: this.ctx.request.body,
        url: this.ctx,
      }, res, url);
      return;
    }
    this.ctx.body = body;
  }
}

module.exports = APiController;
