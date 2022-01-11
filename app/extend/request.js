'use strict';

module.exports = {
  get token() {
    return this.header.authorization.replace('Bearer ', '');
  },

};
