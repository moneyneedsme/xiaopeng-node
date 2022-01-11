'use strict';

module.exports = {
  schedule: {
    cron: '0 0 0 * * *',
    type: 'all', // 指定所有的 worker 都需要执行
    // immediate: true, // 项目启动执行一次
  },
  async task(ctx) {
    ctx.service.home.taskSign();
  },
};
