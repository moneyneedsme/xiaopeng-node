'use strict';
const Service = require('egg').Service;
class UserService extends Service {
  async getConfig() {
    const config = await this.app.mysql.get('config'); // 查询系统配置
    return {
      config,
    };
  }
  async signIn(userId, num = 0) {
    const user = await this.app.mysql.get('user', { userId });
    if (!user) {
      return false;
    }
    const point = (user.point || 0) + num;
    const options = {
      where: {
        userId,
      },
    };
    const result = await this.app.mysql.update('user', { point, signed: 1 }, options);
    if (result.affectedRows === 1) { // 更新成功
      const pointData = {
        userId: user.userId,
        nickName: user.nickName,
        avatarUrl: user.avatarUrl,
        point: '+' + num,
        describe: '签到',
        time: new Date().getTime(),
      };
      this.app.mysql.insert('point', pointData);
      return point;
    }
    return false;
  }
  async taskSign() {
    const options = {
      where: {
      },
    };
    const result = await this.app.mysql.update('user', { signed: 0 }, options);
    console.log('定时任务taskSign：', result.affectedRows === 1);
  }
}

module.exports = UserService;
