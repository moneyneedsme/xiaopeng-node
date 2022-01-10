'use strict';
const jscode2session = 'https://api.weixin.qq.com/sns/jscode2session';
const Service = require('egg').Service;
const uuid = require('node-uuid');
class UserService extends Service {
  async login(openid) {
    // 查询是否有用户
    let user = await this.app.mysql.get('user', { openid });
    if (!user) { // 没有用户就新增
      const userId = uuid.v1();
      const result = await this.app.mysql.insert('user', { openid, userId });
      if (result.affectedRows === 1) {
        user = {
          userId,
        };
        // 用户id插入积分表point
        this.app.mysql.insert('point', { userId });
        console.log('新增用户成功:', result);
      }
    } else { // 有用户就查用户积分
      const pointData = await this.app.mysql.get('point', { userId: user.userId });
      user.point = pointData.point;
      console.log('积分信息：', pointData);
    }
    console.log('user信息：', user);
    return {
      id: user.id,
      userId: user.userId,
      nickName: user.nickName,
      avatarUrl: user.avatarUrl,
      gender: user.gender,
      point: user.point,
    };
  }

  async setInfo(row = {}, userId) {
    const options = {
      where: {
        userId,
      },
    };
    const result = await this.app.mysql.update('user', row, options);
    return result.affectedRows === 1;
  }

  async getSessionKey(js_code) {
    const url = jscode2session + `?appid=wx3d46697adade4630&secret=98368b38188824e609a83a341dc8a401&js_code=${js_code}&grant_type=authorization_code`;
    const result = await this.ctx.curl(url, {
      dataType: 'json',
    });
    return result.data;
  }
}

module.exports = UserService;
