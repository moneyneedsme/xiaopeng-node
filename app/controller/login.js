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
    let status = 200;
    if (code) {
      const result = await ctx.service.login.getSessionKey(code);
      data.data = await ctx.service.login.login(result.openid);
      console.log('data.data', data.data);
      data.data.token = this.app.jwt.sign({ userId: data.data.userId }, this.app.config.jwt.secret, { expiresIn: '2h' });
      console.log('data.token', data.data.token);

    } else {
      data.success = false;
      data.errorCode = 1;
      data.errorMessage = '系统繁忙，请稍后再试';
      status = 500;
    }
    ctx.body = data;
    ctx.status = status
  }

  async setInfo() {
    const { ctx } = this;
    const data = {
      data: null,
      errorCode: null,
      errorMessage: null,
      success: true,
    };
    let status = 200;
    const body = ctx.request.body;
    const token = ctx.request.header.authorization.replace('Bearer ', '');
    const { userId } = this.app.jwt.verify(token, this.app.config.jwt.secret);
    const result = await ctx.service.login.setInfo(body, userId);
    if (!result) {
      data.success = false;
      data.errorCode = 1;
      data.errorMessage = '系统繁忙，请稍后再试';
      status = 500;
    }
    ctx.body = data;
    ctx.status = status;
  }
}

module.exports = LoginController;
