'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {
  async index() {
    const { ctx } = this;
    const code = ctx.request.body.code;
    if (code) {
      const result = await ctx.service.login.getSessionKey(code);
      const data = await ctx.service.login.login(result.openid);
      data.token = this.app.jwt.sign({ userId: data.userId }, this.app.config.jwt.secret, { expiresIn: '2h' });
      ctx.success(data);

    } else {
      ctx.fail();
    }
  }

  async setInfo() {
    const { ctx } = this;
    const body = ctx.request.body;
    const token = ctx.request.token;
    const { userId } = this.app.jwt.verify(token, this.app.config.jwt.secret);
    const result = await ctx.service.login.setInfo(body, userId);
    if (result) {
      ctx.success();
    } else {
      ctx.fail();
    }
  }
}

module.exports = LoginController;
