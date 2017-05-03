var fs = require('fs');
var Tail = require('tail').Tail;
var configuration = require('../configuration.json');

module.exports = {
  getConfigurationFilePath: function () {
    return configuration.file.folder + '/' + configuration.file.name;
  },
  getFile: function (filePath, callback) {
    fs.readFile(filePath, 'utf8', function (err, data) {
      if (err) throw new Error(err);
      if (callback && typeof callback === 'function') {
        callback(data);
      }
    });
  },
  initTail: function () {
    return new Tail(this.getConfigurationFilePath());
  }
};