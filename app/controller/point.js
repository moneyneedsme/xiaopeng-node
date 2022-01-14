'use strict';

const Controller = require('egg').Controller;
const pointData = { // 积分数值
  signIn: 10,
};
class PointController extends Controller {
  // 签到
  async signIn() {
    const { ctx } = this;
    const token = ctx.request.token;
    const { userId } = this.app.jwt.verify(token, this.app.config.jwt.secret);
    const result = await ctx.service.point.signIn(userId, pointData.signIn);
    if (result || result === 0) {
      ctx.success(result);
    } else {
      ctx.fail();
    }
  }

  // 积分详情
  async pointsDetails() {
    const { ctx } = this;
    const { pageNo = 1, pageSize = 10, type = 0 } = ctx.query;
    const token = ctx.request.token;
    const { userId } = this.app.jwt.verify(token, this.app.config.jwt.secret);
    const data = {
      pageNo: +pageNo,
      pageSize: +pageSize,
      type: +type,
      userId,
    };
    console.log('data', data);
    const result = await ctx.service.point.getPointsDetails(data);
    if (result) {
      ctx.success(result);
    } else {
      ctx.fail();
    }
  }
}

module.exports = PointController;
