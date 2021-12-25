'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {
  async index() {
    const { ctx } = this;
    const code = ctx.request.body.code;
    const data = {
      data: null,
      errorCode: null,
      errorMessage: null,
      success: true,
    };
    if (code) {
      const result = await ctx.service.login.getSessionKey(code);
      console.log(result);
      // data.data = await ctx.service.login.login(code);
      data.data = result;
    } else {
      data.success = false;
      data.errorCode = 1;
      data.errorMessage = '系统繁忙，请稍后再试';
      // console.log('code:', code);
    }
    ctx.body = data;
    ctx.status = 200;
  }
}

module.exports = LoginController;
