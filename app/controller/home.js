'use strict';

const Controller = require('egg').Controller;
const pointData = { // 积分数值
  signIn: 10,
};
class HomeController extends Controller {
  // 查询配置
  async getConfig() {
    const { ctx } = this;
    const config = await ctx.service.home.getConfig();
    if (config) {
      ctx.success(config);
    } else {
      ctx.fail();
    }
  }

  // 签到
  async signIn() {
    const { ctx } = this;
    const token = ctx.request.token;
    const { userId } = this.app.jwt.verify(token, this.app.config.jwt.secret);
    const result = await ctx.service.home.signIn(userId, pointData.signIn);
    if (result || result === 0) {
      ctx.success(result);
    } else {
      ctx.fail();
    }
  }

}

module.exports = HomeController;
